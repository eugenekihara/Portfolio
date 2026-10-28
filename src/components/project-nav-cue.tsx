"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import {
  PROJECT_SEQUENCE,
  PROJECT_DISPLAY_NAMES,
  type ProjectLink,
} from "@/lib/project-sequence";

interface ProjectNavCueProps {
  /** Slug of the case study this nav is rendered on. */
  currentSlug: string;
}

/**
 * Previous / Next project navigation shown at the end of every case study.
 * Follows the same order as the Projects section on the home page.
 * The first project has no "Previous" and the last has no "Next"; those slots
 * link back to all projects instead.
 */
export function ProjectNavCue({ currentSlug }: ProjectNavCueProps) {
  const [sequence, setSequence] = useState<ProjectLink[]>(PROJECT_SEQUENCE);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("bad response"))))
      .then((data) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        setSequence(
          data.map((p: { slug: string; title: string }) => ({
            slug: p.slug,
            title: PROJECT_DISPLAY_NAMES[p.slug] ?? p.title,
          }))
        );
      })
      .catch(() => {
        /* keep the fallback order */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const index = sequence.findIndex((p) => p.slug === currentSlug);
  const prev = index > 0 ? sequence[index - 1] : null;
  const next = index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : null;

  const itemClass =
    "group flex items-center gap-4 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
  const labelClass = "text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-1";
  const titleClass =
    "text-xl lg:text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground group-hover:text-accent transition-colors";
  const iconClass =
    "shrink-0 text-muted-foreground group-hover:text-accent transition-all";

  return (
    <nav aria-label="Project navigation" className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-14 grid gap-8 sm:grid-cols-2">
        {/* Previous */}
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className={itemClass}>
            <ArrowLeft size={24} className={`${iconClass} group-hover:-translate-x-1`} aria-hidden="true" />
            <div>
              <p className={labelClass}>Previous Project</p>
              <p className={titleClass}>{prev.title}</p>
            </div>
          </Link>
        ) : (
          <Link href="/#projects" className={itemClass}>
            <LayoutGrid size={22} className={iconClass} aria-hidden="true" />
            <div>
              <p className={labelClass}>First Project</p>
              <p className={titleClass}>All Projects</p>
            </div>
          </Link>
        )}

        {/* Next */}
        {next ? (
          <Link href={`/projects/${next.slug}`} className={`${itemClass} sm:flex-row-reverse sm:text-right`}>
            <ArrowRight size={24} className={`${iconClass} group-hover:translate-x-1`} aria-hidden="true" />
            <div>
              <p className={labelClass}>Next Project</p>
              <p className={titleClass}>{next.title}</p>
            </div>
          </Link>
        ) : (
          <Link href="/#projects" className={`${itemClass} sm:flex-row-reverse sm:text-right`}>
            <LayoutGrid size={22} className={iconClass} aria-hidden="true" />
            <div>
              <p className={labelClass}>Last Project</p>
              <p className={titleClass}>All Projects</p>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
