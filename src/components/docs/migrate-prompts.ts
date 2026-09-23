import { siteConfig } from "@/lib/site";

const installCommand = `pnpm dlx shadcn@latest add ${siteConfig.url}/r/pill-toaster.json`;
const docsUrl = `${siteConfig.url}/docs`;
const registryUrl = `${siteConfig.url}/r/pill-toaster.json`;

export const migratePrompts = {
  sonner: `Migrate this codebase from Sonner (https://sonner.emilkowal.ski/) to Pill Toaster (${docsUrl}).

## Goal
Replace every Sonner import, <Toaster />, and toast.* call with Pill Toaster. Keep behavior equivalent where the APIs overlap. Do not leave sonner in package.json or imports.

## Install
Run:
${installCommand}

This installs \`components/ui/pill-toaster.tsx\` (one self-contained shadcn registry item). The CLI installs the \`Button\` prerequisite automatically (registry dependency); \`motion\` and \`lucide-react\` come from npm, plus the project's \`cn\` util.

Remove the \`sonner\` package after the migration compiles.

## Mount
Replace:
\`\`\`tsx
import { Toaster } from "sonner"
<Toaster />
\`\`\`
with:
\`\`\`tsx
import { Toasts } from "@/components/ui/pill-toaster"
<Toasts position="top-center" />
\`\`\`
Mount exactly once in the root layout, toasts fire on a global event bus, so a second host renders every toast twice. Prefer \`position="top-center"\` (Pill default). If the app relied on Sonner's default \`bottom-right\`, keep \`position="bottom-right"\` explicitly.

## Import path
Replace \`from "sonner"\` with \`from "@/components/ui/pill-toaster"\` for \`Toasts\`, \`toast\`, and \`dismissToast\`. There are no typed helpers — status goes in the options object.

## Call-site mapping
| Sonner | Pill Toaster |
| --- | --- |
| \`toast("msg")\` | \`toast("msg")\` (plain, no icon) |
| \`toast.success / .error / .info / .warning\` | \`toast({ message, state: "success" / "error" / "info" / "warning" })\` |
| \`toast.loading\` | \`toast({ message, state: "pending" })\` (sticky until updated) |
| \`description\` option | not supported — fold it into \`message\` |
| \`duration\` | \`lifetime\` (ms) |
| \`toast.dismiss(id?)\` | \`dismissToast(id)\` from the package (\`id\` required) |
| \`toast.promise(p, { loading, success, error })\` | no helper — fire \`pending\`, then update by id (see below) |
| \`id\` | \`id\` (same id upserts in place) |
| action object \`{ label, onClick }\` | \`toast({ message, state, action: { label, run: onClick } })\` |
| \`toast.custom\` / JSX body / headless | not supported — message strings only |
| \`cancel\` button | drop or fold into a single \`action\` |
| \`<Toaster richColors / expand / closeButton / theme / invert />\` | remove — one frosted pill surface; drag a pill to dissolve it |
| \`visibleToasts\` | not supported — the stack piles and fans |
| per-toast \`position\` | not per-toast; set on \`<Toasts />\` |

## Pill API (target)
\`\`\`tsx
import { Toasts, dismissToast, toast } from "@/components/ui/pill-toaster"

toast("Event created")
toast({ message: "Event created", state: "success" })
toast({ message: "Something went wrong", state: "error" })
toast({ message: "Saving…", state: "pending" }) // sticky

const id = "creating-event"
toast({ id, message: "Creating…", state: "pending" })
await createEvent()
toast({ id, message: "Event created", state: "success" })

const undoId = "event-created"
toast({
  id: undoId,
  message: "Event created",
  state: "success",
  action: { label: "Undo", run() { dismissToast(undoId) } },
})
\`\`\`

\`Toasts\` props: \`position\` only.

Docs: ${docsUrl}
Registry: ${registryUrl}

## Constraints
- Do not invent \`toast.success\`, \`toast.custom\`, \`toast.promise\`, \`richColors\`, \`description\`, or \`duration\` — use \`state\`, pending + same-id update, and \`lifetime\`.
- Keep the fixed pill UI (glyph + message + optional action). No custom toast markup.
- Search the repo for \`sonner\`, \`from "sonner"\`, and \`toast.dismiss\` and fix every hit.
- After changes, ensure the app typechecks and a sample toast still fires.`,

  "react-hot-toast": `Migrate this codebase from react-hot-toast (https://react-hot-toast.com/) to Pill Toaster (${docsUrl}).

## Goal
Replace every react-hot-toast import, <Toaster />, and toast.* call with Pill Toaster. Keep behavior equivalent where the APIs overlap. Remove \`react-hot-toast\` from dependencies when done.

## Install
Run:
${installCommand}

This installs \`components/ui/pill-toaster.tsx\` (one self-contained file). The CLI installs the \`Button\` prerequisite automatically; \`motion\` and \`lucide-react\` come from npm, plus \`cn\`.

## Mount
Replace:
\`\`\`tsx
import { Toaster } from "react-hot-toast"
<Toaster position="top-center" />
\`\`\`
with:
\`\`\`tsx
import { Toasts } from "@/components/ui/pill-toaster"
<Toasts position="top-center" />
\`\`\`
Mount exactly once, global bus, a second host duplicates every toast. Drop \`reverseOrder\`, \`gutter\`, \`containerStyle\`, \`containerClassName\`, and \`toastOptions\`. Map global duration via per-toast \`lifetime\` (ms). Map position 1:1 (\`top-left\` | \`top-center\` | \`top-right\` | \`bottom-left\` | \`bottom-center\` | \`bottom-right\`).

## Import path
Replace default/named imports from \`react-hot-toast\` with:
\`\`\`tsx
import { Toasts, dismissToast, toast } from "@/components/ui/pill-toaster"
\`\`\`

## Call-site mapping
| react-hot-toast | Pill Toaster |
| --- | --- |
| \`toast("msg")\` | \`toast("msg")\` (plain, no icon) |
| \`toast.success / .error / .loading\` | \`toast({ message, state: "success" / "error" / "pending" })\`; also \`info\` / \`warning\` where fitting |
| \`duration\` | \`lifetime\` |
| \`toast.dismiss(id?)\` | \`dismissToast(id)\` (\`id\` required) |
| \`toast.promise(p, { loading, success, error })\` | no helper — fire \`pending\`, then update by id |
| \`id\` to update/replace | \`id\` on options (same id upserts in place) |
| \`toast.custom(<JSX />)\` / render function | not supported — message strings only |
| inline \`style\` / \`className\` / \`icon\` / emoji-as-API | drop; Pill owns the pill chrome and status glyphs |
| \`useToaster\` / headless | not applicable — use the provided \`Toasts\` + \`toast\` helper |

## Pill API (target)
\`\`\`tsx
import { Toasts, toast } from "@/components/ui/pill-toaster"

toast({ message: "Successfully toasted!", state: "success" })
toast({ message: "This didn't work.", state: "error" })
toast({ message: "Waiting…", state: "pending" })

const id = "saving"
toast({ id, message: "Saving…", state: "pending" })
await save()
toast({ id, message: "Saved", state: "success" })
\`\`\`

\`Toasts\` props: \`position\` only.

Docs: ${docsUrl}
Registry: ${registryUrl}

## Constraints
- Never keep \`duration\` — rename to \`lifetime\`.
- Never keep JSX toast bodies from \`toast.custom\` — rewrite to message + \`state\`.
- Grep for \`react-hot-toast\`, \`toast.dismiss\`, and \`toast.custom\` and fix every hit.
- Typecheck and verify a success + pending-update toast still work.`,

  "shadcn-toast": `Migrate this codebase from the default shadcn/ui Toast (https://ui.shadcn.com/docs/components/toast) to Pill Toaster (${docsUrl}).

## Goal
Swap the installed rectangular shadcn toast for Pill Toaster's pill UI and event-bus API. This is a full API change (not just a re-skin): remove the old provider, viewport, and \`useToast\` plumbing; fire toasts via the \`toast\` helper instead.

## Install
Run:
${installCommand}

This adds \`components/ui/pill-toaster.tsx\` (one self-contained file). It depends on \`motion\` and \`lucide-react\` (plus \`cn\` and the auto-installed \`Button\` prerequisite).

## Mount
Replace the old provider/viewport setup (often in \`providers.tsx\` or the root layout):
\`\`\`tsx
import { Toasts } from "@/components/ui/pill-toaster"
<Toasts position="top-center" />
\`\`\`
Remove the old \`<Toaster />\` / \`<ToastProvider>\` / \`<ToastViewport>\` mounts, and mount Pill's \`<Toasts />\` exactly once in the root layout (global bus, no dual hosts).

## Import path
Replace every \`from "@/components/ui/toast"\` (and any re-exports, including \`useToast\`) with \`from "@/components/ui/pill-toaster"\`.

After the app compiles, remove the old toast component files from \`components/ui/\` if nothing else imports them. Do not delete shared utils.

## Call-site mapping
| shadcn/ui Toast | Pill Toaster |
| --- | --- |
| \`const { toast } = useToast(); toast({ title, description })\` | \`import { toast } ...; toast({ message: title })\` (no hook, no description — fold into message) |
| \`toast({ title })\` variants | \`toast({ message, state: "success" \\| "info" \\| "warning" \\| "error" \\| "pending" })\` |
| \`action\` element prop | \`action: { label, run }\` |
| \`duration\` | \`lifetime\` (ms) |
| \`toast.dismiss\` from the hook | \`dismissToast(id)\` from the package (\`id\` required) |
| open/controlled (\`open\`, \`onOpenChange\`) | not supported — fire-and-forget + auto-dismiss |
| custom JSX title/description | strings only — glyph + message + optional action |

\`\`\`tsx
toast("Event created") // plain
toast({ message: "Event created", state: "success" })
toast({ message: "Event has not been created", state: "error" })
toast({ message: "Be there 10 minutes early", state: "info" })
toast({ message: "Start time cannot be earlier than 8am", state: "warning" })
toast({ message: "Creating…", state: "pending" })
\`\`\`

Actions stay on one call:
\`\`\`tsx
const id = "event-created"
toast({
  id,
  message: "Event created",
  state: "success",
  action: {
    label: "Undo",
    run() {
      dismissToast(id)
    },
  },
})
\`\`\`

## Toasts props
Pill takes \`position\` only. Stacks pile and fan; drag a pill to dissolve it.

Docs: ${docsUrl}
Registry: ${registryUrl}

## Constraints
- Visual redesign is intentional: do not re-skin the pill back into a rectangular shadcn toast.
- Do not add \`toast.success\` or rich colored variants — state only changes the glyph.
- Grep for \`@/components/ui/toast\`, \`useToast\`, and leftover shadcn toast files; leave no dual Toaster mounted.
- Typecheck and click through success / error / pending-update / action demos.`,
} as const satisfies Record<string, string>;

export type MigratePromptId = keyof typeof migratePrompts;
