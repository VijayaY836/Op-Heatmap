import { SCHEMES } from '../data/localities';
import { formatINR } from '../utils/formatCurrency';
import SchemeCard from './SchemeCard';

export default function LocalityDrawer({ locality, onClose, onStartClaim }) {
  if (!locality) return null;

  return (
    <aside
      className="fixed inset-y-0 right-0 z-[600] flex w-full max-w-md flex-col border-l border-line bg-bg shadow-panel sm:w-[26rem]"
      aria-label={`Unclaimed welfare details for ${locality.name}`}
    >
      <div className="flex items-start justify-between border-b border-line bg-surface p-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-inkmuted">
            {locality.state}
          </p>
          <h2 className="font-display text-2xl font-medium text-ink">{locality.name}</h2>
          <p className="mt-1 font-mono text-sm font-semibold text-coral">
            {formatINR(locality.unclaimed, { compact: true })} unclaimed this year
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="focus-ring rounded-full p-2 text-inkmuted transition hover:bg-line/60 hover:text-ink"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {locality.gaps.map((gap) => (
          <SchemeCard
            key={gap.schemeId}
            scheme={SCHEMES[gap.schemeId]}
            gap={gap}
            onStartClaim={onStartClaim}
          />
        ))}
      </div>
    </aside>
  );
}