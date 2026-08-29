import { formatINR } from '../utils/formatCurrency';

export default function Hero({ visibleTotal, visibleCount }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] flex flex-col items-start gap-3 p-5 sm:p-8">
      <div className="pointer-events-auto max-w-xl rounded-xl2 bg-surface/95 p-5 shadow-panel backdrop-blur sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-inkmuted">
          Unclaimed India · live view
        </p>
        <h1 className="mt-2 font-display text-2xl font-medium leading-tight text-ink sm:text-3xl">
          There's{' '}
          <span className="ledger-live font-mono font-semibold text-coral">
            {formatINR(visibleTotal, { compact: true })}
          </span>{' '}
          in welfare sitting unclaimed on your screen right now.
        </h1>
        <p className="mt-2 text-sm text-inkmuted">
          Pan and zoom the map. Every circle is a locality — click one to see exactly which
          schemes are going unclaimed there, and who's missing out.{' '}
          <span className="font-medium text-ink">{visibleCount}</span> localities in view.
        </p>
      </div>
    </div>
  );
}