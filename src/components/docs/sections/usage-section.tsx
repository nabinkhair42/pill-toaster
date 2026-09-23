export function UsageSection() {
  return (
    <section>
      <h2 id="usage">Usage</h2>
      <p>
        Import the helper and fire a toast. A plain string renders without an
        icon; pass an object for a status, action, or custom lifetime.
      </p>
      <pre>
        <code>{`import { toast } from "@/components/ui/pill-toaster"

toast("Copied")
toast({ message: "Event created", state: "success" })
toast({ message: "Something went wrong", state: "error" })`}</code>
      </pre>
      <p>
        Reuse an <code>id</code> to update a toast in place, how{" "}
        <code>pending</code> becomes <code>success</code> once work finishes:
      </p>
      <pre>
        <code>{`const id = "creating-event"
toast({ id, message: "Saving…", state: "pending" })
await save()
toast({ id, message: "Saved", state: "success" })`}</code>
      </pre>
    </section>
  );
}
