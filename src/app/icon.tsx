import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Stone theme literals for ImageResponse (no CSS variables). */
const stone = {
  primary: "#1c1917",
  primaryForeground: "#fafaf9",
} as const;

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: stone.primary,
        borderRadius: 8,
      }}
    >
      <div
        style={{
          width: 20,
          height: 10,
          borderRadius: 999,
          backgroundColor: stone.primaryForeground,
        }}
      />
    </div>,
    { ...size },
  );
}
