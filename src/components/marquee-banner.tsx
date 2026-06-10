"use client";

import { memo } from "react";

/**
 * Infinite scrolling marquee/ticker banner.
 * Placed in the global layout so it appears on every page.
 * Uses memo to prevent unnecessary re-renders during navigation.
 */
function MarqueeBannerInner() {
  const items = [
    "WEB DESIGN",
    "BRAND IDENTITY",
    "UI / UX DESIGN",
    "UX RESEARCH",
    "ART DIRECTION",
    "PRODUCT DESIGN",
    "MOTION DESIGN",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="bg-foreground text-background py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-medium tracking-wider flex items-center gap-8"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export const MarqueeBanner = memo(MarqueeBannerInner);
