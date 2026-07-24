export function ApiSection() {
  return (
    <section>
      <h2 id="api">API</h2>
      <p>
        <code>Toaster</code> accepts Base UI provider options plus placement
        helpers:
      </p>
      <ul>
        <li>
          <code>position</code> — where the stack appears (default{" "}
          <code>top-center</code>)
        </li>
        <li>
          <code>offset</code> — inset from the edge in px or CSS length
        </li>
        <li>
          <code>timeout</code> — default auto-dismiss duration in ms (
          <code>0</code> disables). Each toast lives until this fires (or
          swipe/close), so the stack grows and shrinks naturally
        </li>
        <li>
          <code>limit</code> — optional cap on concurrently visible toasts
          (default unlimited). When set, older ones get{" "}
          <code>data-limited</code> and collapse out
        </li>
      </ul>
      <p>
        The <code>toast</code> helper exposes <code>add</code>,{" "}
        <code>update</code>, <code>close</code>, <code>promise</code>, and the
        typed shortcuts above. See the{" "}
        <a href="https://base-ui.com/react/components/toast">
          Base UI Toast docs
        </a>{" "}
        for stacking, swipe dismissal, and the primitive API.
      </p>
    </section>
  );
}
