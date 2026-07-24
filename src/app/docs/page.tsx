import type { Metadata } from "next";

import { DocsPage } from "@/components/docs/docs-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Install Pill Toaster from the shadcn registry. Types, actions, promises, positions, and the Toaster API.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: `Documentation · ${siteConfig.name}`,
    description:
      "Install Pill Toaster from the shadcn registry. Types, actions, promises, positions, and the Toaster API.",
    url: `${siteConfig.url}/docs`,
  },
};

export default function Page() {
  return <DocsPage />;
}
