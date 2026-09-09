import LayeredArt from "./LayeredArt";

/**
 * SSL-logo from the design system. Figma exports the wordmark and the
 * registered mark as two separate vectors, so they are composed here.
 * The frame is 182x48; `width` scales it and the height follows.
 */
export default function SslLogo({ width = 182 }: { width?: number }) {
  return (
    <span style={{ display: "block", width }}>
      <LayeredArt
        width={182}
        height={48}
        alt="SBI Securities"
        layers={[
          { src: "/figma/nav/ssl-logo-main.svg", box: [13.18, 3.62, 0, 0] },
          { src: "/figma/nav/ssl-logo-mark.svg", box: [0, 0.01, 84.35, 95.87] },
        ]}
      />
    </span>
  );
}
