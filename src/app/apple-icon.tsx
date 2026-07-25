import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Stone theme literals for ImageResponse (no CSS variables). */
const stone = {
  primary: "#1c1917",
  primaryForeground: "#fafaf9",
} as const;

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: stone.primary,
        borderRadius: 36,
      }}
    >
      <div
        style={{
          width: 112,
          height: 44,
          borderRadius: 999,
          backgroundColor: stone.primaryForeground,
        }}
      />
    </div>,
    { ...size },
  );
}
