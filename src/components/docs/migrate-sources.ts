import type { MigratePromptId } from "@/components/docs/migrate-prompts";

export type MigrateSource = {
  id: MigratePromptId;
  name: string;
  href: string;
  summary: string;
};

export const migrateSources: MigrateSource[] = [
  {
    id: "sonner",
    name: "Sonner",
    href: "https://sonner.emilkowal.ski/",
    summary: "sonner by Emil Kowalski",
  },
  {
    id: "react-hot-toast",
    name: "react-hot-toast",
    href: "https://react-hot-toast.com/",
    summary: "react-hot-toast by Timo Lins",
  },
  {
    id: "shadcn-toast",
    name: "shadcn/ui Toast",
    href: "https://ui.shadcn.com/docs/components/base/toast",
    summary: "Toaster built on top of @base-ui/react by shadcn",
  },
];
