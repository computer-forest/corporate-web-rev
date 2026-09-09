"use client";

import { useEffect, useState } from "react";
import { SERVICES } from "@/constants/services";
import { prefersReducedMotion } from "@/utils/a11y";
import styles from "./route-chart.module.scss";

/**
 * The signature element: an export cable route drawn across a bathymetric
 * contour field. The four survey stations are the four service phases, in the
 * order the work actually runs. The route draws itself once on load; under
 * reduced motion it is simply present.
 */

const CONTOURS = [
  "M0 372 C 140 352, 250 392, 372 366 S 616 330, 760 356 S 900 372, 960 358",
  "M0 316 C 150 292, 268 338, 392 306 S 630 268, 772 300 S 904 318, 960 302",
  "M0 258 C 132 232, 276 278, 404 244 S 640 206, 786 240 S 906 258, 960 244",
  "M0 198 C 148 170, 288 216, 424 180 S 656 142, 800 178 S 910 196, 960 182",
  "M0 138 C 160 112, 300 154, 442 118 S 668 82, 812 116 S 914 134, 960 122",
  "M0 78 C 172 54, 314 94, 458 60 S 680 26, 824 58 S 918 74, 960 64",
];

const ROUTE =
  "M28 392 C 150 372, 214 318, 300 300 S 452 292, 540 246 S 668 184, 744 140 S 830 96, 906 82";

// Points solved on the route above, one per service phase.
const STATION_POINTS = [
  { x: 110, y: 372 },
  { x: 419, y: 284 },
  { x: 646, y: 192 },
  { x: 867, y: 89 },
];

export default function RouteChart() {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDrawn(true);
      return;
    }
    const id = window.setTimeout(() => setDrawn(true), 160);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <figure className={styles.figure}>
      <svg
        className={styles.chart}
        viewBox="0 0 960 430"
        role="img"
        aria-label="Schematic of an export cable route rising from deep water to landfall, marked with four survey stations: site survey, cable route engineering, substation and landfall design, and grid connection."
      >
        <defs>
          <linearGradient id="fgDeep" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#03121a" />
            <stop offset="100%" stopColor="#0c2a36" />
          </linearGradient>
          <linearGradient id="fgRoute" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#17a08f" />
            <stop offset="72%" stopColor="#4ac7ab" />
            <stop offset="100%" stopColor="#e4952b" />
          </linearGradient>
        </defs>

        <rect width="960" height="430" fill="url(#fgDeep)" />

        <g className={styles.grid}>
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 68} y1="0" x2={i * 68} y2="430" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 68} x2="960" y2={i * 68} />
          ))}
        </g>

        <g className={styles.contours}>
          {CONTOURS.map((d, i) => (
            <path key={d} d={d} style={{ opacity: 0.14 + i * 0.06 }} />
          ))}
        </g>

        <g className={styles.soundings}>
          <text x="16" y="364">46 m</text>
          <text x="16" y="248">32 m</text>
          <text x="16" y="128">14 m</text>
        </g>

        <path
          d={ROUTE}
          pathLength={1}
          className={`${styles.route} ${drawn ? styles.routeIn : ""}`}
        />

        {SERVICES.map((service, index) => {
          const point = STATION_POINTS[index];
          return (
            <g
              key={service.slug}
              className={`${styles.station} ${drawn ? styles.stationIn : ""}`}
              style={{ animationDelay: `${520 + index * 200}ms` }}
            >
              <title>{service.title}</title>
              <line x1={point.x} y1={point.y - 12} x2={point.x} y2={point.y - 36} />
              <circle cx={point.x} cy={point.y} r="4.5" />
              <text x={point.x} y={point.y - 46} textAnchor="middle">
                {service.station}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className={styles.caption}>
        Indicative export route, deep water to landfall. Stations mark the four phases of a
        transmission package.
      </figcaption>
    </figure>
  );
}
