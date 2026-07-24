"use client";

import { useState } from "react";

import { DocsDemo } from "@/components/docs/docs-demo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/pill-toaster";

type ToastDemoKind =
  | "default"
  | "description"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "action"
  | "promise";

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
    kind: "description",
    label: "Description",
    code: `toast.success("Event has been created", {
  description: "Monday, January 3rd at 6:00pm",
})`,
    run: () =>
      toast.success("Event has been created", {
        description: "Monday, January 3rd at 6:00pm",
      }),
  },
  {
    kind: "success",
    label: "Success",
    code: `toast.success("Event has been created")`,
    run: () => toast.success("Event has been created"),
  },
  {
    kind: "info",
    label: "Info",
    code: `toast.info("Be at the area 10 minutes before the event time")`,
    run: () => toast.info("Be at the area 10 minutes before the event time"),
  },
  {
    kind: "warning",
    label: "Warning",
    code: `toast.warning("Event start time cannot be earlier than 8am")`,
    run: () => toast.warning("Event start time cannot be earlier than 8am"),
  },
  {
    kind: "error",
    label: "Error",
    code: `toast.error("Event has not been created")`,
    run: () => toast.error("Event has not been created"),
  },
  {
    kind: "action",
    label: "Action",
    code: `const id = toast.add({
  title: "Event has been created",
  actionProps: {
    children: "Undo",
    onClick() {
      toast.close(id)
    },
  },
})`,
    run: () => {
      const id = toast.add({
        title: "Event has been created",
        type: "success",
        actionProps: {
          children: "Undo",
          onClick() {
            toast.close(id);
            toast.info("Undone");
          },
        },
      });
    },
  },
  {
    kind: "promise",
    label: "Promise",
    code: `toast.promise(createEvent(), {
  loading: "Creating event…",
  success: (data) => \`\${data.name} created\`,
  error: "Could not create",
})`,
    run: () => {
      toast.promise(
        new Promise<{ name: string }>((resolve, reject) => {
          window.setTimeout(() => {
            if (Math.random() > 0.35) {
              resolve({ name: "Event" });
            } else {
              reject(new Error("Network error"));
            }
          }, 1400);
        }),
        {
          loading: "Creating event…",
          success: (data) => `${data.name} created`,
          error: (err) =>
            err instanceof Error ? err.message : "Could not create",
        },
      );
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
            className="transition-transform active:scale-[0.96]"
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
