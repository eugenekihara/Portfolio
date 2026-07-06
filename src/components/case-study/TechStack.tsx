"use client";
import { StaggerReveal } from "@/components/scroll-animations";
import { CaseStudyTechTag } from "./TechTag";

interface TechStackProps {
  tags: string[];
  accentColor?: string;
}

export function CaseStudyTechStack({ tags, accentColor }: TechStackProps) {
  return (
    <StaggerReveal stagger={0.05} className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <CaseStudyTechTag key={tag} name={tag} accentColor={accentColor} />
      ))}
    </StaggerReveal>
  );
}