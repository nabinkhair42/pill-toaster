"use client";

import { useState } from "react";

import { DocsDemo } from "@/components/docs/docs-demo";
import { Button } from "@/components/ui/button";
import { dismissToast, toast } from "@/components/ui/pill-toaster";

type ToastDemoKind =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "action"
  | "pending";

const toastDemos: {
  kind: ToastDemoKind;
  label: string;
  code: string;
  run: () => void;
}[] = [
  {
    kind: "default",
    label: "Default",
    code: `toast("Event has been created")`,
    run: () => toast("Event has been created"),
  },
  {
    kind: "success",
    label: "Success",
    code: `toast({ message: "Event has been created", state: "success" })`,
    run: () => toast({ message: "Event has been created", state: "success" }),
  },
  {
    kind: "info",
    label: "Info",
    code: `toast({
  message: "Be at the area 10 minutes before the event time",
  state: "info",
})`,
    run: () =>
      toast({
        message: "Be at the area 10 minutes before the event time",
        state: "info",
      }),
  },
  {
    kind: "warning",
    label: "Warning",
    code: `toast({
  message: "Event start time cannot be earlier than 8am",
  state: "warning",
})`,
    run: () =>
      toast({
        message: "Event start time cannot be earlier than 8am",
        state: "warning",
      }),
  },
  {
    kind: "error",
    label: "Error",
    code: `toast({ message: "Event has not been created", state: "error" })`,
    run: () => toast({ message: "Event has not been created", state: "error" }),
  },
  {
    kind: "action",
    label: "Action",
    code: `const id = "event-created"
toast({
  id,
  message: "Event has been created",
  state: "success",
  action: {
    label: "Undo",
    run() {
      dismissToast(id)
    },
  },
})`,
    run: () => {
      const id = `event-${Date.now()}`;
      toast({
        id,
        message: "Event has been created",
        state: "success",
        action: {
          label: "Undo",
          run() {
            dismissToast(id);
            toast({ message: "Undone", state: "info" });
          },
        },
      });
    },
  },
  {
    kind: "pending",
    label: "Pending",
    code: `const id = "creating-event"
toast({ id, message: "Creating event…", state: "pending" })
await createEvent()
toast({ id, message: "Event created", state: "success" })`,
    run: () => {
      const id = `creating-${Date.now()}`;
      toast({ id, message: "Creating event…", state: "pending" });
      window.setTimeout(() => {
        if (Math.random() > 0.35) {
          toast({ id, message: "Event created", state: "success" });
        } else {
          toast({ id, message: "Could not create", state: "error" });
        }
      }, 1400);
    },
  },
];

export function TypesDemo() {
  const [active, setActive] = useState<ToastDemoKind>("action");
  const demo = toastDemos.find((item) => item.kind === active) ?? toastDemos[0];

  return (
    <>
      <DocsDemo>
        {toastDemos.map((item) => (
          <Button
            key={item.kind}
            variant={item.kind === active ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setActive(item.kind);
              item.run();
            }}
          >
            {item.label}
          </Button>
        ))}
      </DocsDemo>
      <pre>
        <code>{demo.code}</code>
      </pre>
    </>
  );
}
