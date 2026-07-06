import { Code2 } from "lucide-react";

interface TechTagProps {
  name: string;
  accentColor?: string;
}

export function CaseStudyTechTag({ name, accentColor }: TechTagProps) {
  if (accentColor) {
    return (
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor, border: `1px solid ${accentColor}30` }}>
        <Code2 size={14} style={{ color: accentColor }} />
        {name}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/25 text-foreground text-sm font-medium">
      <Code2 size={14} className="text-accent" />
      {name}
    </span>
  );
}