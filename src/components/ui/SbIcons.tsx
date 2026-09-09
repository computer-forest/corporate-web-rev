/**
 * Dotted arrows from the pre-login design system.
 *
 * Path data is taken verbatim from the Figma exports; only the stroke is
 * re-pointed at currentColor so the same icon serves the indigo-on-light
 * sections and the white-on-gradient ones.
 *
 * The dash periods are the one thing NOT taken verbatim. Figma fits the dash
 * pattern to the path so the last dot lands on the end; SVG marches it from
 * the start and simply omits a dash that begins past the end. Copying the
 * exported dasharray therefore costs the arrow its final dot. Each period
 * below is pathLength / (dots - 1), measured off the 1x Figma renders — see
 * the note on SMALL. Change the geometry and the period has to follow.
 */

export function ArrowUpRightIcon({ size = 46 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 46 46"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Shaft: 32.527 long, dots every 4 — nine of them, the last stopping
          just shy of the head so the corner dot is the head's own. */}
      <path
        d="M6.73654 23H23H39.2635"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0.12 3.88"
      />
      {/* Head: each limb is 18.688, dotted every fifth of it so a dot lands
          exactly on the corner. Its dash is tighter than the shaft's. */}
      <path
        d="M26.0488 9.78613L39.2629 23.0002L26.0488 36.2142"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0.12 3.617"
      />
    </svg>
  );
}

/**
 * The carousel chevrons.
 *
 * Two things here are easy to get wrong, and both change how the arrow reads:
 *
 * 1. The previous arrow is the next one mirrored on X, never rotated 180°.
 *    A rotation flips the shape vertically as well, which is wrong. Figma
 *    exports one path for both arrows and mirrors the instance; the left path
 *    data below is that same path reflected about the box centre, which
 *    renders identically to the transform.
 *
 * 2. The 46px arrow beside the testimonials is NOT the 40px one scaled. It is
 *    its own geometry — limbs almost twice as long inside the box, a heavier
 *    stroke and a wider dash — which is why it carries seven dots to the
 *    pagination arrow's five.
 *
 * 3. Both chevrons sit at the arrowhead's place inside the box rather than
 *    centred in it: these are the arrow-up-right component with its shaft
 *    hidden, so the head keeps the position it had on the full arrow. Only
 *    the vertical centring is shared. Getting this wrong pushes the 46px
 *    pair out through the bottom of its own viewBox, where it is clipped.
 */
interface ChevronGeometry {
  box: number;
  stroke: number;
  dash: string;
  right: string;
  left: string;
}

/* arrow-up-right 1 / 2 — the 40px pagination pair. The export says
   "0.16 5", but Figma renders the pattern fitted to the path while a browser
   marches it from the start and drops any dash that begins past the end. At
   5.16 the fifth dash starts at 20.64 on a path 20.3125 long, so the tip of
   the lower limb loses its dot and the chevron reads lopsided. The period
   here is pathLength / 4, which puts the five dots where Figma shows them. */
const SMALL: ChevronGeometry = {
  box: 40,
  stroke: 3.125,
  dash: "0.16 4.917",
  right: "M20 12.5L27.1972 19.6658L20.0314 26.8631",
  left: "M20 12.5L12.8028 19.6658L19.9686 26.8631",
};

/* arrow-up-right 2 / 3 — the 46px pair flanking the testimonial stage. The
   limbs are 18.688 each and the dash is a third of that, so the seven dots
   land on the start, the corner and the end. */
const LARGE: ChevronGeometry = {
  box: 46,
  stroke: 3.83333,
  dash: "0.18 6.048",
  right: "M26.0488 9.78613L39.2629 23.0002L26.0488 36.2142",
  left: "M19.9512 9.78613L6.7371 23.0002L19.9512 36.2142",
};

function Chevron({
  geometry,
  direction,
}: {
  geometry: ChevronGeometry;
  direction: "left" | "right";
}) {
  return (
    <svg
      width={geometry.box}
      height={geometry.box}
      viewBox={`0 0 ${geometry.box} ${geometry.box}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={geometry[direction]}
        stroke="currentColor"
        strokeWidth={geometry.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={geometry.dash}
      />
    </svg>
  );
}

export function ChevronRightIcon() {
  return <Chevron geometry={SMALL} direction="right" />;
}

export function ChevronLeftIcon() {
  return <Chevron geometry={SMALL} direction="left" />;
}

export function LargeChevronRightIcon() {
  return <Chevron geometry={LARGE} direction="right" />;
}

export function LargeChevronLeftIcon() {
  return <Chevron geometry={LARGE} direction="left" />;
}
