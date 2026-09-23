import { PositionDemo } from "@/components/docs/position-demo";

export function PositionSection() {
  return (
    <section>
      <h2 id="position">Position</h2>
      <p>
        Control placement with the <code>position</code> prop on{" "}
        <code>Toasts</code>. Drag a pill in any direction to dissolve it.
      </p>
      <pre>
        <code>{`<Toasts position="bottom-right" />`}</code>
      </pre>
      <PositionDemo />
    </section>
  );
}
