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

This installs \`components/ui/pill-toaster.tsx\` (shadcn registry item). It depends on \`@base-ui/react\`, \`lucide-react\`, and the project's \`cn\` util.

Remove the \`sonner\` package after the migration compiles.

## Mount
Replace:
\`\`\`tsx
import { Toaster } from "sonner"
<Toaster />
\`\`\`
with:
\`\`\`tsx
import { Toaster } from "@/components/ui/pill-toaster"
<Toaster position="top-center" />
\`\`\`
Mount once in the root layout. Prefer \`position="top-center"\` (Pill default). If the app relied on Sonner's default \`bottom-right\`, keep \`position="bottom-right"\` explicitly.

## Import path
Replace \`from "sonner"\` with \`from "@/components/ui/pill-toaster"\` for both \`Toaster\` and \`toast\`.

## Call-site mapping
| Sonner | Pill Toaster |
| --- | --- |
| \`toast("msg")\` | \`toast("msg")\` (Pill defaults to success) |
| \`toast.success / .error / .info / .warning / .loading\` | same names |
| \`description\` option | \`description\` |
| \`duration\` | \`timeout\` (ms; \`0\` = no auto-dismiss) |
| \`toast.dismiss(id?)\` | \`toast.close(id?)\` |
| \`toast.promise(p, { loading, success, error })\` | same shape |
| \`id\` | \`id\` |
| action object \`{ label, onClick }\` | use \`toast.add({ title, type, actionProps: { children: label, onClick } })\` |
| \`toast.custom\` / JSX body / headless | not supported — use title + description + typed helpers only |
| \`cancel\` button | drop or fold into a single \`actionProps\` |
| \`<Toaster richColors / expand / closeButton / theme / invert />\` | remove — Pill is one pill surface; types only change the icon chip |
| \`visibleToasts\` | \`limit\` on \`<Toaster />\` (default unlimited) |
| per-toast \`position\` | not per-toast; set on \`<Toaster />\` |

## Pill API (target)
\`\`\`tsx
import { Toaster, toast } from "@/components/ui/pill-toaster"

toast("Event created")
toast.success("Event created", { description: "Sunday at 9:00 AM" })
toast.error("Something went wrong")
toast.info("Heads up")
toast.warning("Check the time")
toast.loading("Saving…") // timeout: 0

toast.promise(createEvent(), {
  loading: "Creating…",
  success: (data) => \`\${data.name} created\`,
  error: "Could not create",
})

const id = toast.add({
  title: "Event created",
  type: "success",
  actionProps: { children: "Undo", onClick() { toast.close(id) } },
})
\`\`\`

\`Toaster\` props: \`position\`, \`offset\`, \`timeout\`, \`limit\`.

Docs: ${docsUrl}
Registry: ${registryUrl}

## Constraints
- Do not invent \`toast.custom\`, \`richColors\`, or \`duration\` — use \`timeout\`.
- Keep the fixed pill UI (icon + title + description + optional action). No custom toast markup.
- Search the repo for \`sonner\`, \`from "sonner"\`, and \`toast.dismiss\` and fix every hit.
- After changes, ensure the app typechecks and a sample toast still fires.`,

  "react-hot-toast": `Migrate this codebase from react-hot-toast (https://react-hot-toast.com/) to Pill Toaster (${docsUrl}).

## Goal
Replace every react-hot-toast import, <Toaster />, and toast.* call with Pill Toaster. Keep behavior equivalent where the APIs overlap. Remove \`react-hot-toast\` from dependencies when done.

## Install
Run:
${installCommand}

This installs \`components/ui/pill-toaster.tsx\` (shadcn registry). Depends on \`@base-ui/react\`, \`lucide-react\`, and \`cn\`.

## Mount
Replace:
\`\`\`tsx
import { Toaster } from "react-hot-toast"
<Toaster position="top-center" />
\`\`\`
with:
\`\`\`tsx
import { Toaster } from "@/components/ui/pill-toaster"
<Toaster position="top-center" />
\`\`\`
Drop \`reverseOrder\`, \`gutter\`, \`containerStyle\`, \`containerClassName\`, and \`toastOptions\`. Map global duration via \`timeout\` on \`<Toaster />\` (ms). Map position 1:1 (\`top-left\` | \`top-center\` | \`top-right\` | \`bottom-left\` | \`bottom-center\` | \`bottom-right\`).

## Import path
Replace default/named imports from \`react-hot-toast\` with:
\`\`\`tsx
import { Toaster, toast } from "@/components/ui/pill-toaster"
\`\`\`

## Call-site mapping
| react-hot-toast | Pill Toaster |
| --- | --- |
| \`toast("msg")\` | \`toast("msg")\` (success by default) |
| \`toast.success / .error / .loading\` | same; also use \`toast.info\` / \`toast.warning\` where fitting |
| \`duration\` | \`timeout\` |
| \`toast.dismiss(id?)\` | \`toast.close(id?)\` |
| \`toast.promise(p, { loading, success, error })\` | same shape |
| \`id\` to update/replace | \`id\` on options / \`toast.update\` |
| \`toast.custom(<JSX />)\` / render function | not supported — title + description strings/nodes only |
| inline \`style\` / \`className\` / \`icon\` / emoji-as-API | drop; Pill owns the pill chrome and status icons |
| \`useToaster\` / headless | not applicable — use the provided \`Toaster\` + \`toast\` helper |
| \`toastOptions\` on \`<Toaster />\` | use \`timeout\` / \`limit\` / \`offset\` props instead |

## Pill API (target)
\`\`\`tsx
import { Toaster, toast } from "@/components/ui/pill-toaster"

toast.success("Successfully toasted!")
toast.error("This didn't work.")
toast.loading("Waiting…")

toast.promise(save(), {
  loading: "Saving…",
  success: "Saved",
  error: "Could not save",
})

toast.close() // dismiss all / active — prefer id when you have one
\`\`\`

\`Toaster\` props: \`position\`, \`offset\`, \`timeout\`, \`limit\`.

Docs: ${docsUrl}
Registry: ${registryUrl}

## Constraints
- Never keep \`duration\` — rename to \`timeout\`.
- Never keep JSX toast bodies from \`toast.custom\` — rewrite to \`toast.success/error/...\` with title/description.
- Grep for \`react-hot-toast\`, \`toast.dismiss\`, and \`toast.custom\` and fix every hit.
- Typecheck and verify a success + promise toast still work.`,

  "shadcn-toast": `Migrate this codebase from the default shadcn/ui Base Toast (https://ui.shadcn.com/docs/components/base/toast) to Pill Toaster (${docsUrl}).

## Goal
Swap the installed \`@/components/ui/toast\` (or equivalent shadcn toast) for Pill Toaster's pill UI and helper API. Both are Base UI Toast–based, so most \`toast.add\` / \`toast.promise\` / \`toast.close\` calls already match — focus on imports, layout mount, and adopting typed helpers where useful.

## Install
Run:
${installCommand}

This adds \`components/ui/pill-toaster.tsx\`. Keep \`@base-ui/react\` (already required by shadcn toast).

## Mount
Replace:
\`\`\`tsx
import { Toaster } from "@/components/ui/toast"
<Toaster />
\`\`\`
with:
\`\`\`tsx
import { Toaster } from "@/components/ui/pill-toaster"
<Toaster position="top-center" />
\`\`\`

## Import path
Replace every \`from "@/components/ui/toast"\` (and any re-exports) with \`from "@/components/ui/pill-toaster"\`.

After the app compiles, remove the old \`toast\` component files from \`components/ui/\` if nothing else imports them (often \`toast.tsx\` / related). Do not delete shared utils.

## Call-site mapping
| shadcn/ui Toast | Pill Toaster |
| --- | --- |
| \`toast.add({ title, description, type })\` | same, or prefer \`toast.success(title, { description })\` etc. |
| \`type: "success" \\| "info" \\| "warning" \\| "error" \\| "loading"\` | same |
| \`actionProps\` | same |
| \`toast.promise\` | same |
| \`toast.close\` / \`toast.update\` | same |
| default card-like toast chrome | fixed pill: icon chip + title + description + optional action |
| \`duration\` if present | \`timeout\` |

Prefer the Sonner-style helpers Pill ships:
\`\`\`tsx
toast("Event created") // success
toast.success("Event created", { description: "Sunday, December 3 at 9:00 AM" })
toast.error("Event has not been created")
toast.info("Be there 10 minutes early")
toast.warning("Start time cannot be earlier than 8am")
toast.loading("Creating…")
\`\`\`

Actions stay on \`toast.add\`:
\`\`\`tsx
const id = toast.add({
  title: "Event created",
  type: "success",
  actionProps: {
    children: "Undo",
    onClick() {
      toast.close(id)
    },
  },
})
\`\`\`

## Toaster props
Pill adds \`position\`, \`offset\`, \`timeout\`, and \`limit\` (default unlimited, Sonner-like stacking). Pass through any Base UI provider options you already used when they still apply.

Docs: ${docsUrl}
Registry: ${registryUrl}

## Constraints
- Visual redesign is intentional: do not re-skin the pill back into a rectangular shadcn toast.
- Do not add \`toast.custom\` or rich colored variants — types only change the icon.
- Grep for \`@/components/ui/toast\` and leftover shadcn toast files; leave no dual Toaster mounted.
- Typecheck and click through success / error / promise / action demos.`,
} as const satisfies Record<string, string>;

export type MigratePromptId = keyof typeof migratePrompts;
