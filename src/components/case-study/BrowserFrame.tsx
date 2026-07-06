export function BrowserFrame({ src, alt, className = "", url = "eugenekihara.dev" }: { src: string; alt: string; className?: string; url?: string }) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ maxWidth: "900px" }}>
      <div className="relative rounded-xl overflow-hidden border border-neutral-700 shadow-2xl bg-neutral-900">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 border-b border-neutral-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-neutral-700 rounded-md px-3 py-1 text-xs text-neutral-400 font-mono text-center">{url}</div>
          </div>
        </div>
        <img src={src} alt={alt} className="w-full h-auto object-cover" />
      </div>
    </div>
  );
}