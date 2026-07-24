import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pill Toaster — an opinionated pill toast for React";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, #e8e8e8 0%, transparent 45%), radial-gradient(circle at 80% 80%, #ececec 0%, transparent 40%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            height: 72,
            width: 220,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 20,
              width: 170,
              height: 36,
              borderRadius: 999,
              backgroundColor: "#2a2a2a",
              opacity: 0.45,
              transform: "scale(0.88)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 10,
              width: 190,
              height: 36,
              borderRadius: 999,
              backgroundColor: "#1f1f1f",
              opacity: 0.7,
              transform: "scale(0.94)",
            }}
          />
          <div
            style={{
              width: 210,
              height: 40,
              borderRadius: 999,
              backgroundColor: "#171717",
              boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#171717",
              lineHeight: 1.05,
            }}
          >
            Pill Toaster
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#525252",
              letterSpacing: "-0.01em",
              lineHeight: 1.35,
              maxWidth: 640,
              textAlign: "center",
            }}
          >
            An opinionated toast that does one thing well.
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
