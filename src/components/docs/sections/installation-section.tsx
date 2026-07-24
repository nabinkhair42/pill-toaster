import { siteConfig } from "@/lib/site";

export function InstallationSection() {
  return (
    <section>
      <h2 id="installation">Installation</h2>
      <p>Install with the shadcn CLI:</p>
      <pre>
        <code>{`pnpm dlx shadcn@latest add ${siteConfig.url}/r/pill-toaster.json`}</code>
      </pre>
      <p>
        Mount <code>Toaster</code> once in your root layout:
      </p>
      <pre>
        <code>{`import { Toaster } from "@/components/ui/pill-toaster"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}`}</code>
      </pre>
    </section>
  );
}
