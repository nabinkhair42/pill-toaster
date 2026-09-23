"use client";

import { useEffect } from "react";
import { flushSync } from "react-dom";

import { DocsDemo } from "@/components/docs/docs-demo";
import { useDemoPosition } from "@/components/toasts-host";
import { Button } from "@/components/ui/button";
import {
  type ToastPosition,
  toast,
  toastPositions,
} from "@/components/ui/pill-toaster";

const positionLabels: Record<ToastPosition, string> = {
  "top-left": "Top Left",
  "top-center": "Top Center",
  "top-right": "Top Right",
  "bottom-left": "Bottom Left",
  "bottom-center": "Bottom Center",
  "bottom-right": "Bottom Right",
};

export function PositionDemo() {
  const { position, setPosition } = useDemoPosition();

  useEffect(() => () => setPosition("top-center"), [setPosition]);

  return (
    <>
      <p>
        This moves the live host, then fires a toast so you see it land there.
        The equivalent in your app is one line. Active: <code>{position}</code>
      </p>
      <pre>
        <code>{`<Toasts position="${position}" />`}</code>
      </pre>
      <DocsDemo>
        {toastPositions.map((value) => (
          <Button
            key={value}
            variant={value === position ? "default" : "outline"}
            size="sm"
            onClick={() => {
              flushSync(() => setPosition(value));
              toast({
                message: positionLabels[value],
                state: "success",
              });
            }}
          >
            {positionLabels[value]}
          </Button>
        ))}
      </DocsDemo>
    </>
  );
}
