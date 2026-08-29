// MOCK DATA — for hackathon demo purposes only.
//
// Methodology (disclosed in-app, see MethodologyNote.jsx):
// Real government open-data releases (e.g. scheme-wise Economic Survey
// tables, NSSO consumption surveys, and state social-welfare department
// annual reports) publish an "eligible population" figure and an
// "enrolled/beneficiaries" figure per scheme, per state. The GAP between
// those two numbers, multiplied by the scheme's per-head annual benefit,
// is a defensible estimate of unclaimed value. For this prototype we did
// not pull live data from those sources — the numbers below are
// illustrative, built in that same shape, so the interaction and the
// citizen journey can be judged on the real mechanism.

export const SCHEMES = {
  noaps: {
    id: 'noaps',
    name: 'National Old Age Pension Scheme (NOAPS)',
    category: 'Pension',
    perHeadAnnual: 12000,
    description:
      'Monthly pension for citizens above 60 living below the poverty line.',
    commonBlockers: [
      'BPL ration card not linked to Aadhaar',
      'Age proof document mismatch',
      'Never applied — assumed a bank would auto-enroll them',
    ],
  },
  pmkisan: {
    id: 'pmkisan',
    name: 'PM-KISAN Income Support',
    category: 'Agriculture',
    perHeadAnnual: 6000,
    description:
      '₹6,000/year direct income support for eligible small and marginal farmer families.',
    commonBlockers: [
      'Land records not digitised or not e-KYC linked',
      'Bank account not seeded with Aadhaar',
      'Missed the self-registration step on the portal',
    ],
  },
  ayushman: {
    id: 'ayushman',
    name: 'Ayushman Bharat (PM-JAY)',
    category: 'Health',
    perHeadAnnual: 5000,
    description:
      'Health cover up to ₹5 lakh/family/year for secondary and tertiary hospitalisation.',
    commonBlockers: [
      'Family not aware they are on the SECC eligibility list',
      'e-card never generated at a Common Service Centre',
      'Name mismatch between ration card and Aadhaar',
    ],
  },
  scholarship: {
    id: 'scholarship',
    name: 'National Scholarship Portal — Post-Matric',
    category: 'Education',
    perHeadAnnual: 8000,
    description:
      'Post-matric scholarship for SC/ST/OBC/minority students from low-income households.',
    commonBlockers: [
      'Application window missed — no reminder system exists',
      'Income certificate expired at time of renewal',
      'Bank account not NPCI-seeded, so disbursal silently fails',
    ],
  },
  ujjwala: {
    id: 'ujjwala',
    name: 'Pradhan Mantri Ujjwala Yojana',
    category: 'Household',
    perHeadAnnual: 1600,
    description: 'Free LPG connection + subsidised refills for BPL women.',
    commonBlockers: [
      'Connection issued but subsidy re-KYC lapsed',
      'Household unaware refill subsidy still applies',
    ],
  },
};

export const LOCALITIES = [
  {
    id: 'hyd-lb-nagar',
    name: 'L.B. Nagar, Hyderabad',
    state: 'Telangana',
    lat: 17.3457,
    lng: 78.5507,
    population: 42000,
    gaps: [
      { schemeId: 'noaps', eligible: 3100, enrolled: 1840 },
      { schemeId: 'ayushman', eligible: 9200, enrolled: 6100 },
      { schemeId: 'scholarship', eligible: 1450, enrolled: 860 },
    ],
  },
  {
    id: 'hyd-old-city',
    name: 'Old City, Hyderabad',
    state: 'Telangana',
    lat: 17.361,
    lng: 78.4747,
    population: 61000,
    gaps: [
      { schemeId: 'ayushman', eligible: 14200, enrolled: 8300 },
      { schemeId: 'ujjwala', eligible: 5100, enrolled: 3600 },
      { schemeId: 'scholarship', eligible: 2600, enrolled: 1400 },
    ],
  },
  {
    id: 'rangareddy-rural',
    name: 'Rangareddy (rural mandals)',
    state: 'Telangana',
    lat: 17.29,
    lng: 78.28,
    population: 38000,
    gaps: [
      { schemeId: 'pmkisan', eligible: 7600, enrolled: 4200 },
      { schemeId: 'noaps', eligible: 2400, enrolled: 1300 },
    ],
  },
  {
    id: 'mumbai-govandi',
    name: 'Govandi, Mumbai',
    state: 'Maharashtra',
    lat: 19.0546,
    lng: 72.9106,
    population: 55000,
    gaps: [
      { schemeId: 'ayushman', eligible: 16800, enrolled: 9700 },
      { schemeId: 'ujjwala', eligible: 6200, enrolled: 3900 },
    ],
  },
  {
    id: 'delhi-seelampur',
    name: 'Seelampur, Delhi',
    state: 'Delhi',
    lat: 28.6707,
    lng: 77.2652,
    population: 47000,
    gaps: [
      { schemeId: 'scholarship', eligible: 3100, enrolled: 1600 },
      { schemeId: 'noaps', eligible: 1800, enrolled: 1050 },
    ],
  },
  {
    id: 'bengaluru-bommanahalli',
    name: 'Bommanahalli, Bengaluru',
    state: 'Karnataka',
    lat: 12.9,
    lng: 77.615,
    population: 31000,
    gaps: [
      { schemeId: 'ayushman', eligible: 8400, enrolled: 5900 },
      { schemeId: 'scholarship', eligible: 1900, enrolled: 1200 },
    ],
  },
  {
    id: 'patna-rural',
    name: 'Patna Rural',
    state: 'Bihar',
    lat: 25.55,
    lng: 85.06,
    population: 52000,
    gaps: [
      { schemeId: 'pmkisan', eligible: 11200, enrolled: 5600 },
      { schemeId: 'noaps', eligible: 4100, enrolled: 2000 },
      { schemeId: 'ujjwala', eligible: 7300, enrolled: 4100 },
    ],
  },
  {
    id: 'lucknow-outskirts',
    name: 'Lucknow Outskirts',
    state: 'Uttar Pradesh',
    lat: 26.79,
    lng: 80.95,
    population: 44000,
    gaps: [
      { schemeId: 'scholarship', eligible: 2800, enrolled: 1350 },
      { schemeId: 'ayushman', eligible: 9800, enrolled: 6200 },
    ],
  },
  {
    id: 'chennai-perambur',
    name: 'Perambur, Chennai',
    state: 'Tamil Nadu',
    lat: 13.1155,
    lng: 80.2337,
    population: 33000,
    gaps: [
      { schemeId: 'noaps', eligible: 2200, enrolled: 1500 },
      { schemeId: 'ujjwala', eligible: 3900, enrolled: 2700 },
    ],
  },
];

export function unclaimedForLocality(locality) {
  return locality.gaps.reduce((sum, gap) => {
    const scheme = SCHEMES[gap.schemeId];
    const unclaimedHeads = Math.max(gap.eligible - gap.enrolled, 0);
    return sum + unclaimedHeads * scheme.perHeadAnnual;
  }, 0);
}

export function localitiesWithTotals() {
  return LOCALITIES.map((loc) => ({ ...loc, unclaimed: unclaimedForLocality(loc) }));
}