import { ImageResponse } from "next/og";
import { siteConfig } from "../../seo";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#eceef2",
          background: "linear-gradient(135deg, #08090b 0%, #101216 56%, #181106 100%)",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 84,
              height: 84,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #2c303a",
              borderRadius: 18,
              fontSize: 34,
              fontWeight: 700,
              color: "#f3b34c",
            }}
          >
            KP
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>{siteConfig.name}</div>
            <div style={{ fontSize: 24, color: "#aeb5c0" }}>
              Senior technical operator for expensive ambiguity
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              maxWidth: 940,
              fontSize: 72,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Executive judgment for messy product, AI, commerce, and growth decisions.
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 24,
              color: "#f3b34c",
            }}
          >
            <span>Executive judgment</span>
            <span>·</span>
            <span>AI operations</span>
            <span>·</span>
            <span>Commerce systems</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
