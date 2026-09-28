export type Job = {
  requisitionId: string;
  title: string;
  minPay: string;
  maxPay: string;
  city: string;
  state: string;
  postalCode: string;
  applyUrl: string;
  description: string;
  lat: number | null;
  lng: number | null;
  category: string;
  positionType: string;
};

export const CATEGORIES = [
  "Display Maintenance",
  "Corporate",
  "Retail Merchandising",
  "Installation",
  "Retail Associates",
  "Training & Market Development Managers",
  "Field Team Management",
  "Assisted Selling",
] as const;

export const POSITION_TYPES = ["Temporary", "Full-Time", "Part-Time"] as const;

export const US_STATE_ABBR: Record<string, string> = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  "District of Columbia": "DC",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

export function formatPayRange(minPay: string, maxPay: string): string {
  // iCIMS values already arrive fully formatted, e.g. "USD $75,000.00/Yr." or
  // "USD $17.00/Hr." — just drop the "USD" prefix rather than re-adding "$"/"/Yr.",
  // which would double up (hourly roles aren't "/Yr." at all).
  const clean = (value: string) => value.replace(/USD/gi, "").trim();
  const min = clean(minPay);
  const max = clean(maxPay);
  if (!min && !max) return "";
  if (min && max && min !== max) return `${min} – ${max}`;
  return min || max;
}
