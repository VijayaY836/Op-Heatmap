export default function MethodologyNote() {
  return (
    <details className="fixed bottom-4 left-4 z-[500] max-w-sm rounded-xl2 border border-line bg-surface/95 p-4 text-xs text-inkmuted shadow-card backdrop-blur">
      <summary className="cursor-pointer font-mono font-semibold uppercase tracking-wide text-ink focus-ring">
        What's real vs. mocked
      </summary>
      <div className="mt-2 space-y-2">
        <p>
          <span className="font-semibold text-ink">Real:</span> the eligible-vs-enrolled gap
          methodology mirrors how government open-data releases actually report scheme coverage
          (an eligible population figure vs. an enrolled/beneficiary figure, per scheme, per
          region).
        </p>
        <p>
          <span className="font-semibold text-ink">Mocked:</span> the specific numbers per
          locality in this prototype are illustrative, not pulled live from government sources —
          built in the same shape so the map, the counter, and the claim walkthrough can be
          judged as a working mechanism.
        </p>
        <p>
          <span className="font-semibold text-ink">Real:</span> the claim walkthrough calls an
          OpenAI model live to generate eligibility guidance and next steps from your answers.
        </p>
      </div>
    </details>
  );
}