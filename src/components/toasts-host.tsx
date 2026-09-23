"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

import { type ToastPosition, Toasts } from "@/components/ui/pill-toaster";

const DemoPositionContext = createContext<{
  position: ToastPosition;
  setPosition: (position: ToastPosition) => void;
} | null>(null);

/**
 * Demo-site wiring only — not part of the package. Holds the single live
 * <Toasts /> host so the position demo can move it for real. Consumers
 * mount <Toasts position="..." /> directly (see installation docs).
 */
export function ToastsHost({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<ToastPosition>("top-center");
  return (
    <DemoPositionContext.Provider value={{ position, setPosition }}>
      {children}
      <Toasts position={position} />
    </DemoPositionContext.Provider>
  );
}

export function useDemoPosition() {
  const context = useContext(DemoPositionContext);
  if (!context) {
    throw new Error("useDemoPosition must be used within ToastsHost");
  }
  return context;
}
