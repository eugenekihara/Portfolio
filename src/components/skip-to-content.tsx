"use client";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:text-sm focus:font-medium focus:rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-accent"
    >
      Skip to main content
    </a>
  );
}