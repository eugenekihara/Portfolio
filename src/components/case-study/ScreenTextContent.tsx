interface ScreenTextContentProps {
  title: string;
  purpose: string;
  rationale: string;
  accentColor?: string;
}

export function CaseStudyScreenText({ title, purpose, rationale, accentColor }: ScreenTextContentProps) {
  const labelStyle = accentColor ? { color: accentColor } : undefined;
  const labelCls = !accentColor ? "text-accent" : "";

  return (
    <div className="flex flex-col justify-center space-y-4">
      <h4 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground">{title}</h4>
      <div>
        <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${labelCls}`} style={labelStyle}>Purpose</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{purpose}</p>
      </div>
      <div>
        <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${labelCls}`} style={labelStyle}>Design Rationale</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{rationale}</p>
      </div>
    </div>
  );
}