import { StatsStrip, type Stat } from "@/components/ui/StatsStrip";

const stats: Stat[] = [
  { value: "40+", label: "Years experience in the field" },
  { value: "100%", label: "W-2 employees utilized" },
  { value: "53", label: "Countries reached globally" },
  // 2025 total. No thousands comma: CountUp animates only the first run of
  // digits, so "7,455" would count up just the 7.
  { value: "7455", label: "Positions filled annually", footnote: "Based on 2025 data." },
];

export function ProofPoints() {
  return <StatsStrip stats={stats} />;
}
