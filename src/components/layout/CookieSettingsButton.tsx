"use client";

type HubSpotWindow = Window & { _hsp?: unknown[] };

// Reopens the HubSpot cookie banner so visitors can change or withdraw consent
// after their first choice. HubSpot only loads on the production site, so the
// click does nothing on localhost or preview deploys.
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={`cursor-pointer ${className ?? ""}`}
      onClick={() => {
        const w = window as HubSpotWindow;
        (w._hsp = w._hsp || []).push(["showBanner"]);
      }}
    >
      Cookie Settings
    </button>
  );
}
