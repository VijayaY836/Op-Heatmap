import { formatINR } from '../utils/formatCurrency';

const CATEGORY_STYLES = {
  Pension: 'bg-teal-light text-teal-dark',
  Agriculture: 'bg-sage-light text-sage-dark',
  Health: 'bg-coral-light text-coral-dark',
  Education: 'bg-marigold-light text-marigold-dark',
  Household: 'bg-teal-light text-teal-dark',
};

export default function SchemeCard({ scheme, gap, onStartClaim }) {
  const unclaimedHeads = Math.max(gap.eligible - gap.enrolled, 0);
  const unclaimedValue = unclaimedHeads * scheme.perHeadAnnual;
  const enrolledPct = Math.round((gap.enrolled / gap.eligible) * 100);

  return (
    <div className="rounded-xl2 border border-line bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
              CATEGORY_STYLES[scheme.category] ?? 'bg-teal-light text-teal-dark'
            }`}
          >
            {scheme.category}
          </span>
          <h3 className="mt-2 font-display text-lg font-medium text-ink">{scheme.name}</h3>
          <p className="mt-1 text-sm text-inkmuted">{scheme.description}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-lg font-semibold text-coral">
            {formatINR(unclaimedValue, { compact: true })}
          </p>
          <p className="text-[11px] text-inkmuted">unclaimed / yr</p>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-[11px] font-medium text-inkmuted">
          <span>
            {gap.enrolled.toLocaleString('en-IN')} of {gap.eligible.toLocaleString('en-IN')}{' '}
            eligible are enrolled
          </span>
          <span>{enrolledPct}%</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-teal"
            style={{ width: `${Math.min(enrolledPct, 100)}%` }}
          />
        </div>
      </div>

      <details className="mt-3 text-sm text-inkmuted">
        <summary className="cursor-pointer font-medium text-ink focus-ring">
          Why people miss this
        </summary>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {scheme.commonBlockers.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </details>

      <button
        onClick={() => onStartClaim(scheme)}
        className="focus-ring mt-4 w-full rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-dark"
      >
        Walk me through claiming this
      </button>
    </div>
  );
}