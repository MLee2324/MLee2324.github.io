"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Download, ArrowLeft, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { config } from "@/data/config";
import { cn } from "@/lib/utils";

export type DocKind = "resume" | "cv";

const DOCS: Record<DocKind, { label: string; href: string; path: string | null }> = {
  resume: { label: "Résumé", href: "/resume/", path: config.resume },
  cv: { label: "CV", href: "/cv/", path: config.cv },
};

export default function ResumeView({ doc }: { doc: DocKind }) {
  const current = DOCS[doc];
  const available = (Object.keys(DOCS) as DocKind[]).filter((kind) => DOCS[kind].path);

  if (!current.path) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center font-sans">
        <p className="text-lg text-muted-foreground">My {current.label.toLowerCase()} will be posted here soon.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <div className="mx-auto w-full max-w-4xl shrink-0 px-4 pt-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex flex-wrap items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>

          {available.length > 1 && (
            <nav aria-label="Documents" className="flex rounded-full border border-border p-1 text-sm">
              {available.map((kind) => (
                <Link
                  key={kind}
                  href={DOCS[kind].href}
                  aria-current={kind === doc ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-1.5 transition-colors",
                    kind === doc
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {DOCS[kind].label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex gap-2">
            <a
              href={current.path}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "flex gap-2 text-sm")}
            >
              <ExternalLink className="h-4 w-4" />
              Open
            </a>
            <a href={current.path} download className={cn(buttonVariants(), "flex gap-2 text-sm")}>
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-1 justify-center px-2 pb-6 md:px-4 md:pb-24">
        <motion.div
          key={doc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="aspect-[210/297] w-full overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <iframe
            src={`${current.path}#toolbar=0&navpanes=0&view=FitH`}
            title={`${config.author} — ${current.label}`}
            className="h-full w-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
