import Script from "next/script";
import { ConsentGatedPixels } from "./ConsentGatedPixels";

// Only the live site is tracked — localhost and Vercel preview deploys stay clean.
const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

const GTM_ID = "GTM-52C87K24";
const HUBSPOT_PORTAL_ID = "45412593";

export function Trackers() {
  if (!IS_PRODUCTION) return null;

  return (
    <>
      {/* Google Tag Manager (contains GA4 G-Y8GB9LZJDW + Google Ads AW-853999831).
          Consent Mode defaults to denied; ConsentGatedPixels updates it from the
          HubSpot cookie banner. */}
      <Script id="gtm" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){dataLayer.push(arguments);};
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {/* HubSpot — also hosts the cookie consent banner, so it loads first. */}
      <Script id="hubspot-hsq" strategy="afterInteractive">
        {`var _hsq = window._hsq = window._hsq || [];
_hsq.push(['setPath', window.location.pathname]);
_hsq.push(['setContentType', 'standard-page']);
_hsq.push(['setPageTitle', document.title]);`}
      </Script>
      <Script
        id="hubspot-embed"
        strategy="afterInteractive"
        src={`https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
      />

      <ConsentGatedPixels />
    </>
  );
}
