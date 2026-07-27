"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { migratePrompts } from "@/components/docs/migrate-prompts";
import { migrateSources } from "@/components/docs/migrate-sources";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/pill-toaster";

function CopyPromptButton({
  prompt,
  label,
}: {
  prompt: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast.success("Prompt copied");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Couldn’t copy");
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label={copied ? `Copied ${label} prompt` : `Copy ${label} prompt`}
      className="shrink-0 gap-1.5"
      onClick={copy}
    >
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : "Copy prompt"}
    </Button>
  );
}

export function MigrateSection() {
  return (
    <section>
      <h2 id="migrate">Migrate</h2>
      <p>
        Switching from another toast library? Copy an agent prompt, paste it
        into Cursor (or any coding agent), and let it rewrite imports,{" "}
        <code>Toaster</code> mounts, and call sites for Pill Toaster.
      </p>
      <ul className="not-typeset mt-(--typeset-flow) list-none space-y-0 p-0">
        {migrateSources.map((source) => (
          <li
            key={source.id}
            className="flex items-center justify-between gap-4 border-b border-border py-3 first:border-t"
          >
            <div className="min-w-0">
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {source.name}
              </a>
              <p className="m-0 mt-0.5 truncate text-sm text-muted-foreground">
                {source.summary}
              </p>
            </div>
            <CopyPromptButton
              prompt={migratePrompts[source.id]}
              label={source.name}
            />
          </li>
        ))}
      </ul>
      <p>
        Each prompt installs from the registry, maps the old API onto{" "}
        <code>toast</code> / <code>Toaster</code>, and calls out gaps (custom
        JSX bodies, <code>duration</code> → <code>timeout</code>,{" "}
        <code>dismiss</code> → <code>close</code>).
      </p>
    </section>
  );
}
