"use client";
import { ScrollReveal, SplitTextReveal } from "@/components/scroll-animations";

interface SectionHeadingProps {
  label: string;
  title: string;
  light?: boolean;
  /** Accent color for the label on light backgrounds */
  accentColor?: string;
  /** Accent color for the label on dark backgrounds (when light=true). Falls back to accentColor if not provided. */
  lightAccentColor?: string;
}

export function CaseStudySectionHeading({ label, title, light = false, accentColor, lightAccentColor }: SectionHeadingProps) {
  // Use lightAccentColor when on a dark section, otherwise use accentColor
  const activeColor = light ? (lightAccentColor || accentColor) : accentColor;
  const labelStyle = activeColor ? { color: activeColor } : undefined;
  const labelClassName = !activeColor ? "text-accent" : "";

  return (
    <div className="mb-12 lg:mb-16">
      <ScrollReveal>
        <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${labelClassName}`} style={labelStyle}>
          {label}
        </p>
      </ScrollReveal>
      <SplitTextReveal
        text={title}
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight ${light ? "text-white" : "text-foreground"}`}
      />
    </div>
  );
}