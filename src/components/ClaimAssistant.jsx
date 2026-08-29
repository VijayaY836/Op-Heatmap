import { useState } from 'react';

const QUESTIONS = [
  { id: 'age', label: 'Your age', placeholder: 'e.g. 63' },
  { id: 'occupation', label: 'Occupation / household type', placeholder: 'e.g. small farmer, daily wage, student' },
  { id: 'hasRationCard', label: 'Do you have a BPL / priority ration card?', placeholder: 'yes / no / not sure' },
  { id: 'documents', label: 'Documents you already have on hand', placeholder: 'e.g. Aadhaar, bank passbook, land record' },
];

export default function ClaimAssistant({ scheme, locality, onClose }) {
  const [step, setStep] = useState('questions'); // questions -> loading -> result -> error
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!scheme) return null;

  const updateAnswer = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }));

  const submit = async () => {
    setStep('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/claim-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scheme: { name: scheme.name, description: scheme.description, category: scheme.category },
          locality: { name: locality?.name, state: locality?.state },
          answers,
        }),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setResult(data);
      setStep('result');
    } catch (err) {
      console.error(err);
      setErrorMessage(
        'Could not reach the AI assistant (is OPENAI_API_KEY set? see README). Showing a offline fallback instead.'
      );
      setResult(offlineFallback(scheme));
      setStep('result');
    }
  };

  return (
    <div className="fixed inset-0 z-[700] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-xl2 bg-surface p-6 shadow-panel sm:rounded-xl2">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-inkmuted">
              Claim walkthrough
            </p>
            <h2 className="font-display text-xl font-medium text-ink">{scheme.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="focus-ring rounded-full p-2 text-inkmuted transition hover:bg-line/60 hover:text-ink"
          >
            ✕
          </button>
        </div>

        {step === 'questions' && (
          <div className="mt-5 space-y-4">
            <p className="text-sm text-inkmuted">
              A few quick details so the guidance is actually yours, not generic. Nothing here is
              stored or submitted anywhere real — this is a prototype.
            </p>
            {QUESTIONS.map((q) => (
              <label key={q.id} className="block text-sm">
                <span className="font-medium text-ink">{q.label}</span>
                <input
                  type="text"
                  placeholder={q.placeholder}
                  value={answers[q.id] ?? ''}
                  onChange={(e) => updateAnswer(q.id, e.target.value)}
                  className="focus-ring mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-inkmuted/70"
                />
              </label>
            ))}
            <button
              onClick={submit}
              className="focus-ring w-full rounded-lg bg-coral px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-coral-dark"
            >
              Get my claim steps
            </button>
          </div>
        )}

        {step === 'loading' && (
          <div className="mt-8 flex flex-col items-center gap-3 py-8 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-teal" />
            <p className="text-sm text-inkmuted">
              Matching your answers against {scheme.name}'s real eligibility rules…
            </p>
          </div>
        )}

        {step === 'result' && result && (
          <div className="mt-5 space-y-5">
            {errorMessage && (
              <p className="rounded-lg bg-marigold-light px-3 py-2 text-xs text-marigold-dark">
                {errorMessage}
              </p>
            )}

            <div className="rounded-xl2 border border-line bg-bg p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-inkmuted">
                Likely eligibility
              </p>
              <p className="mt-1 font-display text-lg text-ink">{result.eligibilitySummary}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-inkmuted">
                Steps to claim
              </p>
              <ol className="mt-2 space-y-2">
                {result.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-light font-mono text-[11px] font-semibold text-teal-dark">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-inkmuted">
                Documents you'll need
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {result.documents.map((d) => (
                  <li
                    key={d}
                    className="rounded-full bg-sage-light px-3 py-1 text-xs font-medium text-sage-dark"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={onClose}
              className="focus-ring w-full rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark"
            >
              Done for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Used only if the API route/key isn't configured yet, so the demo never
// dead-ends mid-walkthrough while you're setting things up.
function offlineFallback(scheme) {
  return {
    eligibilitySummary: `Likely eligible for ${scheme.name} — confirm with a local Common Service Centre.`,
    steps: [
      'Gather the documents listed below.',
      `Visit your nearest Common Service Centre or the ${scheme.category.toLowerCase()} department office.`,
      'Submit your application and note the reference/tracking number.',
      'Follow up if you hear nothing within 30 days.',
    ],
    documents: ['Aadhaar card', 'Bank passbook', 'Proof of address', 'Recent photograph'],
  };
}