import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import type { Job } from "@/lib/jobs";
import { SAMPLE_JOBS } from "./sample-jobs";

export const revalidate = 1800; // refetch the feed at most every 30 minutes

type GeocodeCache = Map<string, { lat: number; lng: number } | null>;

// Module-scope cache: survives across requests on a warm serverless/Node instance.
// Zip -> lat/lng never changes, so caching indefinitely (until process restart) is safe.
const geocodeCache: GeocodeCache = new Map();

// Module-scope "last known good" snapshot: survives across requests on a warm
// instance. An empty/failed parse skips updating this and just serves the
// last good data again, retrying the real feed on the next revalidate cycle.
let lastGoodJobs: Job[] | null = null;
let lastGoodUpdatedAt: string | null = null;

function cleanPortalField(value: string): string {
  const trimmed = value.trim();
  if (trimmed === "" || /^hidden/i.test(trimmed)) return "";
  return trimmed;
}

// US ZIPs can lose their leading zero upstream (e.g. Brookline, MA "02445" -> "2445"),
// which makes geocoding 404. Keep the 5-digit base of ZIP+4 and left-pad numeric ZIPs.
function normalizeZip(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,5})(?:-\d{4})?$/);
  return match ? match[1].padStart(5, "0") : trimmed;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// zippopotam.us covers Canada by forward sortation area (first 3 characters).
function geocodePath(zip: string): string {
  const canadian = zip.match(/^([A-Z]\d[A-Z])\s?\d[A-Z]\d$/i);
  return canadian ? `ca/${canadian[1].toUpperCase()}` : `us/${encodeURIComponent(zip)}`;
}

async function geocodeZip(zip: string): Promise<{ lat: number; lng: number } | null> {
  if (!zip) return null;
  if (geocodeCache.has(zip)) return geocodeCache.get(zip) ?? null;

  // Stay polite to the free zippopotam.us API on a cold cache (hundreds of unique zips).
  await sleep(100);

  try {
    const res = await fetch(`https://api.zippopotam.us/${geocodePath(zip)}`);
    if (!res.ok) {
      // Only a 404 means the ZIP is unknown; don't let a transient error stick.
      if (res.status === 404) geocodeCache.set(zip, null);
      return null;
    }
    const data = await res.json();
    const place = data.places?.[0];
    if (!place) {
      geocodeCache.set(zip, null);
      return null;
    }
    const coords = { lat: parseFloat(place.latitude), lng: parseFloat(place.longitude) };
    geocodeCache.set(zip, coords);
    return coords;
  } catch {
    return null;
  }
}

async function fetchAndNormalizeJobs(feedUrl: string): Promise<Job[]> {
  const res = await fetch(feedUrl, { next: { revalidate } });
  if (!res.ok) throw new Error(`Feed request failed: ${res.status}`);
  const xmlText = await res.text();

  // parseTagValue: false keeps every column a string — the default number parsing
  // strips leading zeros from postal codes.
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    parseTagValue: false,
  });
  const parsed = parser.parse(xmlText);

  const rowsRaw = parsed?.File?.Row ?? parsed?.Grid?.Row ?? parsed?.Rows?.Row ?? [];
  const rows: Record<string, unknown>[] = Array.isArray(rowsRaw) ? rowsRaw : [rowsRaw];

  const jobs: Job[] = [];
  for (const row of rows) {
    const columnsRaw = (row as Record<string, unknown>)?.Column ?? [];
    const columns: Record<string, unknown>[] = Array.isArray(columnsRaw)
      ? columnsRaw
      : [columnsRaw];
    const cols: Record<string, string> = {};
    for (const col of columns) {
      const name = (col as Record<string, string>)["@_Name"];
      const text = (col as { "#text"?: string })["#text"] ?? "";
      if (name) cols[name] = String(text);
    }

    if (cols["Job Folder/Status"] !== "Open") continue;

    const zip = normalizeZip(cols["Position Location : Postal Code"] || "");
    const coords = await geocodeZip(zip);

    jobs.push({
      requisitionId: cols["Requisition ID"] || "",
      title: cols["External Title"] || "",
      minPay: cols["Minimum Pay"] || "",
      maxPay: cols["Maximum Pay"] || "",
      city: cols["Position Location : City"] || "",
      state: cols["Position Location : State/Province"] || "",
      postalCode: zip,
      applyUrl: cols["Channel Partners External Portal URL Formula"] || "",
      description: cols["At A Glance (Text Only)"] || "",
      lat: coords?.lat ?? null,
      lng: coords?.lng ?? null,
      category: cleanPortalField(cols["Category (Portal Searching)"] || ""),
      positionType: cleanPortalField(cols["Position Type (Portal Searching)"] || ""),
    });
  }
  return jobs;
}

export async function GET() {
  const feedUrl = process.env.ICIMS_FEED_URL;

  if (!feedUrl) {
    return NextResponse.json({ jobs: SAMPLE_JOBS, updatedAt: new Date().toISOString(), source: "sample" });
  }

  try {
    const jobs = await fetchAndNormalizeJobs(feedUrl);
    if (jobs.length === 0) {
      throw new Error("Feed parsed successfully but returned zero open positions");
    }
    lastGoodJobs = jobs;
    lastGoodUpdatedAt = new Date().toISOString();
    return NextResponse.json({ jobs, updatedAt: lastGoodUpdatedAt, source: "feed" });
  } catch (error) {
    console.error("Failed to fetch/parse job feed this cycle", error);
    if (lastGoodJobs) {
      // Skip the update; serve the last good snapshot and retry next revalidate cycle.
      return NextResponse.json({
        jobs: lastGoodJobs,
        updatedAt: lastGoodUpdatedAt,
        source: "stale-feed",
      });
    }
    // True cold start with no prior successful fetch — bootstrap with sample data.
    return NextResponse.json({ jobs: SAMPLE_JOBS, updatedAt: new Date().toISOString(), source: "sample" });
  }
}
