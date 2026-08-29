# Unclaimed India

> There's welfare money sitting unclaimed within walking distance of you, right now — and no one has ever shown you where.

An interactive map that turns the abstract "eligible vs. enrolled" gap in India's welfare
schemes into a personal, geographic number — then walks the citizen through actually claiming
theirs, using a live OpenAI-powered assistant.

## Project structure

```
unclaimed-india/
├── api/
│   └── claim-assistant.js      # Vercel serverless fn — the OpenAI integration
├── src/
│   ├── components/
│   │   ├── Hero.jsx             # Signature live "unclaimed in view" counter
│   │   ├── MapView.jsx          # Leaflet heat map of localities
│   │   ├── LocalityDrawer.jsx   # Slide-in panel for a selected locality
│   │   ├── SchemeCard.jsx       # One scheme's unclaimed gap + "why people miss this"
│   │   ├── ClaimAssistant.jsx   # AI-guided claim walkthrough modal
│   │   └── MethodologyNote.jsx  # Honesty disclosure (what's real vs. mocked)
│   ├── data/
│   │   └── localities.js        # Mock but methodologically-real dataset
│   ├── utils/
│   │   └── formatCurrency.js    # ₹ lakh/crore formatting
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── vercel.json
├── package.json
└── .env.example
```

## Setup

```bash
npm install
cp .env.example .env
# then put your real key in .env:
# OPENROUTER_API_KEY=sk-or-v1-...
```

Get a key at [openrouter.ai/keys](https://openrouter.ai/keys). The app is routed through
OpenRouter's OpenAI-compatible `/chat/completions` endpoint, so you can swap
`OPENROUTER_MODEL` in `.env` for any model on [openrouter.ai/models](https://openrouter.ai/models)
without touching code.

## Run locally

The frontend and the serverless API need to run together for the claim assistant to work.
Easiest path — install the Vercel CLI once and use it for local dev:

```bash
npm install -g vercel
vercel dev
```

This serves the Vite app **and** `/api/claim-assistant` on the same port, matching production.

Alternatively, for frontend-only work (map, drawer, styling) you can run:

```bash
npm run dev
```

...but the "Walk me through claiming this" button will fall back to the offline demo response
until the API route is being served (see `offlineFallback` in `ClaimAssistant.jsx` — the app
never dead-ends without a key configured).

## Deploy (Vercel)

```bash
npm install -g vercel
vercel
```

Then in the Vercel project dashboard → Settings → Environment Variables, add
`OPENROUTER_API_KEY` (and optionally `OPENROUTER_MODEL`, `SITE_URL`). Redeploy after adding it.

## What's real vs. mocked (for the submission's honesty section)

- **Real mechanism:** the "eligible population vs. enrolled beneficiaries" gap methodology
  mirrors how government open-data releases actually report scheme coverage.
- **Mocked data:** the specific numbers per locality in `src/data/localities.js` are
  illustrative, not pulled live from a government API — built in the same shape so the
  interaction can be judged on the real mechanism, not on data-pipeline plumbing.
- **Real AI call:** `/api/claim-assistant` makes a live call via OpenRouter
  (`openai/gpt-4o-mini` by default) to generate a personalised eligibility read and claim steps
  from the citizen's actual answers — this is not canned text.
- **At scale:** a real deployment would replace `localities.js` with a scheduled job pulling
  from state social-welfare department open-data releases and the SECC/e-KYC databases the
  schemes already report against.

## Notes for the submission

- Set `OPENROUTER_MODEL` in `.env` to lean harder into "built with Codex" for the judging
  criteria — check [openrouter.ai/models](https://openrouter.ai/models) for the exact current
  Codex/OpenAI model slug available there.
- The map defaults to a India-wide view; `INDIA_CENTER` / `INDIA_ZOOM` in `MapView.jsx` control
  the starting viewport — consider centering on your demo city for the video.
- `MethodologyNote.jsx` is intentionally left visible (not hidden in a footer link) — the brief
  scores "Honesty" explicitly, so don't cut this for the video.