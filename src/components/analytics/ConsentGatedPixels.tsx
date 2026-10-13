"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type HubSpotConsent = {
  allowed?: boolean;
  categories?: { analytics?: boolean; advertisement?: boolean };
};

type ConsentWindow = Window & {
  _hsp?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

// Global Privacy Control: a browser-level "don't sell or share my data"
// signal that California law requires honoring. Ad pixels count as sharing.
function hasGlobalPrivacyControl(): boolean {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

// Ad pixels mount only after the visitor accepts advertising cookies in the
// HubSpot cookie banner, and never when the browser sends Global Privacy
// Control. Revoking consent takes effect on the next page load.
export function ConsentGatedPixels() {
  const [consent, setConsent] = useState({ analytics: false, advertisement: false });

  useEffect(() => {
    const w = window as ConsentWindow;
    const hsp = (w._hsp = w._hsp || []);
    hsp.push([
      "addPrivacyConsentListener",
      (hsConsent: HubSpotConsent) => {
        const analytics = Boolean(hsConsent.allowed || hsConsent.categories?.analytics);
        const advertisement =
          !hasGlobalPrivacyControl() &&
          Boolean(hsConsent.allowed || hsConsent.categories?.advertisement);
        setConsent({ analytics, advertisement });

        const ads = advertisement ? "granted" : "denied";
        w.gtag?.("consent", "update", {
          ad_storage: ads,
          ad_user_data: ads,
          ad_personalization: ads,
          analytics_storage: analytics ? "granted" : "denied",
        });
      },
    ]);
  }, []);

  if (!consent.advertisement) return null;

  return (
    <>
      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','414196556056198');fbq('track','PageView');`}
      </Script>

      {/* TikTok Pixel */}
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`!function (w, d, t) { w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)}; ttq.load('D9GILBRC77U79CKFAL60'); ttq.page(); }(window, document, 'ttq');`}
      </Script>

      {/* LinkedIn Insight Tag */}
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`_linkedin_partner_id = "9407554";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);`}
      </Script>

      {/* Vibe Event Manager */}
      <Script id="vibe-event-manager" strategy="afterInteractive">
        {`!function(v,i,b,e,c,o){if(!v[c]){var s=v[c]=function(){s.process?s.process.apply(s,arguments):s.queue.push(arguments)};s.queue=[],s.b=1*new Date;var t=i.createElement(b);t.async=!0,t.src=e;var n=i.getElementsByTagName(b)[0];n.parentNode.insertBefore(t,n)}}(window,document,"script","https://s.vibe.co/vbpx.js","vbpx");
vbpx('init','nhR2D8');
vbpx('event', 'page_view');`}
      </Script>
    </>
  );
}
