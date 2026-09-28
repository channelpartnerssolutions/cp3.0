"use client";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, LayerGroup, Marker, Path } from "leaflet";
import { Container } from "@/components/ui/Container";
import { CATEGORIES, POSITION_TYPES, US_STATE_ABBR, formatPayRange, type Job } from "@/lib/jobs";

const CARTO_API_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY ?? "";

// Covers the continental US, southern Canada, Mexico, Central America, and the
// Caribbean (including PR) — used for the initial, unfiltered view. Deliberately
// stops well short of the Arctic: Web Mercator inflates high latitudes so badly
// that fitting all the way to Canada's northern coast crowds the (job-dense)
// continental US down into a sliver of the frame.
const NORTH_AMERICA_BOUNDS: [[number, number], [number, number]] = [
  [10, -130],
  [55, -60],
];

// How close a job needs to be to the visitor's geolocated position for the
// map to tighten its initial view around them. Wide enough to absorb
// IP-based geolocation error; if nothing falls within it, recentering would
// just make the map look empty, so the North America view is kept instead.
const NEARBY_JOB_RADIUS_MILES = 75;

function haversineMiles(a: [number, number], b: [number, number]): number {
  const R = 3958.8;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function jobMatches(
  job: Job,
  filters: { keyword: string; category: string; positionType: string; state: string }
) {
  if (filters.category && job.category !== filters.category) return false;
  if (filters.positionType && job.positionType !== filters.positionType) return false;
  if (filters.state && job.state !== filters.state) return false;
  if (filters.keyword) {
    const haystack = `${job.title} ${job.description}`.toLowerCase();
    if (!haystack.includes(filters.keyword.toLowerCase())) return false;
  }
  return true;
}

export function JobMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const hasActiveFilterRef = useRef(false);
  const userLocationRef = useRef<[number, number] | null>(null);
  const clusterGroupsRef = useRef<Record<string, LayerGroup>>({});
  const markersByReqIdRef = useRef<Record<string, Marker>>({});
  const jobsRef = useRef<Job[]>([]);
  const applyFramingRef = useRef<(() => void) | null>(null);
  const framingAppliedRef = useRef(false);
  const geoCatchUpDoneRef = useRef(false);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [positionType, setPositionType] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [visibleJobs, setVisibleJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data.jobs ?? []))
      .catch(() => setJobs([]));
  }, []);

  useEffect(() => {
    jobsRef.current = jobs;
  }, [jobs]);

  // If geolocation resolved before the jobs fetch finished, re-run the
  // initial framing once jobs arrive so a nearby-jobs recenter isn't missed.
  useEffect(() => {
    if (
      jobs.length > 0 &&
      mapReady &&
      userLocationRef.current &&
      !hasActiveFilterRef.current &&
      !geoCatchUpDoneRef.current
    ) {
      geoCatchUpDoneRef.current = true;
      applyFramingRef.current?.();
    }
  }, [jobs, mapReady]);

  const filters = useMemo(
    () => ({ keyword, category, positionType, state: stateFilter }),
    [keyword, category, positionType, stateFilter]
  );

  const filteredJobs = useMemo(
    () => jobs.filter((job) => jobMatches(job, filters)),
    [jobs, filters]
  );

  const availableStates = useMemo(() => {
    const set = new Set(jobs.map((job) => job.state).filter(Boolean));
    return Array.from(set).sort();
  }, [jobs]);

  // Initialize the map once.
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet.markercluster");

      if (cancelled || !mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [39.0, -98.0],
        zoom: 3,
        minZoom: 2,
        maxZoom: 12,
        scrollWheelZoom: false,
      });

      L.tileLayer(
        `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png${
          CARTO_API_KEY ? `?key=${CARTO_API_KEY}` : ""
        }`,
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);

      const container = map.getContainer();
      container.addEventListener(
        "wheel",
        (event) => {
          if (event.ctrlKey || event.metaKey) {
            map.scrollWheelZoom.enable();
          } else {
            map.scrollWheelZoom.disable();
          }
        },
        { passive: true }
      );

      try {
        const statesRes = await fetch("/data/us-states.json");
        const statesGeo = await statesRes.json();
        L.geoJSON(statesGeo, {
          style: { color: "#0275b3", weight: 1, fillOpacity: 0.04 },
          onEachFeature: (feature, layer) => {
            const name = feature?.properties?.name as string | undefined;
            if (name) layer.bindTooltip(name, { sticky: true });
            layer.on("mouseover", () => (layer as Path).setStyle({ fillOpacity: 0.12 }));
            layer.on("mouseout", () => (layer as Path).setStyle({ fillOpacity: 0.04 }));
            layer.on("click", () => {
              const abbr = name ? US_STATE_ABBR[name] : undefined;
              if (abbr) setStateFilter((current) => (current === abbr ? "" : abbr));
            });
          },
        }).addTo(map);
      } catch {
        // State outlines are a visual enhancement only — skip silently if the fetch fails.
      }

      mapRef.current = map;

      // The container's real pixel size depends on a Tailwind flex layout that may
      // not have settled yet at this point, so fitBounds can't just be called here —
      // ResizeObserver guarantees whatever size it reports is the real, laid-out
      // size, both for this first measurement and for any later resize.
      const applyFraming = () => {
        if (cancelled) return;
        const { width, height } = container.getBoundingClientRect();
        if (width === 0 || height === 0) return; // not laid out yet — wait for next observation
        map.invalidateSize();
        if (!hasActiveFilterRef.current) {
          if (userLocationRef.current) {
            const nearby = jobsRef.current.filter(
              (job) =>
                job.lat != null &&
                job.lng != null &&
                haversineMiles(userLocationRef.current as [number, number], [job.lat, job.lng]) <=
                  NEARBY_JOB_RADIUS_MILES
            );
            if (nearby.length > 0) {
              const points: [number, number][] = [
                userLocationRef.current,
                ...nearby.map((job) => [job.lat as number, job.lng as number] as [number, number]),
              ];
              map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 10 });
            } else {
              map.fitBounds(NORTH_AMERICA_BOUNDS);
            }
          } else {
            map.fitBounds(NORTH_AMERICA_BOUNDS);
          }
          framingAppliedRef.current = true;
        }
      };
      applyFramingRef.current = applyFraming;

      const resizeObserver = new ResizeObserver(applyFraming);
      resizeObserver.observe(container);
      resizeObserverRef.current = resizeObserver;

      // Best-effort: recenter on the visitor's location once permission resolves.
      // Silently keeps the North America framing on denial, timeout, or an
      // unsupported browser — this is a nice-to-have, not a requirement.
      if (typeof navigator !== "undefined" && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (cancelled || hasActiveFilterRef.current) return;
            userLocationRef.current = [position.coords.latitude, position.coords.longitude];
            applyFraming();
          },
          () => {
            // Denied, timed out, or unavailable — leave the default North America view.
          },
          { timeout: 8000, maximumAge: 300000 }
        );
      }

      setMapReady(true);
    })();

    return () => {
      cancelled = true;
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      applyFramingRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Rebuild clustered markers whenever the filtered job set changes.
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    (async () => {
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      if (!map) return;

      Object.values(clusterGroupsRef.current).forEach((group) => map.removeLayer(group));
      clusterGroupsRef.current = {};
      markersByReqIdRef.current = {};

      const jobsByState: Record<string, Job[]> = {};
      filteredJobs.forEach((job) => {
        if (job.lat == null || job.lng == null) return;
        (jobsByState[job.state] ??= []).push(job);
      });

      const pinIcon = L.divIcon({
        className: "",
        html: '<span style="display:block;width:16px;height:16px;border-radius:50%;background:#0275b3;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.4);"></span>',
        iconSize: [16, 16],
      });

      Object.entries(jobsByState).forEach(([state, stateJobs]) => {
        const group = (
          L as unknown as {
            markerClusterGroup: (options: Record<string, unknown>) => LayerGroup;
          }
        ).markerClusterGroup({
          iconCreateFunction: (cluster: { getChildCount: () => number }) => {
            const count = cluster.getChildCount();
            const size = count < 10 ? 30 : count < 100 ? 38 : 46;
            return L.divIcon({
              className: "",
              html: `<div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:50%;background:#02b391;color:#fff;font-weight:700;font-size:13px;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.4);">${count}</div>`,
              iconSize: [size, size],
            });
          },
        });

        stateJobs.forEach((job) => {
          const marker = L.marker([job.lat as number, job.lng as number], { icon: pinIcon });
          const pay = formatPayRange(job.minPay, job.maxPay);
          marker.bindPopup(
            `<div style="font-family:inherit;min-width:200px;">
               <p style="margin:0 0 4px;font-weight:700;">${job.title}</p>
               <p style="margin:0 0 4px;color:#666;">${job.city}, ${job.state}</p>
               ${pay ? `<p style="margin:0 0 4px;">${pay}</p>` : ""}
               <p style="margin:0 0 8px;color:#666;font-size:12px;">Req ID: ${job.requisitionId}</p>
               ${
                 job.applyUrl
                   ? `<a href="${job.applyUrl}" target="_blank" rel="noreferrer" style="color:#0275b3;font-weight:700;">View &amp; Apply</a>`
                   : ""
               }
             </div>`
          );
          group.addLayer(marker);
          markersByReqIdRef.current[job.requisitionId] = marker;
        });

        group.addTo(map);
        clusterGroupsRef.current[state] = group;
      });

      const hasActiveFilter = Boolean(
        filters.keyword || filters.category || filters.positionType || filters.state
      );
      hasActiveFilterRef.current = hasActiveFilter;
      framingAppliedRef.current = true;
      if (!hasActiveFilter) {
        // Unfiltered: keep the initial North America framing rather than tightening
        // to wherever pins happen to fall.
        return;
      }

      const coords = filteredJobs
        .filter((job) => job.lat != null && job.lng != null)
        .map((job) => [job.lat as number, job.lng as number] as [number, number]);

      if (coords.length === 1) {
        map.setView(coords[0], 10);
      } else if (coords.length > 1) {
        map.fitBounds(L.latLngBounds(coords), { padding: [40, 40] });
      }
    })();
  }, [filteredJobs, filters, mapReady]);

  // Keep the sidebar list scoped to jobs currently within the map's viewport.
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    const map = mapRef.current;

    const update = () => {
      const bounds = map.getBounds();
      setVisibleJobs(
        filteredJobs.filter(
          (job) => job.lat != null && job.lng != null && bounds.contains([job.lat, job.lng])
        )
      );
    };

    if (framingAppliedRef.current) {
      update();
    }
    map.on("moveend", update);
    map.on("zoomend", update);
    return () => {
      map.off("moveend", update);
      map.off("zoomend", update);
    };
  }, [filteredJobs, mapReady]);

  const flyToJob = (job: Job) => {
    const map = mapRef.current;
    if (!map || job.lat == null || job.lng == null) return;
    map.flyTo([job.lat, job.lng], Math.max(map.getZoom(), 10));
    const marker = markersByReqIdRef.current[job.requisitionId];
    window.setTimeout(() => marker?.openPopup(), 400);
  };

  const resetFilters = () => {
    setKeyword("");
    setCategory("");
    setPositionType("");
    setStateFilter("");
  };

  return (
    <section className="w-full bg-white pb-[80px] pt-[40px]">
      <div className="flex flex-col gap-6 lg:h-[720px] lg:flex-row">
        <div className="relative h-[420px] w-full overflow-hidden lg:h-full lg:flex-1">
          <div ref={mapContainerRef} className="size-full" />
        </div>

        <Container className="lg:w-auto lg:shrink-0 lg:grow-0 lg:px-0 lg:pr-6">
          <aside className="flex w-full flex-col gap-4 lg:h-full lg:w-[380px] lg:overflow-y-auto">
            <div className="flex items-center justify-between">
              <p className="header-6 text-black">Open Positions</p>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold uppercase tracking-[0.6px] text-cerulean hover:underline"
              >
                Reset
              </button>
            </div>

            <input
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search by keyword"
              aria-label="Search by keyword"
              className="w-full rounded border border-light-grey px-3 py-2 text-sm text-black"
            />

            <div className="grid grid-cols-2 gap-2">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter by category"
                className="rounded border border-light-grey px-2 py-2 text-sm text-black"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={positionType}
                onChange={(event) => setPositionType(event.target.value)}
                aria-label="Filter by position type"
                className="rounded border border-light-grey px-2 py-2 text-sm text-black"
              >
                <option value="">All Position Types</option>
                {POSITION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={stateFilter}
              onChange={(event) => setStateFilter(event.target.value)}
              aria-label="Filter by location"
              className="w-full rounded border border-light-grey px-2 py-2 text-sm text-black"
            >
              <option value="">Location</option>
              {availableStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <p className="text-xs uppercase tracking-[0.6px] text-middle-grey">
              Showing {visibleJobs.length} of {filteredJobs.length} position
              {filteredJobs.length === 1 ? "" : "s"}
            </p>

            <div className="flex flex-col divide-y divide-light-grey overflow-y-auto lg:max-h-full">
              {visibleJobs.map((job) => (
                <button
                  key={job.requisitionId}
                  type="button"
                  onClick={() => flyToJob(job)}
                  className="flex flex-col items-start gap-1 py-4 text-left hover:bg-light-grey/40"
                >
                  <p className="text-base font-bold text-black">{job.title}</p>
                  <p className="text-sm text-middle-grey">
                    {job.city}, {job.state}
                  </p>
                  {formatPayRange(job.minPay, job.maxPay) && (
                    <p className="text-sm text-black">{formatPayRange(job.minPay, job.maxPay)}</p>
                  )}
                  <p className="text-xs text-middle-grey">Req ID: {job.requisitionId}</p>
                </button>
              ))}
              {visibleJobs.length === 0 && (
                <p className="py-4 text-sm text-middle-grey">
                  No open positions in view — try zooming out or clearing filters.
                </p>
              )}
            </div>
          </aside>
        </Container>
      </div>
    </section>
  );
}
