export function UsageSection() {
  return (
    <section>
      <h2 id="usage">Usage</h2>
      <p>
        Import the helper and fire a toast. Strings default to{" "}
        <code>success</code>. Prefer the typed helpers when you want an explicit
        status.
      </p>
      <pre>
        <code>{`import { toast } from "@/components/ui/pill-toaster"

toast("Copied")
toast.success("Event created", {
  description: "Sunday, December 3 at 9:00 AM",
})
toast.error("Something went wrong")`}</code>
      </pre>
    </section>
  );
}
