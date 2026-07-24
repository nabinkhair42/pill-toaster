import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Check, Info, LoaderCircle, X } from "lucide-react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type HeroToast = {
  id: string;
  title: string;
  description?: string;
  action?: string;
  Icon: LucideIcon;
  iconClassName: string;
  /** Absolute placement only — keep transforms off the animated pill. */
  positionClassName: string;
};

/** Floating samples of every toast kind — the product is the visual. */
const samples: HeroToast[] = [
  {
    id: "success",
    title: "Event created",
    description: "Today at 9:00 AM",
    Icon: Check,
    iconClassName: "bg-background text-foreground",
    positionClassName:
      "left-1/2 top-[42%] z-30 -translate-x-1/2 -translate-y-1/2",
  },
  {
    id: "error",
    title: "Could not save",
    Icon: X,
    iconClassName: "bg-destructive text-[oklch(1_0_0)]",
    positionClassName:
      "left-[8%] top-[22%] z-20 -rotate-6 sm:left-[12%]",
  },
  {
    id: "info",
    title: "Be there 10 minutes early",
    Icon: Info,
    iconClassName: "bg-background/20 text-background",
    positionClassName:
      "right-[6%] top-[18%] z-20 rotate-3 sm:right-[10%]",
  },
  {
    id: "warning",
    title: "Starts before 8am",
    Icon: AlertTriangle,
    iconClassName: "bg-background/20 text-background",
    positionClassName:
      "left-[4%] bottom-[28%] z-10 -rotate-3 sm:left-[8%]",
  },
  {
    id: "loading",
    title: "Creating event…",
    Icon: LoaderCircle,
    iconClassName:
      "bg-background/20 text-background [&_svg]:animate-spin",
    positionClassName:
      "right-[4%] bottom-[26%] z-10 rotate-2 sm:right-[8%]",
  },
  {
    id: "action",
    title: "Invite sent",
    action: "Undo",
    Icon: Check,
    iconClassName: "bg-background text-foreground",
    positionClassName: "left-1/2 bottom-[12%] z-20 -translate-x-1/2",
  },
];

const popDelaysMs = [80, 180, 280, 380, 480, 580] as const;

function HeroPill({ toast: item, index }: { toast: HeroToast; index: number }) {
  const Icon = item.Icon;
  const delayMs = popDelaysMs[index] ?? 80 + index * 100;
  const delayStyle = {
    "--tw-animation-delay": `${delayMs}ms`,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "hero-toast-slot absolute w-max max-w-[min(100%,17rem)]",
        item.positionClassName,
      )}
    >
      <div
        className={cn(
          "hero-toast origin-center rounded-full",
          "bg-foreground text-background",
          "shadow-[0_1px_1px_oklch(0_0_0/0.06),0_12px_32px_oklch(0_0_0/0.16)]",
          "dark:shadow-[0_1px_1px_oklch(0_0_0/0.35),0_14px_36px_oklch(0_0_0/0.5)]",
          /* Pop in — same language as the live toaster enter */
          "animate-in fade-in zoom-in-50 blur-in-sm slide-in-from-top-3",
          "fill-mode-both duration-500",
          "ease-[cubic-bezier(0.16,1,0.3,1)]",
          "motion-reduce:animate-none motion-reduce:opacity-100",
        )}
        style={delayStyle}
      >
        <div className="flex items-center gap-2 px-3 py-2.5">
          <span
            className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded-full",
              "animate-in zoom-in-50 fade-in fill-mode-both duration-300",
              "ease-[cubic-bezier(0.16,1,0.3,1)]",
              "motion-reduce:animate-none",
              item.iconClassName,
            )}
            style={
              {
                "--tw-animation-delay": `${delayMs + 120}ms`,
              } as CSSProperties
            }
          >
            <Icon className="size-2.5" strokeWidth={3} />
          </span>
          <div className="flex min-w-0 items-baseline gap-1.5">
            <span className="truncate text-xs font-medium leading-none tracking-tight">
              {item.title}
            </span>
            {item.description ? (
              <span className="truncate text-xs leading-none tabular-nums text-background/70">
                {item.description}
              </span>
            ) : null}
          </div>
          {item.action ? (
            <span className="ms-0.5 shrink-0 rounded-full bg-background/15 px-2 py-0.5 text-xs font-medium text-background">
              {item.action}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/**
 * Product shot for the homepage: real pill toasts (types + action),
 * softly masked so the composition fades into the page.
 */
export function HeroToastShowcase({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "hero-toast-showcase hero-toast-mask relative mx-auto h-[22rem] w-full max-w-3xl sm:h-[24rem]",
        className,
      )}
    >
      {samples.map((item, index) => (
        <HeroPill key={item.id} toast={item} index={index} />
      ))}
    </div>
  );
}
