import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

// Prerender to a static file for `output: "export"`.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1c1917",
    icons: [
      {
        src: "/icon",
        type: "image/png",
        sizes: "32x32",
      },
    ],
  };
}
