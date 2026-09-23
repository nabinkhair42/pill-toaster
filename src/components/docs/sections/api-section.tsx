export function ApiSection() {
  return (
    <section>
      <h2 id="api">API</h2>
      <p>
        <code>Toasts</code> is the host. Mount it once, it listens on a global
        event bus, so a second host would render every toast twice. It takes a
        single prop:
      </p>
      <ul>
        <li>
          <code>position</code> — where the stack appears (default{" "}
          <code>top-center</code>)
        </li>
      </ul>
      <p>
        Fire with <code>toast("message")</code> or{" "}
        <code>
          toast({"{"} message, state, action, lifetime {"}"})
        </code>
        :
      </p>
      <ul>
        <li>
          <code>state</code> — <code>pending</code> (sticky),{" "}
          <code>success</code>, <code>error</code>, <code>warning</code>,{" "}
          <code>info</code>. No state renders no icon.
        </li>
        <li>
          <code>lifetime</code> — ms until auto-dismiss. Plain toasts live 2.4s,
          actions 6s.
        </li>
        <li>
          <code>action</code> —{" "}
          <code>
            {"{"} label, run {"}"}
          </code>
          . The toast dismisses after <code>run</code> unless it re-issues the
          same id.
        </li>
        <li>
          <code>id</code> — reuse to update a toast in place instead of adding a
          new one.
        </li>
        <li>
          <code>dismissToast(id)</code> — dismiss one toast programmatically.
        </li>
      </ul>
      <p>
        Multiple toasts collapse into a peeking pile and fan out when hovered,
        focused, or pressed (which also pauses timers). Drag a pill past the
        threshold and it dissolves into smoke. Pure helpers{" "}
        <code>upsertToast</code>, <code>dismissDelay</code>, <code>tick</code>,{" "}
        <code>pileSlot</code>, and <code>fanSlot</code> are exported for
        testing.
      </p>
    </section>
  );
}
