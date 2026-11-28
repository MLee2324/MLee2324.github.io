import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist.",
};

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-5xl flex-col justify-center px-4 pt-24 md:px-6">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-6 text-accent2 underline-offset-4 hover:underline">
        Back to the homepage
      </Link>
    </main>
  );
}
