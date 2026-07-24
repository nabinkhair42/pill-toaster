import type { Metadata } from "next";

import { DocsPage } from "@/components/docs/docs-page";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Install and use toaster — types, actions, promises, and position props.",
};

export default function Page() {
  return <DocsPage />;
}
