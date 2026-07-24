import { CodeBlock } from "@/components/docs/code-block";
import { siteConfig } from "@/lib/site";

const installCommand = `pnpm dlx shadcn@latest add ${siteConfig.url}/r/pill-toaster.json`;

const layoutSnippet = `import { Toaster } from "@/components/ui/pill-toaster"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}`;

export function InstallationSection() {
  return (
    <section>
      <h2 id="installation">Installation</h2>
      <p>Install with the shadcn CLI:</p>
      <CodeBlock code={installCommand} />
      <p>
        Mount <code>Toaster</code> once in your root layout:
      </p>
      <CodeBlock code={layoutSnippet} />
    </section>
  );
}
