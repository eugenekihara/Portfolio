interface ColorSwatchProps {
  color: string;
  name: string;
  hex: string;
}

export function CaseStudyColorSwatch({ color, name, hex }: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
      <div className="w-14 h-14 rounded-xl border border-white/10 flex-shrink-0" style={{ backgroundColor: color }} />
      <div>
        <p className="text-white font-medium text-sm">{name}</p>
        <p className="text-white/50 text-xs font-mono">{hex}</p>
      </div>
    </div>
  );
}