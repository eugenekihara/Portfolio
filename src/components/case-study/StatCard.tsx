"use client";
import type { ElementType } from "react";

interface StatCardProps {
  icon: ElementType;
  value: string;
  label: string;
  light?: boolean;
  accentColor?: string;
}

export function CaseStudyStatCard({ icon: Icon, value, label, light = false, accentColor }: StatCardProps) {
  const iconStyle = accentColor ? { color: accentColor } : undefined;
  const iconClassName = !accentColor ? (light ? "text-white/80" : "text-accent") : "";

  return (
    <div className={`p-6 lg:p-8 rounded-2xl ${light ? "bg-white/10 border border-white/10" : "bg-secondary/50 border border-foreground/5"}`}>
      <Icon className={`w-6 h-6 mb-4 ${iconClassName}`} style={iconStyle} />
      <p className={`text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-2 ${light ? "text-white" : "text-foreground"}`}>
        {value}
      </p>
      <p className={`text-sm leading-relaxed ${light ? "text-white/60" : "text-muted-foreground"}`}>
        {label}
      </p>
    </div>
  );
}