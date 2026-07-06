"use client";
import type { ElementType } from "react";

interface FeatureCardProps {
  icon: ElementType;
  title: string;
  description: string;
  accentColor?: string;
  variant?: "default" | "dark";
}

export function CaseStudyFeatureCard({ icon: Icon, title, description, accentColor, variant = "default" }: FeatureCardProps) {
  if (variant === "dark") {
    const iconBg = accentColor ? `${accentColor}26` : "rgba(139,64,73,0.15)";
    const iconFg = accentColor ? `${accentColor}cc` : "#c4666f";
    return (
      <div className="group p-6 lg:p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-500">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="w-6 h-6" style={{ color: iconFg }} />
        </div>
        <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-3">{title}</h4>
        <p className="text-sm text-white/75 leading-relaxed">{description}</p>
      </div>
    );
  }

  const iconBg = accentColor ? `${accentColor}15` : undefined;
  const iconFg = accentColor || undefined;
  const iconCls = !accentColor ? "bg-accent/10 group-hover:bg-accent/20 text-accent" : "";

  return (
    <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-accent/20 transition-all duration-500 hover:bg-secondary/60">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-500 ${iconCls}`} style={iconBg ? { backgroundColor: iconBg } : undefined}>
        <Icon className="w-5 h-5" style={iconFg ? { color: iconFg } : undefined} />
      </div>
      <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}