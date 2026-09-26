import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";

const { profile } = portfolio;

export const alt = `${profile.displayName} — ${profile.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Site-wide share card. Case studies override it with their own cover
// through generateMetadata in app/work/[slug].
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#EFEBE3",
          color: "#1C1B18",
        }}
      >
        {/* Same mark as app/icon.svg. */}
        <div style={{ display: "flex", position: "relative", width: 112, height: 112 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 42, height: 112, background: "#1C1B18" }} />
          <div
            style={{
              position: "absolute",
              left: 66,
              top: 66,
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "#E5482A",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>{profile.displayName}</div>
          <div style={{ marginTop: 28, fontSize: 38, color: "#625F58" }}>{profile.positioning}</div>
        </div>
      </div>
    ),
    size
  );
}
