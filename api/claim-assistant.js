// Vercel serverless function: POST /api/claim-assistant
//
// This is the meaningful AI integration point in the citizen journey — it
// takes the scheme + locality + the citizen's plain-language answers, and
// returns a personalised eligibility read and claim checklist. Routed
// through OpenRouter (OpenAI-compatible /chat/completions API), so the key
// stays server-side and is never sent to the browser.

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
// Any OpenRouter-hosted model works here — swap for whichever you have
// credits/access for. See https://openrouter.ai/models
const MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'OPENROUTER_API_KEY is not configured on the server. See README.md.',
    });
  }

  const { scheme, locality, answers } = req.body ?? {};
  if (!scheme?.name) {
    return res.status(400).json({ error: 'Missing scheme in request body.' });
  }

  const systemPrompt = `You are a calm, precise assistant helping an Indian citizen understand a specific government welfare scheme and how to actually claim it. You are not the government and must never claim to be official. Always:
- Write in plain, warm, simple language (assume the reader may have limited formal education).
- Be honest about uncertainty — if their answers don't confirm eligibility, say so plainly rather than guessing confidently.
- Never invent specific office addresses, phone numbers, or deadlines you are not given.
- Respond ONLY with valid JSON matching this exact shape, nothing else, no markdown fences:
{"eligibilitySummary": string, "steps": string[3-6], "documents": string[3-6]}`;

  const userPrompt = `Scheme: ${scheme.name} (${scheme.category})
Scheme description: ${scheme.description}
Locality: ${locality?.name ?? 'unspecified'}, ${locality?.state ?? ''}

Citizen's answers:
${Object.entries(answers ?? {})
  .map(([k, v]) => `- ${k}: ${v || 'not provided'}`)
  .join('\n')}

Give this citizen a short, honest eligibility read and a concrete, ordered list of steps to actually claim this scheme, plus the documents they'll need.`;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        // OpenRouter uses these for attribution/rankings on their dashboard —
        // optional, but good practice. Update to your real deployed URL.
        'HTTP-Referer': process.env.SITE_URL || 'https://unclaimed-india.vercel.app',
        'X-Title': 'Unclaimed India',
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('OpenRouter API error:', detail);
      return res.status(502).json({ error: 'The AI service failed to respond.' });
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content ?? '{}';

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.status(502).json({ error: 'The AI response was not valid JSON.' });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unexpected server error.' });
  }
}