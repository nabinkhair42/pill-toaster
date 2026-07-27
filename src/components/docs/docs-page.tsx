"use client";
import { DocsHeader } from "@/components/docs/docs-header";
import { ApiSection } from "@/components/docs/sections/api-section";
import { InstallationSection } from "@/components/docs/sections/installation-section";
import { MigrateSection } from "@/components/docs/sections/migrate-section";
import { PositionSection } from "@/components/docs/sections/position-section";
import { TypesSection } from "@/components/docs/sections/types-section";
import { UsageSection } from "@/components/docs/sections/usage-section";

export function DocsPage() {
  return (
    <div className="min-h-full bg-background">
      <DocsHeader />

      <article className="typeset typeset-docs mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <h1>Documentation</h1>
        <p>
          A succinct pill toast from Pill Toaster, built on{" "}
          <a href="https://base-ui.com/react/components/toast">Base UI</a> and
          themed with{" "}
          <a href="https://ui.shadcn.com/docs/components/base/toast">
            shadcn/ui
          </a>{" "}
          color tokens. One surface, clear status, swipe to dismiss. Install it
          from the{" "}
          <a href="https://ui.shadcn.com/docs/registry">shadcn registry</a>.
        </p>

        <InstallationSection />
        <UsageSection />
        <TypesSection />
        <PositionSection />
        <MigrateSection />
        <ApiSection />
      </article>
    </div>
  );
}
