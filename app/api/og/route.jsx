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
          color: "#101828",
          background: "linear-gradient(135deg, #fbfcff 0%, #eef4ff 52%, #e9fbf5 100%)",
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
              border: "2px solid #b8c6d9",
              borderRadius: 18,
              fontSize: 34,
              fontWeight: 700,
              color: "#315cf6",
              background: "#ffffff",
            }}
          >
            K
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>{siteConfig.name}</div>
            <div style={{ fontSize: 24, color: "#667085" }}>
              Systems brain / brand taste / steady execution
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
            Make the digital side feel less duct-taped.
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 24,
              color: "#315cf6",
            }}
          >
            <span>No vendor fog</span>
            <span>·</span>
            <span>Brand-aware build</span>
            <span>·</span>
            <span>Systems that survive launch</span>
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
