"use client";

import {
  BadgeCheck,
  CalendarDays,
  Car,
  GraduationCap,
  HeartPulse,
  Hotel,
  LifeBuoy,
  PiggyBank,
  Receipt,
  Stethoscope,
  Tag,
  Thermometer,
  TreePalm,
  UserPlus,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { VerifyBadge, WithPlaceholders } from "@/components/ui/ContentPlaceholder";

type Benefit = { label: string; icon: LucideIcon };
type BenefitGroup = { heading?: string; items: Benefit[]; verify?: string };
type BenefitTab = { key: string; label: string; groups: BenefitGroup[]; pending?: string };

// TODO(content) [VERIFY: HR] — every list below is interim until HR's benefits
// grid lands. Groups with `verify` show a highlighted "Verify with HR" badge on
// the page so they aren't missed before launch.
const TABS: BenefitTab[] = [
  {
    key: "field",
    label: "Field & Hourly",
    groups: [
      {
        heading: "Part time",
        verify: "Interim list from Heather's merchandising brief, to be replaced by HR's grid",
        items: [
          { label: "Weekly pay and early wage access", icon: Wallet },
          { label: "W-2 employment", icon: BadgeCheck },
          { label: "Paid mileage and travel pay where applicable*", icon: Car },
          { label: "Per diem and hotel for travel assignments", icon: Hotel },
          { label: "Limited benefit plans for everyday illness and accidents", icon: Stethoscope },
          { label: "Employee discounts", icon: Tag },
          { label: "Referral bonus", icon: UserPlus },
        ],
      },
      {
        heading: "Full time",
        verify: "Pending HR confirmation",
        items: [
          { label: "Weekly pay and early wage access", icon: Wallet },
          { label: "Health and wellness plans", icon: HeartPulse },
          { label: "401(k) with employer match", icon: PiggyBank },
          { label: "Paid time off and holidays", icon: TreePalm },
          { label: "Paid training, drive time and mileage between stores", icon: GraduationCap },
          {
            label: "Flexible spending accounts for parking, transit, dependent care and healthcare",
            icon: Receipt,
          },
          { label: "Employee discounts", icon: Tag },
          { label: "Referral bonus", icon: UserPlus },
        ],
      },
    ],
  },
  {
    key: "corporate",
    label: "Corporate",
    groups: [
      {
        verify: "From the current site; HR grid pending",
        items: [
          { label: "Health benefits", icon: HeartPulse },
          { label: "401(k)", icon: PiggyBank },
          { label: "Paid time off", icon: TreePalm },
          { label: "Company-paid holidays", icon: CalendarDays },
          { label: "Sick time", icon: Thermometer },
          { label: "Employee Assistance Program", icon: LifeBuoy },
          { label: "Employee discounts", icon: Tag },
        ],
      },
    ],
  },
  {
    key: "leadership",
    label: "Leadership",
    groups: [],
    // Left visible on purpose as a reminder until HR provides the list.
    pending: "[HR grid pending]",
  },
];

// Always visible below the tabs. Bracketed text is a placeholder until HR
// confirms the wording, and is highlighted on the page. TODO(content) [VERIFY: HR]
const FOOTNOTES = [
  "*Mileage and travel pay apply to trips beyond a 30-mile commute each way to the store.",
  "Weekly pay eligibility: [VERIFY: HR]",
  "Sick time varies by state: [VERIFY: HR]",
];

export function Benefits() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const tab = TABS[active];

  // Arrow keys / Home / End move between tabs, per the WAI-ARIA tabs pattern.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = TABS.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (active + 1) % TABS.length
        : event.key === "ArrowLeft"
          ? (active - 1 + TABS.length) % TABS.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="w-full bg-light-grey/40 py-20">
      <div className="mx-auto grid w-full max-w-[var(--grid-max-width)] grid-cols-12 gap-x-6 px-[var(--grid-margin)] md:px-[var(--grid-margin-md)]">
        <div className="col-span-12 flex flex-col gap-10 xl:col-span-10 xl:col-start-2">
          <div className="flex max-w-[760px] flex-col gap-4">
            <h2 className="header-2 text-black">Benefits, spelled out</h2>
            <p className="text-lg leading-7 text-black">
              What you get depends on your role and whether you&rsquo;re full or part time.
              Here&rsquo;s what each one includes, with no mystery asterisks.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div
              role="tablist"
              aria-label="Benefits by role"
              onKeyDown={onKeyDown}
              className="flex flex-wrap gap-x-8 gap-y-2 border-b border-middle-grey/30"
            >
              {TABS.map((t, i) => {
                const selected = i === active;
                return (
                  <button
                    key={t.key}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${t.key}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`-mb-px border-b-2 pb-3 text-sm font-bold uppercase tracking-[0.6px] transition-colors ${
                      selected
                        ? "border-cerulean text-cerulean"
                        : "border-transparent text-middle-grey hover:text-black"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`${baseId}-panel`}
              aria-labelledby={`${baseId}-tab-${tab.key}`}
              tabIndex={0}
              className="grid grid-cols-1 content-start md:min-h-[344px] gap-x-6 gap-y-10 outline-none md:grid-cols-2"
            >
              {tab.pending && (
                <p className="text-lg leading-7 text-middle-grey">
                  <WithPlaceholders text={tab.pending} />
                </p>
              )}
              {tab.groups.map((group) => (
                <div key={group.heading ?? tab.key} className="flex flex-col items-start gap-4">
                  {(group.heading || group.verify) && (
                    <div className="flex flex-wrap items-center gap-3">
                      {group.heading && <h3 className="header-6 text-black">{group.heading}</h3>}
                      {group.verify && <VerifyBadge owner="HR" note={group.verify} />}
                    </div>
                  )}
                  <ul className="flex flex-col gap-3">
                    {group.items.map(({ label, icon: Icon }) => (
                      <li key={label} className="flex items-start gap-3 text-base leading-6 text-black">
                        <Icon aria-hidden strokeWidth={1.75} className="mt-0.5 size-5 shrink-0 text-cerulean" />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 border-t border-middle-grey/30 pt-6 text-sm leading-6 text-middle-grey">
            {FOOTNOTES.map((note) => (
              <p key={note}>
                <WithPlaceholders text={note} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
