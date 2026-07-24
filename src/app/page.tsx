"use client";

import Link from "next/link";

import { HeroToastShowcase } from "@/components/hero-toast-showcase";
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
    <main className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden bg-background px-6 py-16">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="hero-enter hero-enter-delay-0 w-full">
          <HeroToastShowcase />
        </div>

        <h1 className="hero-enter hero-enter-delay-1 -mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:-mt-8 sm:text-5xl">
          Pill Toaster
        </h1>

        <p className="hero-enter hero-enter-delay-2 mt-3 max-w-[40ch] text-pretty text-base leading-normal text-muted-foreground">
          Success, error, info, warning, loading, and actions — one pill surface
          that does the job.
        </p>

        <div className="hero-enter hero-enter-delay-3 mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            type="button"
            size="lg"
            onClick={() =>
              toast.success("Event created", {
                description: `${todayDate} at ${todayTime}`,
              })
            }
          >
            Render a toast
          </Button>
          <Link
            href="/docs"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Documentation
          </Link>
        </div>
      </div>
    </main>
  );
}
