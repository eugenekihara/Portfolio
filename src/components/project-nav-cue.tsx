import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectNavCueProps {
  nextProjectName: string;
  nextProjectHref: string;
}

export function ProjectNavCue({ nextProjectName, nextProjectHref }: ProjectNavCueProps) {
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <Link
          href={nextProjectHref}
          className="group flex items-center justify-between focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-lg"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-1">Next Project</p>
            <p className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground group-hover:text-accent transition-colors">
              {nextProjectName}
            </p>
          </div>
          <ArrowRight size={24} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}