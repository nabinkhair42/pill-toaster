import { cn } from "@/lib/utils";

const layers = [
  {
    label: "front",
    className:
      "z-30 scale-100 translate-y-0 opacity-100 shadow-[0_1px_1px_oklch(0_0_0/0.04),0_10px_28px_oklch(0_0_0/0.12)]",
  },
  {
    label: "mid",
    className:
      "z-20 scale-[0.94] -translate-y-2.5 opacity-90 shadow-[0_8px_20px_oklch(0_0_0/0.08)]",
  },
  {
    label: "back",
    className:
      "z-10 scale-[0.88] -translate-y-5 opacity-70 shadow-[0_6px_16px_oklch(0_0_0/0.06)]",
  },
] as const;

/** Decorative stacked pills — Sonner-style hero_toastWrapper. */
export function HeroToastStack({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "hero-toast-stack relative mx-auto h-[4.5rem] w-[min(100%,16rem)]",
        className,
      )}
    >
      {layers.map((layer, index) => (
        <div
          key={layer.label}
          className={cn(
            "hero-toast absolute inset-x-0 bottom-0 h-10 origin-bottom rounded-full bg-primary",
            "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            layer.className,
          )}
          style={{ animationDelay: `${index * 90}ms` }}
        />
      ))}
    </div>
  );
}
