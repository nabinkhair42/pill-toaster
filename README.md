# Pill Toaster

An opinionated pill toast for React — one thing well. Frosted pill, stacked pile, smoky drag-to-dismiss, animated with Motion.

## Install

```bash
pnpm dlx shadcn@latest add https://toast.nabinkhair.com.np/r/pill-toaster.json
```

The CLI installs the `Button` prerequisite automatically (plus `motion` and `lucide-react` from npm).

Mount `Toasts` once in your root layout (toasts fire on a global bus, a second host renders every toast twice):

```tsx
import { Toasts } from "@/components/ui/pill-toaster"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toasts position="top-center" />
      </body>
    </html>
  )
}
```

## Usage

```tsx
import { toast } from "@/components/ui/pill-toaster"

toast("Copied")
toast({ message: "Event created", state: "success" })
toast({ message: "Something went wrong", state: "error" })
```

Pending work updates in place by reusing the `id`:

```tsx
const id = "saving"
toast({ id, message: "Saving…", state: "pending" })
await save()
toast({ id, message: "Saved", state: "success" })
```

## Develop

```bash
pnpm install
pnpm registry:build
pnpm dev
```

Open [https://toast.nabinkhair.com.np](https://toast.nabinkhair.com.np) or run locally at [http://localhost:3000](http://localhost:3000).
