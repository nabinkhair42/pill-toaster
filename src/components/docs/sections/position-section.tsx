import { PositionDemo } from "@/components/docs/position-demo";

export function PositionSection() {
  return (
    <section>
      <h2 id="position">Position</h2>
      <p>
        Control placement with the <code>position</code> prop on{" "}
        <code>Toaster</code>. Swipe direction follows the edge the toast sits
        on. Optional <code>offset</code> sets the inset from that edge.
      </p>
      <pre>
        <code>{`<Toaster position="bottom-right" offset={24} />`}</code>
      </pre>
      <PositionDemo />
    </section>
  );
}
