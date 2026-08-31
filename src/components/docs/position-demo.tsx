"use client";

import { useMemo, useState } from "react";
import { flushSync } from "react-dom";

import { DocsDemo } from "@/components/docs/docs-demo";
import { Button } from "@/components/ui/button";
import {
  createToastManager,
  Toaster,
  type ToastPosition,
} from "@/components/ui/pill-toaster";

const positions: { value: ToastPosition; label: string }[] = [
  { value: "top-left", label: "Top Left" },
  { value: "top-center", label: "Top Center" },
  { value: "top-right", label: "Top Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-right", label: "Bottom Right" },
];

export function PositionDemo() {
  const [position, setPosition] = useState<ToastPosition>("top-center");
  const manager = useMemo(() => createToastManager(), []);

  return (
    <>
      <Toaster position={position} toastManager={manager} />
      <p>
        Click a position to move the demo toaster and render a toast there.
        Active: <code>{position}</code>
      </p>
      <DocsDemo>
        {positions.map(({ value, label }) => (
          <Button
            key={value}
            variant={value === position ? "default" : "outline"}
            size="sm"
            onClick={() => {
              flushSync(() => setPosition(value));
              manager.add({
                title: label,
                type: "success",
              });
            }}
          >
            {label}
          </Button>
        ))}
      </DocsDemo>
    </>
  );
}
