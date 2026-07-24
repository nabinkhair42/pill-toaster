import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Interactive block that shares typeset vertical rhythm. */
export function DocsDemo({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "not-typeset mt-(--typeset-flow) flex flex-wrap items-center gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
