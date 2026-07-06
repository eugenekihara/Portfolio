"use client";
import type { ElementType } from "react";

interface FlowStepProps {
  number: number;
  icon: ElementType;
  title: string;
  description: string;
  accentColor?: string;
  stepBgColor?: string;
  stepBorderColor?: string;
}

export function CaseStudyFlowStep({ number, icon: Icon, title, description, accentColor, stepBgColor, stepBorderColor }: FlowStepProps) {
  const circleBg = stepBgColor || "var(--accent)";
  const circleBorder = stepBorderColor || "rgba(139,64,73,0.3)";
  const iconColor = accentColor || "var(--accent)";

  return (
    <div className="flex flex-col items-center text-center relative">
      <div className="relative z-10">
        <div
          className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center border-2 shadow-lg"
          style={{ backgroundColor: circleBg, borderColor: circleBorder }}
        >
          <Icon className="w-7 h-7 lg:w-8 lg:h-8" style={{ color: iconColor }} />
        </div>
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
          {number}
        </span>
      </div>
      <h4 className="mt-5 text-sm lg:text-base font-bold font-[family-name:var(--font-poppins)] text-foreground">{title}</h4>
      <p className="mt-2 text-xs lg:text-sm text-muted-foreground leading-relaxed max-w-[180px]">{description}</p>
    </div>
  );
}