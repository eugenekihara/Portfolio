"use client";

import { ChevronDown } from "lucide-react";

export function ScrollHint() {
  return (
    <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce" aria-hidden="true">
      <span className="text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
      <ChevronDown size={20} />
    </div>
  );
}