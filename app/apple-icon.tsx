import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as app/icon.svg, scaled to the 32-unit grid (×5.625). iOS rounds
// the corners itself, so the tile is square.
const u = 180 / 32;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#EFEBE3" }}>
        <div style={{ position: "absolute", left: 8 * u, top: 7 * u, width: 7 * u, height: 18 * u, background: "#1C1B18" }} />
        <div
          style={{
            position: "absolute",
            left: 18 * u,
            top: 18 * u,
            width: 7 * u,
            height: 7 * u,
            borderRadius: "50%",
            background: "#E5482A",
          }}
        />
      </div>
    ),
    size
  );
}
