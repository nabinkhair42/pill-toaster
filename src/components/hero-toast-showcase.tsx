import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Check, Info, LoaderCircle, X } from "lucide-react";

import { cn } from "@/lib/utils";

type HeroState = "success" | "error" | "info" | "warning" | "loading";

type HeroToast = {
  id: string;
  title: string;
  state: HeroState;
  action?: string;
  /** Absolute placement only — keep transforms off the animated pill. */
  positionClassName: string;
};

/** Floating samples of every toast kind — the product is the visual. */
const samples: HeroToast[] = [
  {
    id: "success",
    title: "Event created",
    state: "success",
    positionClassName:
      "left-1/2 top-[42%] z-30 -translate-x-1/2 -translate-y-1/2",
  },
  {
    id: "error",
    title: "Could not save",
    state: "error",
    positionClassName: "left-[8%] top-[22%] z-20 -rotate-6 sm:left-[12%]",
  },
  {
    id: "info",
    title: "Be there 10 minutes early",
    state: "info",
    positionClassName: "right-[6%] top-[18%] z-20 rotate-3 sm:right-[10%]",
  },
  {
    id: "warning",
    title: "Starts before 8am",
    state: "warning",
    positionClassName: "left-[4%] bottom-[28%] z-10 -rotate-3 sm:left-[8%]",
  },
  {
    id: "loading",
    title: "Creating event…",
    state: "loading",
    positionClassName: "right-[4%] bottom-[26%] z-10 rotate-2 sm:right-[8%]",
  },
  {
    id: "action",
    title: "Invite sent",
    state: "success",
    action: "Undo",
    positionClassName: "left-1/2 bottom-[12%] z-20 -translate-x-1/2",
  },
];

const toneIcon: Record<
  Exclude<HeroState, "success" | "loading">,
  LucideIcon
> = {
  error: X,
  warning: AlertTriangle,
  info: Info,
};

const toneInk: Record<Exclude<HeroState, "success" | "loading">, string> = {
  error: "text-destructive",
  warning: "text-amber-500 dark:text-amber-400",
  info: "text-sky-500 dark:text-sky-400",
};

const popDelays = [
  "delay-[80ms]",
  "delay-[180ms]",
  "delay-[280ms]",
  "delay-[380ms]",
  "delay-[480ms]",
  "delay-[580ms]",
] as const;

function HeroGlyph({ state }: { state: HeroState }) {
  if (state === "loading") {
    return <LoaderCircle className="size-4 animate-spin" aria-hidden />;
  }
  if (state === "success") {
    return <Check className="size-4" strokeWidth={3} aria-hidden />;
  }
  const Mark = toneIcon[state];
  return <Mark className={cn("size-4", toneInk[state])} aria-hidden />;
}

function HeroPill({ toast: item, index }: { toast: HeroToast; index: number }) {
  const delay = popDelays[index] ?? "delay-[80ms]";

  return (
    <div
      className={cn(
        "absolute w-max max-w-[min(100%,17rem)]",
        item.positionClassName,
      )}
    >
      <div className="hero-toast-slot">
        <div
          className={cn(
            "hero-toast origin-center rounded-full",
            "bg-popover text-sm text-foreground",
            "shadow-[0_0_0_1px_oklch(0_0_0/0.06),0_1px_2px_-1px_oklch(0_0_0/0.08),0_2px_8px_0_oklch(0_0_0/0.06)]",
            "dark:shadow-[0_0_0_1px_oklch(1_0_0/0.1),0_2px_8px_0_oklch(0_0_0/0.45)]",
            "animate-in fade-in zoom-in-95 blur-in-sm slide-in-from-top-6",
            "fill-mode-both duration-700",
            "ease-[linear(0,0.0037_0.9%,0.016_1.8%,0.065_3.6%,0.14_5.5%,0.32_9.3%,0.545_14.5%,0.715_19.2%,0.845_24.3%,0.928_29.4%,0.975_34.8%,0.995_40.4%,1.002_46.5%,1.003_53%,1.001_67%,1)]",
            "motion-reduce:animate-none motion-reduce:opacity-100",
            delay,
            item.action ? "py-1.5 pr-1.5 pl-3" : "px-4 py-2",
          )}
        >
          <div className="flex items-center gap-2">
            <span className="flex size-4 shrink-0 items-center justify-center">
              <HeroGlyph state={item.state} />
            </span>
            <span className="truncate font-normal">{item.title}</span>
            {item.action ? (
              <span className="w-max pl-7">
                <span className="inline-flex h-7 shrink-0 items-center justify-center rounded-full bg-primary px-2.5 text-xs font-medium whitespace-nowrap text-primary-foreground">
                  {item.action}
                </span>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Product shot for the homepage: real pill toasts (states + action),
 * softly masked so the composition fades into the page.
 */
export function HeroToastShowcase({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "hero-toast-showcase hero-toast-mask relative mx-auto h-88 w-full max-w-3xl sm:h-96",
        className,
      )}
    >
      {samples.map((item, index) => (
        <HeroPill key={item.id} toast={item} index={index} />
      ))}
    </div>
  );
}
