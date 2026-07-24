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

const positions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
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
        {positions.map((value) => (
          <Button
            key={value}
            variant={value === position ? "default" : "outline"}
            size="sm"
            onClick={() => {
              flushSync(() => setPosition(value));
              manager.add({
                title: value,
                type: "success",
              });
            }}
          >
            {value}
          </Button>
        ))}
      </DocsDemo>
    </>
  );
}
