"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/pill-toaster";
import { cn } from "@/lib/utils";

export function CodeBlock({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Couldn’t copy");
    }
  }

  return (
    <div className={cn("not-typeset relative mt-(--typeset-flow)", className)}>
      <pre className="m-0 overflow-x-auto rounded-(--radius) bg-muted px-4 py-3 pr-12 font-mono text-[0.875em] leading-normal">
        <code className="bg-transparent p-0 font-[inherit] text-inherit">
          {code}
        </code>
      </pre>
      <Button
        type="button"
        variant="secondary"
        size="icon-sm"
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        onClick={copy}
      >
        <span className="relative size-3.5">
          <Copy
            className={cn(
              "absolute inset-0 size-3.5 transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
              copied
                ? "scale-[0.25] opacity-0 blur-2xl"
                : "scale-100 opacity-100 blur-0",
            )}
            aria-hidden
          />
          <Check
            className={cn(
              "absolute inset-0 size-3.5 transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
              copied
                ? "scale-100 opacity-100 blur-0"
                : "scale-[0.25] opacity-0 blur-2xl",
            )}
            aria-hidden
          />
        </span>
      </Button>
    </div>
  );
}
