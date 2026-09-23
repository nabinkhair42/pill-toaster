import { CodeBlock } from "@/components/docs/code-block";
import { siteConfig } from "@/lib/site";

const installCommand = `pnpm dlx shadcn@latest add ${siteConfig.url}/r/pill-toaster.json`;

const layoutSnippet = `import { Toasts } from "@/components/ui/pill-toaster"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toasts position="top-center" />
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
        One self-contained file, <code>pill-toaster.tsx</code>. The CLI pulls
        the <code>Button</code> prerequisite automatically (registry
        dependency), plus <code>motion</code> and <code>lucide-react</code> from
        npm. Status colors use your existing theme (<code>destructive</code>{" "}
        plus the default palette), so no extra CSS setup is needed.
      </p>
      <p>
        Mount <code>Toasts</code> once in your root layout:
      </p>
      <CodeBlock code={layoutSnippet} />
    </section>
  );
}
