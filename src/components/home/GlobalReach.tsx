"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import styles from "./GlobalReach.module.css";

const ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
const TILT = 23.44;
const BASE_SPIN = 5.78; // deg / second
const HUB: [number, number] = [-98, 39];

const GP_LON: Record<string, number> = {
  Mexico: -102,
  Panama: -80,
  Colombia: -74,
  Peru: -75,
  Chile: -71,
  Brazil: -51,
  Argentina: -64,
  Morocco: -7,
  "United Kingdom": -1.5,
  Spain: -3.7,
  France: 2.3,
  Germany: 10,
  Italy: 12.5,
  Austria: 14.5,
  Sweden: 16,
  Norway: 9,
  Finland: 26,
  "South Africa": 24,
  "United Arab Emirates": 54,
  India: 79,
  Thailand: 101,
  Malaysia: 102,
  Indonesia: 113,
  Vietnam: 106,
  China: 104,
  Taiwan: 121,
  Philippines: 122,
  "South Korea": 127.5,
  Japan: 138,
  Australia: 134,
  "New Zealand": 172,
};
const CP_LON: Record<string, number> = { "United States of America": -98, Canada: -106 };
const IGNITE_START = 650;
const IGNITE_RISE = 700;
const ARC_DRAW = 900;
const HOLD_MS = 1400;
const TOUR_SPIN = 5.78; // hold on the US, then one guided revolution at ambient speed

function wrap180(d: number) {
  d = (d + 180) % 360;
  return (d < 0 ? d + 360 : d) - 180;
}

type Pin = {
  n: string;
  lon: number;
  lat: number;
  cp?: boolean;
  label?: boolean;
};

const PINS: Pin[] = [
  { n: "UNITED STATES", lon: -98, lat: 39, cp: true, label: true },
  { n: "CANADA", lon: -106, lat: 56, cp: true, label: true },
  { n: "MEXICO", lon: -102, lat: 23, label: true },
  { n: "PANAMA", lon: -80, lat: 8.5 },
  { n: "COLUMBIA", lon: -74, lat: 4 },
  { n: "PERU", lon: -75, lat: -10 },
  { n: "CHILE", lon: -71, lat: -33 },
  { n: "BRAZIL", lon: -51, lat: -11, label: true },
  { n: "ARGENTINA", lon: -64, lat: -35 },
  { n: "MOROCCO", lon: -7, lat: 32 },
  { n: "ENGLAND", lon: -1.5, lat: 52.5, label: true },
  { n: "SPAIN", lon: -3.7, lat: 40 },
  { n: "FRANCE", lon: 2.3, lat: 47 },
  { n: "GERMANY", lon: 10, lat: 51, label: true },
  { n: "ITALY", lon: 12.5, lat: 42 },
  { n: "AUSTRIA", lon: 14.5, lat: 47.6 },
  { n: "SWEDEN", lon: 16, lat: 61 },
  { n: "NORWAY", lon: 9, lat: 61.5 },
  { n: "FINLAND", lon: 26, lat: 64 },
  { n: "SOUTH AFRICA", lon: 24, lat: -29, label: true },
  { n: "UNITED ARAB EMIRATES", lon: 54, lat: 24 },
  { n: "INDIA", lon: 79, lat: 22, label: true },
  { n: "THAILAND", lon: 101, lat: 15 },
  { n: "SINGAPORE", lon: 103.8, lat: 1.3 },
  { n: "MALAYSIA", lon: 102, lat: 4 },
  { n: "INDONESIA", lon: 113, lat: -2 },
  { n: "VIETNAM", lon: 106, lat: 16 },
  { n: "CHINA", lon: 104, lat: 35, label: true },
  { n: "HONG KONG", lon: 114.2, lat: 22.3 },
  { n: "TAIWAN", lon: 121, lat: 23.7 },
  { n: "PHILIPPINES", lon: 122, lat: 12 },
  { n: "SOUTH KOREA", lon: 127.5, lat: 36.4 },
  { n: "JAPAN", lon: 138, lat: 36, label: true },
  { n: "AUSTRALIA", lon: 134, lat: -25, label: true },
  { n: "NEW ZEALAND", lon: 172, lat: -41, label: true },
];

const ROSTER = [
  "Argentina",
  "Australia",
  "Austria",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Columbia",
  "England",
  "Finland",
  "France",
  "Germany",
  "Hong Kong",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
  "Malaysia",
  "Mexico",
  "Morocco",
  "New Zealand",
  "Norway",
  "Panama",
  "Peru",
  "Philippines",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Thailand",
  "Taiwan",
  "United Arab Emirates",
  "United States",
  "Vietnam",
];

const SIZE = { cx: 420, cy: 400, rFull: 330 };

export function GlobalReach() {
  const [rosterOpen, setRosterOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [dragging, setDragging] = useState(false);

  const holderRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const landGRef = useRef<SVGGElement>(null);
  const arcsGRef = useRef<SVGGElement>(null);
  const pinsGRef = useRef<SVGGElement>(null);
  const gratPRef = useRef<SVGPathElement>(null);
  const ocnRef = useRef<SVGCircleElement>(null);
  const atmRef = useRef<SVGCircleElement>(null);
  const edgeRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const holder = holderRef.current;
    const landG = landGRef.current;
    const arcsG = arcsGRef.current;
    const pinsG = pinsGRef.current;
    const gratP = gratPRef.current;
    const ocn = ocnRef.current;
    const atm = atmRef.current;
    const edge = edgeRef.current;
    if (!holder || !landG || !arcsG || !pinsG || !gratP || !ocn || !atm || !edge) return;

    const { cx: CX, cy: CY, rFull: R_FULL } = SIZE;

    type LandPath = {
      f: d3.ExtendedFeature;
      el: SVGPathElement;
      lit: boolean | 1;
      lon: number;
      at: number | null;
      mix: ((t: number) => string) | null;
      edge: string;
    };
    type ArcDatum = { pts: [number, number][]; el: SVGPathElement; lon: number; at: number | null };
    type PinNode = {
      pin: Pin;
      el: SVGGElement;
      tag: SVGGElement | null;
      line: SVGLineElement | null;
      text: SVGTextElement | null;
      lon: number;
      at: number | null;
    };

    let landPaths: LandPath[] = [];
    const arcData: ArcDatum[] = [];
    let pinNodes: PinNode[] = [];

    const graticule = d3.geoGraticule10();
    const proj = d3.geoOrthographic().clipAngle(90).translate([CX, CY]);
    const path = d3.geoPath(proj);

    let lon = 98;
    let vel = 0;
    let isDragging = false;
    let lastX = 0;
    let lastMove = 0;
    let spinCur = 0;
    let traveled = 0;
    let t0: number | null = null;
    const INTRO = 1900;
    const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

    let rafId = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let rafAlive = false;
    let cancelled = false;
    let lastTick = 0;

    fetch(ATLAS_URL)
      .then((r) => r.json())
      .then((topo) => {
        if (cancelled) return;
        const features = (
          topojson.feature(topo, topo.objects.countries) as unknown as {
            features: d3.ExtendedFeature[];
          }
        ).features;

        landPaths = features.map((f) => {
          const name = (f.properties as { name?: string } | null)?.name ?? "";
          const cp = CP_LON[name] !== undefined;
          const gp = GP_LON[name] !== undefined;
          const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
          p.setAttribute("fill", "#1a2b33");
          p.setAttribute("stroke", "#0d1a20");
          p.setAttribute("stroke-width", cp || gp ? "0.7" : "0.5");
          landG.appendChild(p);
          return {
            f,
            el: p,
            lit: !(cp || gp),
            lon: cp ? CP_LON[name] : gp ? GP_LON[name] : 0,
            at: cp ? IGNITE_START : null,
            mix: cp || gp ? d3.interpolateRgb("#1a2b33", cp ? "#0275b3" : "#02b391") : null,
            edge: cp ? "#3aa0d8" : "#3fd7ba",
          };
        });

        PINS.forEach((pin) => {
          if (pin.cp) return;
          const gi = d3.geoInterpolate(HUB, [pin.lon, pin.lat]);
          const pts: [number, number][] = [];
          for (let k = 0; k <= 36; k++) pts.push(gi(k / 36));
          const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
          el.setAttribute("fill", "none");
          el.setAttribute("stroke", "#0275b3");
          el.setAttribute("stroke-width", "1.1");
          el.setAttribute("stroke-linecap", "round");
          el.setAttribute("opacity", "0.4");
          arcsG.appendChild(el);
          arcData.push({ pts, el, lon: pin.lon, at: null });
        });

        pinNodes = PINS.map((pin) => {
          const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
          g.setAttribute("opacity", "0");
          g.setAttribute("transform", "translate(-9999,-9999)");
          const col = pin.cp ? "#3aa0d8" : "#3fd7ba";
          g.innerHTML =
            `<circle r="11" fill="${col}" opacity="0.16"></circle>` +
            `<circle r="5.5" fill="${col}" opacity="0.35"></circle>` +
            `<circle r="2.8" fill="#ffffff"></circle>` +
            (pin.label
              ? `<g class="tag" filter="url(#tagShadow)">` +
                `<line x1="0" y1="0" x2="-35" y2="-35" stroke="${col}" stroke-width="0.9"></line>` +
                `<text x="-41" y="-41" text-anchor="end" fill="#ffffff" ` +
                `style="font:300 12px 'Normalidad',Arial,sans-serif;letter-spacing:.16em">${pin.n}</text></g>`
              : "");
          pinsG.appendChild(g);
          return {
            pin,
            el: g,
            tag: g.querySelector("g.tag"),
            line: g.querySelector("line"),
            text: g.querySelector("text"),
            lon: pin.lon,
            at: pin.cp ? IGNITE_START : null,
          };
        });
      });

    function armed(item: { lon: number; at: number | null }, currentLon: number, ms: number) {
      if (item.at === null && Math.abs(wrap180(item.lon + currentLon)) < 58) item.at = ms;
      return item.at !== null;
    }

    function tick(now: number) {
      if (t0 === null) t0 = now;
      const dt = Math.min(0.05, (now - (lastTick || now)) / 1000);
      lastTick = now;

      const p = Math.min(1, (now - t0) / INTRO);
      const e = easeOut(p);
      const R = R_FULL * (0.34 + 0.66 * e);
      const ms0 = now - t0;
      const target = ms0 < HOLD_MS ? 0 : traveled < 352 ? TOUR_SPIN : BASE_SPIN;
      spinCur += (target - spinCur) * Math.min(1, dt * 1.8);
      const spin = spinCur;

      if (isDragging) {
        // longitude driven by the pointer
      } else {
        lon += (spin + vel) * dt;
        traveled += spin * dt;
        vel *= Math.pow(0.02, dt); // momentum settles back to the ambient spin
      }
      if (lon > 360) lon -= 360;
      else if (lon < -360) lon += 360;

      proj.scale(R).rotate([lon, 0, 0]);

      ocn!.setAttribute("cx", String(CX));
      ocn!.setAttribute("cy", String(CY));
      ocn!.setAttribute("r", String(R));
      edge!.setAttribute("cx", String(CX));
      edge!.setAttribute("cy", String(CY));
      edge!.setAttribute("r", String(R));
      atm!.setAttribute("cx", String(CX));
      atm!.setAttribute("cy", String(CY));
      atm!.setAttribute("r", String(R * 1.16));
      gratP!.setAttribute("d", path(graticule) || "");

      const fade = e;
      const ms = now - t0;

      for (const lp of landPaths) {
        const d = path(lp.f);
        lp.el.setAttribute("d", d || "M0 0");
        lp.el.setAttribute("opacity", d ? String(fade) : "0");
        if (lp.mix && lp.lit !== 1 && armed(lp, lon, ms)) {
          const k = Math.max(0, Math.min(1, (ms - lp.at!) / IGNITE_RISE));
          const flash = Math.max(0, 1 - Math.abs(ms - lp.at! - 420) / 800);
          lp.el.setAttribute("fill", lp.mix(k));
          lp.el.setAttribute("stroke", k > 0.15 ? lp.edge : "#0d1a20");
          lp.el.setAttribute("stroke-width", String(0.7 + flash * 1.3));
          if (k === 1 && flash === 0) lp.lit = 1;
        }
      }

      for (const arc of arcData) {
        if (!armed(arc, lon, ms)) {
          arc.el.setAttribute("opacity", "0");
          continue;
        }
        const prog = Math.max(0, Math.min(1, (ms - (arc.at! - 250)) / ARC_DRAW));
        if (prog <= 0.02) {
          arc.el.setAttribute("opacity", "0");
          continue;
        }
        const slice = arc.pts.slice(0, Math.max(2, Math.ceil(arc.pts.length * prog)));
        const ad = path({ type: "LineString", coordinates: slice });
        arc.el.setAttribute("d", ad || "M0 0");
        arc.el.setAttribute("opacity", ad ? String(0.34 * fade) : "0");
      }

      const rot = d3.geoRotation([lon, 0, 0]);
      const focal = R * 2.6;
      for (const node of pinNodes) {
        const { pin, el } = node;
        const rl = rot([pin.lon, pin.lat]);
        const aRad = (rl[0] * Math.PI) / 180;
        const bRad = (rl[1] * Math.PI) / 180;
        const x = CX + R * Math.cos(bRad) * Math.sin(aRad);
        const y = CY - R * Math.sin(bRad);
        const z = R * Math.cos(bRad) * Math.cos(aRad);
        if (z <= 0) {
          el.setAttribute("opacity", "0");
          el.setAttribute("transform", "translate(-9999,-9999)");
          continue;
        }
        const depth = z / R;
        const s = focal / (focal - z); // grows as it nears the focal point
        el.setAttribute(
          "transform",
          `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${-TILT}) scale(${s.toFixed(3)})`,
        );
        if (!armed(node, lon, ms)) {
          el.setAttribute("opacity", "0");
          continue;
        }
        const born = Math.max(0, Math.min(1, (ms - node.at!) / 500));
        el.setAttribute("opacity", (Math.pow(depth, pin.label ? 1.6 : 0.6) * fade * born).toFixed(3));
        if (node.text && node.tag && node.line) {
          const TH = CX * 0.78;
          const dir = x < TH ? 1 : -1; // flip the tag inward so it never runs off the panel
          const q = Math.min(1, Math.abs(x - TH) / 90);
          const swapFade = q * q * (3 - 2 * q);
          node.tag.setAttribute("opacity", swapFade.toFixed(3));
          node.line.setAttribute("x2", String(35 * dir));
          node.text.setAttribute("x", String(41 * dir));
          node.text.setAttribute("text-anchor", dir < 0 ? "end" : "start");
        }
      }
    }

    function loop(now: number) {
      if (cancelled) return;
      rafAlive = true;
      tick(now);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
    const fallbackTimer = setTimeout(() => {
      if (!rafAlive && !cancelled) {
        intervalId = setInterval(() => tick(performance.now()), 33);
      }
    }, 700);

    function down(ev: PointerEvent) {
      isDragging = true;
      setDragging(true);
      setTouched(true);
      lastX = ev.clientX;
      lastMove = performance.now();
      holder!.setPointerCapture?.(ev.pointerId);
    }
    function move(ev: PointerEvent) {
      if (!isDragging) return;
      const rect = holder!.getBoundingClientRect();
      const perPx = 180 / (rect.width * 0.42); // degrees per pixel at the current radius
      const dx = ev.clientX - lastX;
      lon += dx * perPx;
      const now = performance.now();
      const dt = Math.max(8, now - lastMove) / 1000;
      vel = (dx * perPx) / dt;
      lastX = ev.clientX;
      lastMove = now;
      ev.preventDefault();
    }
    function up(ev: PointerEvent) {
      if (!isDragging) return;
      isDragging = false;
      setDragging(false);
      vel = Math.max(-260, Math.min(260, vel));
      if (ev.pointerId != null) holder!.releasePointerCapture?.(ev.pointerId);
    }

    holder.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(fallbackTimer);
      if (intervalId) clearInterval(intervalId);
      holder.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section
      className={`${styles.reach} ${rosterOpen ? styles.isExpanded : ""} ${touched ? styles.isTouched : ""}`}
      data-screen-label="Global reach"
    >
      <div className={styles.grid}>
        <div className={styles.copy}>
          <h2 className={styles.head}>
            Our strategic partnerships
            <br />
            <em>Have Global Reach</em>
          </h2>
          <p className={styles.sub}>
            Our partners span the globe. Wherever you need to show up, Channel Partners brings
            the expertise to make it happen.
          </p>
          <button
            className={styles.rosterToggle}
            type="button"
            aria-expanded={rosterOpen}
            aria-controls="global-reach-roster"
            onClick={() => setRosterOpen((v) => !v)}
          >
            {rosterOpen ? "Hide countries " : "View all countries "}
            <span>&#9662;</span>
          </button>
          <ul className={styles.roster} id="global-reach-roster" hidden={!rosterOpen}>
            {ROSTER.map((name) => (
              <li
                key={name}
                className={`${styles.rosterItem} ${
                  name === "United States" || name === "Canada" ? styles.isCp : ""
                }`}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.foot}>
        <div>
          <div className={styles.legend}>
            <span>
              <i style={{ background: "#0275b3" }} />
              Channel Partners
            </span>
            <span>
              <i style={{ background: "#02b391" }} />
              Global Partners
            </span>
          </div>
          <p className={styles.globeHint}>Drag the globe to spin</p>
        </div>
      </div>

      <div
        ref={holderRef}
        className={`${styles.globe} ${dragging ? styles.isDragging : ""}`}
        id="global-reach-globe"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 800 800"
          aria-label="Rotating globe showing Channel Partners and global partner countries"
        >
          <defs>
            <radialGradient id="ocean" cx="42%" cy="34%">
              <stop offset="0%" stopColor="#123c56" />
              <stop offset="62%" stopColor="#0d2635" />
              <stop offset="100%" stopColor="#08161e" />
            </radialGradient>
            <radialGradient id="rim" cx="50%" cy="50%">
              <stop offset="72%" stopColor="#0275b3" stopOpacity="0" />
              <stop offset="97%" stopColor="#0275b3" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#0275b3" stopOpacity="0" />
            </radialGradient>
            <filter id="tagShadow" x="-30%" y="-60%" width="160%" height="260%">
              <feDropShadow dx="0" dy="1" stdDeviation="2.2" floodColor="#050f13" floodOpacity="0.85" />
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#050f13" floodOpacity="0.55" />
            </filter>
          </defs>
          <g transform="rotate(23.44 420 400)">
            <circle ref={atmRef} fill="url(#rim)" />
            <circle ref={ocnRef} fill="url(#ocean)" />
            <path ref={gratPRef} fill="none" stroke="#0275b3" strokeWidth="0.5" opacity="0.22" />
            <g ref={landGRef} />
            <g ref={arcsGRef} />
            <circle ref={edgeRef} fill="none" stroke="#0275b3" strokeWidth="1.2" opacity="0.45" />
            <g ref={pinsGRef} />
          </g>
        </svg>
      </div>
    </section>
  );
}
