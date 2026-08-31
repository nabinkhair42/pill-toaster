"use client";

import { Toast } from "@base-ui/react/toast";
import { AlertTriangle, Check, Info, LoaderCircle, X } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

const toastManager = Toast.createToastManager();

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastOptions = Parameters<typeof toastManager.add>[0];

type ToasterProps = Toast.Provider.Props & {
  position?: ToastPosition;
  offset?: number | string;
  className?: string;
};

const icons = {
  success: Check,
  error: X,
  info: Info,
  warning: AlertTriangle,
  loading: LoaderCircle,
} as const;

type ToastType = keyof typeof icons;

const chip = {
  success: "bg-primary-foreground text-primary",
  error: "bg-destructive text-primary-foreground",
  info: "bg-primary-foreground/20",
  warning: "bg-primary-foreground/20",
  loading:
    "bg-primary-foreground/20 [&_svg]:animate-spin motion-reduce:[&_svg]:animate-none",
} as const;

function ToastList({ position }: { position: ToastPosition }) {
  const { toasts } = Toast.useToastManager();
  const isTop = position.startsWith("top");
  const swipe = position.endsWith("left")
    ? "left"
    : position.endsWith("right")
      ? "right"
      : isTop
        ? "up"
        : "down";

  return toasts.map((item) => {
    const type =
      item.type && item.type in icons ? (item.type as ToastType) : "success";
    const Icon = icons[type];

    return (
      <Toast.Root
        key={item.id}
        toast={item}
        swipeDirection={swipe}
        className={cn(
          "pointer-events-auto relative w-max max-w-[min(100%,20rem)] rounded-full bg-primary text-primary-foreground shadow-lg select-none transform-gpu",
          "translate-x-(--toast-swipe-movement-x,0px) translate-y-(--toast-swipe-movement-y,0px)",
          "[transition-property:transform,opacity,filter]",
          "duration-[620ms,280ms,420ms]",
          "ease-[linear(0,0.0037_0.9%,0.016_1.8%,0.065_3.6%,0.14_5.5%,0.32_9.3%,0.545_14.5%,0.715_19.2%,0.845_24.3%,0.928_29.4%,0.975_34.8%,0.995_40.4%,1.002_46.5%,1.003_53%,1.001_67%,1),cubic-bezier(0.2,0,0,1),cubic-bezier(0.2,0,0,1)]",
          "data-ending-style:duration-[340ms,200ms,260ms]",
          "data-ending-style:ease-[cubic-bezier(0.4,0,1,1),cubic-bezier(0.4,0,1,1),cubic-bezier(0.4,0,1,1)]",
          "data-swiping:transition-none motion-reduce:transition-none",
          "data-starting-style:opacity-0 data-starting-style:scale-[0.92] data-starting-style:blur-md",
          "data-ending-style:opacity-0 data-ending-style:scale-[0.97] data-ending-style:blur-xl",
          isTop
            ? "origin-top data-starting-style:-translate-y-6 data-ending-style:-translate-y-3"
            : "origin-bottom data-starting-style:translate-y-6 data-ending-style:translate-y-3",
          "data-ending-style:data-swipe-direction:translate-x-[calc(var(--toast-swipe-movement-x,0px)*2)] data-ending-style:data-swipe-direction:translate-y-[calc(var(--toast-swipe-movement-y,0px)*2)] data-ending-style:data-swipe-direction:scale-100 data-ending-style:data-swipe-direction:blur-none",
          "data-limited:hidden",
        )}
      >
        <Toast.Content className="flex items-center gap-2 px-2.5 py-2">
          <span
            className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded-full",
              chip[type],
            )}
            aria-hidden
          >
            <Icon className="size-2.5" strokeWidth={3} />
          </span>
          <div className="flex min-w-0 items-baseline gap-1.5">
            <Toast.Title className="m-0 truncate text-xs font-medium" />
            <Toast.Description className="m-0 truncate text-xs tabular-nums opacity-75" />
          </div>
          <Toast.Action className="ml-1 shrink-0 rounded-full bg-primary-foreground/15 px-2 py-0.5 text-xs font-medium hover:bg-primary-foreground/25" />
        </Toast.Content>
      </Toast.Root>
    );
  });
}

function Toaster({
  position = "top-center",
  offset = 16,
  limit = Number.POSITIVE_INFINITY,
  toastManager: manager = toastManager,
  className,
  children,
  ...props
}: ToasterProps) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");
  const isRight = position.endsWith("right");

  return (
    <Toast.Provider toastManager={manager} limit={limit} {...props}>
      {children}
      <Toast.Portal>
        <Toast.Viewport
          data-position={position}
          className={cn(
            "pointer-events-none fixed z-99 flex w-max max-w-[min(100vw-2rem,20rem)] gap-2 outline-none",
            isTop
              ? "top-(--toast-offset) flex-col"
              : "bottom-(--toast-offset) flex-col-reverse",
            isLeft && "left-(--toast-offset) items-start",
            isRight && "right-(--toast-offset) items-end",
            !isLeft && !isRight && "left-1/2 -translate-x-1/2 items-center",
            className,
          )}
          style={
            {
              "--toast-offset":
                typeof offset === "number" ? `${offset}px` : offset,
            } as CSSProperties
          }
        >
          <ToastList position={position} />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function toast(options: ToastOptions | string) {
  return toastManager.add(
    typeof options === "string"
      ? { title: options, type: "success" }
      : { type: "success", ...options },
  );
}

function add(type: ToastType, defaults?: Partial<ToastOptions>) {
  return (title: ReactNode, options?: Omit<ToastOptions, "title" | "type">) =>
    toastManager.add({ ...defaults, ...options, title, type });
}

Object.assign(toast, {
  add: toastManager.add.bind(toastManager),
  update: toastManager.update.bind(toastManager),
  promise: toastManager.promise.bind(toastManager),
  close: toastManager.close.bind(toastManager),
  success: add("success"),
  error: add("error"),
  info: add("info"),
  warning: add("warning"),
  loading: add("loading", { timeout: 0 }),
});

export { Toaster, toast, toastManager, type ToastPosition, type ToasterProps };

export const createToastManager = Toast.createToastManager;
