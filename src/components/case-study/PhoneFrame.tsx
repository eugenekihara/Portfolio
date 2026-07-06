export function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ maxWidth: "320px" }}>
      <div className="relative rounded-[2.5rem] overflow-hidden border-[6px] border-gray-800 bg-gray-800 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-800 rounded-b-2xl z-10" />
        <img src={src} alt={alt} className="w-full h-auto object-cover rounded-[2rem]" />
      </div>
    </div>
  );
}