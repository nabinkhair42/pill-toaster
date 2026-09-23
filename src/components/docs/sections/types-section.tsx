import { TypesDemo } from "@/components/docs/types-demo";

export function TypesSection() {
  return (
    <section>
      <h2 id="types">Types</h2>
      <p>
        Pick a status per toast with the <code>state</code> field. Actions ride
        along in the same object, and <code>pending</code> plus a reused{" "}
        <code>id</code> covers async flows.
      </p>
      <TypesDemo />
    </section>
  );
}
