// Formats a number the way Indian citizens actually read money: ₹, with
// lakh/crore groupings for large figures rather than million/billion.

export function formatINR(amount, { compact = false } = {}) {
  const value = Math.round(amount);

  if (compact) {
    if (value >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(2)} Cr`;
    if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(2)} L`;
    if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}K`;
    return `₹${value}`;
  }

  // Indian digit grouping: last 3 digits, then groups of 2.
  const [intPart, ] = String(value).split('.');
  const negative = intPart.startsWith('-');
  const digits = negative ? intPart.slice(1) : intPart;

  let result = digits.slice(-3);
  let remaining = digits.slice(0, -3);
  while (remaining.length > 0) {
    result = remaining.slice(-2) + ',' + result;
    remaining = remaining.slice(0, -2);
  }

  return `${negative ? '-' : ''}₹${result}`;
}