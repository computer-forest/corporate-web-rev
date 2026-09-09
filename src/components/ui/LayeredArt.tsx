import styles from "./layered-art.module.scss";

/**
 * One exported layer of a Figma illustration.
 *
 * Figma emits these illustrations as a stack of absolutely positioned SVG
 * fragments rather than a single file, so we keep its geometry verbatim:
 * `box` is the layer's inset inside the art frame and `bleed` is the negative
 * inset Figma adds so strokes that overflow the layer bounds still draw.
 * All values are percentages in CSS order — top, right, bottom, left.
 */
export interface ArtLayer {
  src: string;
  box: [number, number, number, number];
  bleed?: [number, number, number, number];
}

interface LayeredArtProps {
  layers: ArtLayer[];
  /** Frame size in Figma, used to hold the aspect ratio as the art scales. */
  width: number;
  height: number;
  /** Empty when the art is decorative and the surrounding copy carries it. */
  alt?: string;
  className?: string;
}

function inset([top, right, bottom, left]: [number, number, number, number]) {
  return {
    top: `${top}%`,
    right: `${right}%`,
    bottom: `${bottom}%`,
    left: `${left}%`,
  };
}

export default function LayeredArt({
  layers,
  width,
  height,
  alt = "",
  className,
}: LayeredArtProps) {
  return (
    <div
      className={className ? `${styles.art} ${className}` : styles.art}
      style={{ aspectRatio: `${width} / ${height}` }}
      role={alt ? "img" : "presentation"}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      {layers.map((layer, i) => (
        <span key={layer.src + i} className={styles.box} style={inset(layer.box)}>
          <span
            className={styles.bleed}
            style={layer.bleed ? inset(layer.bleed) : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={layer.src} alt="" />
          </span>
        </span>
      ))}
    </div>
  );
}
