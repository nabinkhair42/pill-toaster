# Pill Toaster

An opinionated pill toast for React — one thing well, built on Base UI and themed with shadcn tokens.

## Install

```bash
pnpm dlx shadcn@latest add https://raw.githubusercontent.com/nabinkhair42/pill-toaster/main/public/r/pill-toaster.json
```

Mount `Toaster` in your root layout:

```tsx
import { Toaster } from "@/components/ui/pill-toaster"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
```

## Usage

```tsx
import { toast } from "@/components/ui/pill-toaster"

toast.success("Event created", {
  description: "Sunday, December 3 at 9:00 AM",
})
```

## Develop

```bash
pnpm install
pnpm registry:build
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).
