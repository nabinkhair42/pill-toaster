"use client";

import Link from "next/link";

import { HeroToastStack } from "@/components/hero-toast-stack";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/pill-toaster";
import { cn } from "@/lib/utils";

export default function Home() {
  const todayDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const todayTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-background px-6 py-16">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <HeroToastStack />

        <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
          Pill Toaster
        </h1>

        <p className="mt-3 max-w-[32ch] text-pretty text-[17px] leading-relaxed text-muted-foreground">
          An opinionated toast that does one thing well.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            type="button"
            className="select-none transition-transform active:scale-[0.96]"
            onClick={() =>
              toast.success("Event created", {
                description: `${todayDate} at ${todayTime}`,
              })
            }
          >
            Render a toast
          </Button>
          <a
            href="https://github.com/nabinkhair42/pill-toaster"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "select-none transition-transform active:scale-[0.96]",
            )}
          >
            GitHub
          </a>
        </div>

        <Link
          href="/docs"
          className="mt-3 text-sm text-muted-foreground underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:text-foreground hover:decoration-foreground/30"
        >
          Documentation
        </Link>
      </div>
    </main>
  );
}
