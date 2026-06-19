"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Palette,
  Monitor,
  Layers,
  Zap,
  Globe,
  Github,
  MousePointer2,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  BarChart3,
  Paintbrush,
  Layout,
  Database,
} from "lucide-react";
import Link from "next/link";
import {
  ScrollReveal,
  ScrollRevealLeft,
  ScrollRevealRight,
  Parallax,
  SplitTextReveal,
  StaggerReveal,
  DrawLine,
  ClipReveal,
  MagneticHover,
} from "@/components/scroll-animations";

/* ─── Theme Constants ─── */
const DARK = "#0a0a0a";
const ACCENT = "#8b4049";
const ACCENT_LIGHT = "#a85a63";

/* ─── Browser Frame Wrapper ─── */
function BrowserFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
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
            <div className="bg-neutral-700 rounded-md px-3 py-1 text-xs text-neutral-400 font-mono text-center">
              eugenekihara.dev
            </div>
          </div>
        </div>
        <img src={src} alt={alt} className="w-full h-auto object-cover" />
      </div>
    </div>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({
  label,
  title,
  light = false,
}: {
  label: string;
  title: string;
  light?: boolean;
}) {
  return (
    <div className="mb-12 lg:mb-16">
      <ScrollReveal>
        <p
          className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
          style={{ color: ACCENT }}
        >
          {label}
        </p>
      </ScrollReveal>
      <SplitTextReveal
        text={title}
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight ${
          light ? "text-white" : "text-foreground"
        }`}
      />
    </div>
  );
}

/* ─── Stat Card ─── */
function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="p-6 lg:p-8 rounded-2xl bg-secondary/50 border border-foreground/5">
      <Icon className="w-6 h-6 mb-4" style={{ color: ACCENT }} />
      <p className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-2 text-foreground">
        {value}
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">{label}</p>
    </div>
  );
}

/* ─── Screen Text Content ─── */
function ScreenTextContent({
  title,
  purpose,
  rationale,
}: {
  title: string;
  purpose: string;
  rationale: string;
}) {
  return (
    <div className="flex flex-col justify-center space-y-4">
      <h4 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
        {title}
      </h4>
      <div>
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>
          Purpose
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">{purpose}</p>
      </div>
      <div>
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>
          Design Rationale
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">{rationale}</p>
      </div>
    </div>
  );
}

/* ─── Screen Showcase ─── */
function ScreenShowcase({
  src,
  alt,
  title,
  purpose,
  rationale,
  reversed = false,
}: {
  src: string;
  alt: string;
  title: string;
  purpose: string;
  rationale: string;
  reversed?: boolean;
}) {
  if (reversed) {
    return (
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ScrollRevealRight>
          <ScreenTextContent title={title} purpose={purpose} rationale={rationale} />
        </ScrollRevealRight>
        <ScrollRevealLeft>
          <BrowserFrame src={src} alt={alt} />
        </ScrollRevealLeft>
      </div>
    );
  }
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <ScrollRevealLeft>
        <BrowserFrame src={src} alt={alt} />
      </ScrollRevealLeft>
      <ScrollRevealRight>
        <ScreenTextContent title={title} purpose={purpose} rationale={rationale} />
      </ScrollRevealRight>
    </div>
  );
}

/* ─── Color Swatch ─── */
function ColorSwatch({ color, name, hex }: { color: string; name: string; hex: string }) {
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

/* ────────────────────────────────────────────
   PORTFOLIO Case Study Page
   ──────────────────────────────────────────── */
export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── 1. Navigation ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="text-xl font-bold tracking-tight font-[family-name:var(--font-poppins)]">
              Eugene<span className="text-accent">.</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {["Home", "Projects", "About", "Contact"].map((item) => (
                <Link key={item} href={`/#${item.toLowerCase()}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
            <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full bg-foreground/5 hover:bg-foreground/10 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── 2. Hero ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: DARK }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${ACCENT}20` }} />
          <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full blur-3xl" style={{ backgroundColor: `${ACCENT}08` }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-bold leading-[0.85] tracking-tight font-[family-name:var(--font-poppins)]">
                  <span className="text-white">MY</span><br />
                  <span style={{ color: ACCENT }}>PORTFOLIO</span>
                </h1>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: "Category", value: "Web Development" },
                  { label: "Role", value: "Designer & Developer" },
                  { label: "Timeline", value: "2025" },
                  { label: "Platform", value: "Web" },
                ].map((item) => (
                  <div key={item.label} className="px-4 py-2 rounded-full border border-white/15 bg-white/5">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>{item.label}: </span>
                    <span className="text-sm font-medium text-white/90">{item.value}</span>
                  </div>
                ))}
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-8 text-white/60 text-base lg:text-lg leading-relaxed max-w-lg">
                My personal portfolio website &mdash; a case study in itself. Designed and developed from scratch with Next.js, GSAP scroll animations, and a dark editorial aesthetic that puts the work front and center.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="mt-8 flex flex-wrap gap-4">
                <MagneticHover>
                  <a href="#overview" className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full font-semibold text-sm hover:bg-white/90 transition-colors duration-300" style={{ color: DARK }}>
                    Read Full Case Study <ChevronRight className="w-4 h-4" />
                  </a>
                </MagneticHover>
                <MagneticHover>
                  <a href="https://github.com/eugenekihara/Portfolio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-sm text-white hover:border-white/40 transition-colors duration-300">
                    <Github className="w-4 h-4" /> View Source
                  </a>
                </MagneticHover>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }} className="mt-16 hidden lg:flex items-center gap-3 text-white/30">
                <div className="w-px h-12 bg-white/20" />
                <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </motion.div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 60, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} className="flex justify-center lg:justify-end">
              <Parallax speed={-0.08}>
                <BrowserFrame src="/portfolio/screen-home-hero.png" alt="Portfolio homepage hero section" className="w-[400px] lg:w-[500px]" />
              </Parallax>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Overview ── */}
      <section id="overview" className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading label="Overview" title="Eating your own dog food" />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="text-foreground/80 text-base lg:text-lg leading-[1.8]">
                  <span className="font-bold font-[family-name:var(--font-poppins)] text-foreground">This portfolio</span> is more than a showcase &mdash; it&apos;s a living case study of my design and development capabilities. Every interaction, animation, and layout decision was intentional, designed to demonstrate the same principles I apply to client work: user-centered thinking, visual hierarchy, and performance-first engineering.
                </p>
                <p className="text-foreground/70 text-base leading-[1.8]">
                  Built with Next.js 16 and deployed on Vercel, the site features GSAP-powered scroll animations, Lenis smooth scrolling, Framer Motion page transitions, and a fully custom admin panel with Prisma and NextAuth. The dark editorial aesthetic with burnt-red accents was chosen to let the project work breathe while maintaining a strong, memorable brand identity.
                </p>
                <p className="text-foreground/70 text-base leading-[1.8]">
                  Unlike many portfolios that focus on flash over substance, every animation serves a purpose: scroll reveals guide the viewer&apos;s attention, parallax creates depth without distraction, and staggered reveals create rhythm that mirrors how stories unfold. The portfolio itself proves the methodologies described in its case studies.
                </p>
              </div>
            </ScrollReveal>
            <ScrollRevealRight>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-foreground/5">
                <img src="/portfolio/screen-projects-dark.png" alt="Portfolio projects section" className="w-full h-auto object-cover" />
              </div>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      {/* ── 4. Design Challenge ── */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionHeading label="The Challenge" title="Portfolio paradox: showing vs. telling" />
              <ScrollReveal delay={0.2}>
                <div className="space-y-5">
                  <p className="text-foreground/80 text-base leading-[1.8]">
                    The portfolio paradox is real: you need a portfolio to get work, but your portfolio itself needs to demonstrate your skills. Simply listing projects with screenshots wouldn&apos;t prove my capabilities &mdash; the medium had to match the message. Every pixel and interaction needed to reinforce the design thinking I describe in my case studies.
                  </p>
                  <p className="text-foreground/70 text-base leading-[1.8]">
                    Performance was a critical constraint. Heavy animations and smooth scrolling can tank Core Web Vitals if implemented carelessly. I needed to balance visual richness with load speed, ensuring the site feels premium without making users wait. Every animation library was chosen specifically for its performance characteristics.
                  </p>
                  <p className="text-foreground/70 text-base leading-[1.8]">
                    The third challenge was content management. Hard-coding project data would be fast to build but painful to maintain. I needed a system that let me add and update projects without touching code &mdash; while keeping the frontend fully static for performance.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <div>
              <StaggerReveal className="grid grid-cols-2 gap-4 lg:gap-6" stagger={0.15}>
                <StatCard icon={Palette} value="Show, Don't Tell" label="The portfolio itself must demonstrate the design skills described in its case studies" />
                <StatCard icon={Zap} value="Performance" label="GSAP + Lenis animations must not compromise Core Web Vitals or load speed" />
                <StatCard icon={Layers} value="CMS Balance" label="Custom admin panel for content management without sacrificing static performance" />
                <StatCard icon={Monitor} value="Responsive" label="Pixel-perfect across all devices with horizontal scrolling project cards on desktop" />
              </StaggerReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Technical Architecture ── */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: DARK }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${ACCENT}15` }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ backgroundColor: `${ACCENT}08` }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Technical Architecture</p>
            </ScrollReveal>
            <SplitTextReveal text="Performance meets polish — no compromises" className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-white max-w-4xl mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollRevealLeft>
              <div className="space-y-6">
                <p className="text-white/80 text-base lg:text-lg leading-[1.8]">
                  The tech stack was chosen to deliver three things: developer experience, runtime performance, and visual fidelity. Next.js 16 with App Router and Turbopack provides instant hot reload during development and optimized static generation for production. TypeScript ensures type safety across the entire codebase.
                </p>
                <p className="text-white/60 text-base leading-[1.8]">
                  GSAP with ScrollTrigger powers the scroll-driven animations &mdash; pinning sections, triggering reveals, and creating parallax depth. Lenis provides buttery smooth scrolling that makes the experience feel native-app quality. Framer Motion handles page transitions and entrance animations with spring physics that feel organic.
                </p>
                <p className="text-white/60 text-base leading-[1.8]">
                  On the backend, Prisma ORM with SQLite manages project data through a custom admin panel secured with NextAuth. This means I can add, edit, and reorder projects without redeploying &mdash; while the public-facing pages remain statically generated for maximum performance.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-white">16</p>
                    <p className="text-xs text-white/50 mt-1">Next.js version</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)]" style={{ color: ACCENT }}>3</p>
                    <p className="text-xs text-white/50 mt-1">Animation libraries</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-white">100</p>
                    <p className="text-xs text-white/50 mt-1">Lighthouse score</p>
                  </div>
                </div>
              </div>
            </ScrollRevealLeft>
            <ScrollRevealRight>
              <ClipReveal>
                <BrowserFrame src="/portfolio/screen-case-study.png" alt="Portfolio case study detail page" className="w-[400px] lg:w-[500px]" />
              </ClipReveal>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      {/* ── 6. Key Sections ── */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 lg:mb-24">
            <SectionHeading label="Key Sections" title="Every section tells a story" />
          </div>
          <div className="space-y-20 lg:space-y-32">
            <ScreenShowcase src="/portfolio/screen-home-hero.png" alt="Portfolio homepage hero section" title="Hero & Services" purpose="The hero section establishes identity immediately — a bold 'Eugene' headline, role badge, and interest tags that communicate specialization without requiring the user to scroll. The services grid below provides structure, showing what I offer at a glance with icon-driven cards." rationale="Research shows users form impressions in 50ms. The hero uses a typographic-first approach (large Poppins heading) rather than a photo, which loads faster and communicates confidence. The interest sidebar acts as a visual filter — potential clients can immediately see if their needs align." />
            <DrawLine direction="horizontal" color={ACCENT} className="mx-auto max-w-md" />
            <ScreenShowcase src="/portfolio/screen-projects-dark.png" alt="Portfolio projects section with dark theme" title="Projects Showcase" purpose="The projects section uses horizontal scrolling to create a gallery-like experience. Each project card features a full-bleed thumbnail, category badge, title, description, technology tags, and a 'View Case Study' CTA — giving enough context to decide whether to dive deeper." rationale="Horizontal scrolling was chosen over a grid because it creates a narrative flow — projects unfold like chapters rather than competing for attention. The dark background with burnt-red accents creates cinematic contrast that makes project thumbnails pop." reversed />
            <DrawLine direction="horizontal" color={ACCENT} className="mx-auto max-w-md" />
            <ScreenShowcase src="/portfolio/screen-case-study.png" alt="Portfolio case study detail page" title="Case Study Pages" purpose="Each project gets its own comprehensive case study with scroll-driven animations, phone/browser mockups, and structured sections: Hero, Overview, Problem, Solution, User Flow, Screens, Features, Design System, and Outcomes. This is where the real narrative lives." rationale="Case study pages are the conversion mechanism. They transform 'I made this' into 'here's how I think.' The GSAP ScrollTrigger animations create a guided reading experience — information appears exactly when the reader is ready for it." />
            <DrawLine direction="horizontal" color={ACCENT} className="mx-auto max-w-md" />
            <ScreenShowcase src="/portfolio/screen-about.png" alt="Portfolio about section" title="About & Experience" purpose="The about section provides personal context — who I am, my current role, and a comprehensive services grid showing the breadth of my capabilities. The experience timeline adds credibility, while the service cards make it easy for potential clients to match their needs with my skills." rationale="The dual-column layout (text + visual) prevents the about section from becoming a wall of text. The eight-card services grid is more scannable than a paragraph list, and the current role timeline entry signals active availability." reversed />
            <DrawLine direction="horizontal" color={ACCENT} className="mx-auto max-w-md" />
            <ScreenShowcase src="/portfolio/screen-skills.png" alt="Portfolio skills section" title="Skills & Capabilities" purpose="Skills are organized into five categories (Design, Frontend, Backend, Database, Tools & Technologies), each with its own visual block and icon set. The Design category is marked as 'Core Focus' to signal primary expertise while showing range across the full stack." rationale="Categorizing skills by domain rather than listing them alphabetically helps recruiters and clients quickly assess fit. The 'Core Focus' tag on Design directly addresses the common question about primary expertise, while showing both proves versatility." />
            <DrawLine direction="horizontal" color={ACCENT} className="mx-auto max-w-md" />
            <ScreenShowcase src="/portfolio/screen-contact.png" alt="Portfolio contact section" title="Contact & Conversion" purpose="The contact section serves as the primary conversion point with a clean form (name, email, message), direct contact info, and social links. A running marquee at the bottom reinforces service offerings one final time before the page ends." rationale="Placing the form on the left (natural reading direction) and contact info on the right creates a clear action hierarchy. The marquee banner at the bottom serves as a closing statement — reinforcing brand identity at the exact moment a user is deciding whether to reach out." reversed />
          </div>
        </div>
      </section>

      {/* ── 7. Features ── */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionHeading label="Features" title="Built different, by design" />
          </div>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#8b4049]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${ACCENT}15` }}><MousePointer2 className="w-5 h-5" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Scroll Animations</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">GSAP ScrollTrigger powers 8+ custom animation components: ScrollReveal, SplitTextReveal, StaggerReveal, ClipReveal, Parallax, DrawLine, MagneticHover, and ScaleIn.</p>
            </div>
            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#8b4049]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${ACCENT}15` }}><Layout className="w-5 h-5" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Horizontal Scroll</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">The projects section uses a pinned horizontal scroll with Lenis smooth scrolling, creating a gallery-like narrative flow for browsing case studies.</p>
            </div>
            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#8b4049]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${ACCENT}15` }}><Database className="w-5 h-5" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Custom Admin CMS</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Full admin panel with Prisma ORM, NextAuth authentication, and CRUD operations for projects and messages — no code changes needed.</p>
            </div>
            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#8b4049]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${ACCENT}15` }}><Sparkles className="w-5 h-5" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Page Transitions</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Framer Motion powers smooth page-level transitions with spring physics. Each route change feels like a continuation, not a disruption.</p>
            </div>
            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#8b4049]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${ACCENT}15` }}><Paintbrush className="w-5 h-5" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Design System</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Consistent theme constants, reusable components, and a unified color palette across all case study pages with per-project theming.</p>
            </div>
            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#8b4049]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${ACCENT}15` }}><Globe className="w-5 h-5" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Responsive Design</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Every section adapts from mobile to ultra-wide. Horizontal scrolling on desktop transforms to vertical stacking on mobile.</p>
            </div>
            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#8b4049]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${ACCENT}15` }}><Code2 className="w-5 h-5" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">TypeScript Strict</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Full TypeScript coverage with strict mode ensures type safety across components, API routes, and database operations.</p>
            </div>
            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#8b4049]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${ACCENT}15` }}><BarChart3 className="w-5 h-5" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Performance First</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Static generation, image optimization, and lazy-loaded animations ensure strong Core Web Vitals despite heavy visual richness.</p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 8. Design System ── */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: DARK }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${ACCENT}15` }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ backgroundColor: `${ACCENT}08` }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal><p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Design System</p></ScrollReveal>
            <SplitTextReveal text="Dark editorial, burnt-red conviction" className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-white max-w-4xl mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <ScrollRevealLeft>
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">Color Palette</h3>
                <div className="space-y-3">
                  <ColorSwatch color="#0a0a0a" name="Midnight Black" hex="#0a0a0a" />
                  <ColorSwatch color="#8b4049" name="Burnt Red" hex="#8b4049" />
                  <ColorSwatch color="#a85a63" name="Rose Accent" hex="#a85a63" />
                  <ColorSwatch color="#404040" name="Warm Neutral" hex="#404040" />
                  <ColorSwatch color="#FFFFFF" name="White" hex="#FFFFFF" />
                </div>
              </div>
            </ScrollRevealLeft>
            <ScrollRevealRight>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">Typography</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5">
                      <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-2">Headings</p>
                      <p className="text-white text-2xl font-bold font-[family-name:var(--font-poppins)]">Poppins Bold</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-2">Body</p>
                      <p className="text-white text-base">Inter Regular — optimized for screen readability across all devices</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">Design Principles</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Editorial Hierarchy", desc: "Large Poppins headings create a magazine-like reading experience with clear visual weight and rhythm" },
                      { title: "Cinematic Dark", desc: "Dark backgrounds with burnt-red accents create depth and focus, letting project work take center stage" },
                      { title: "Purposeful Motion", desc: "Every animation has a job: guiding attention, creating depth, or establishing rhythm — never decoration for its own sake" },
                    ].map((p) => (
                      <div key={p.title} className="p-4 rounded-xl bg-white/5">
                        <p className="text-white font-medium text-sm mb-1">{p.title}</p>
                        <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      {/* ── 9. Tech Stack ── */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionHeading label="Tech Stack" title="The full stack, no shortcuts" />
          </div>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" stagger={0.1}>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><Globe className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Next.js 16</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">App Router, Server Components, Turbopack, and static generation for best DX and production performance.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><Code2 className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">TypeScript</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Full strict TypeScript across components, API routes, and database schemas for compile-time safety.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><Paintbrush className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Tailwind CSS</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Utility-first CSS with custom design tokens, responsive utilities, and dark mode support baked in.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><Zap className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">GSAP + Lenis</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">ScrollTrigger-driven animations with Lenis smooth scrolling. 8+ custom animation components.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><Database className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Prisma ORM</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Type-safe database queries with SQLite. Custom admin CRUD for managing projects and messages.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><Github className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">GitHub & Vercel</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">CI/CD with GitHub Actions and Vercel deployments. Every push triggers a preview build.</p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 10. Outcomes ── */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionHeading label="Outcomes" title="Ship it, then iterate" />
          </div>
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" stagger={0.12}>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-background text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><CheckCircle2 className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Live & Shipped</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">The portfolio is live and serving as my primary professional presence. Every section is functional, every form submits, and every animation performs smoothly.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-background text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><BarChart3 className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Performance Optimized</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Despite heavy GSAP animations and Lenis smooth scrolling, the site maintains strong Core Web Vitals through static generation and lazy loading.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-background text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><Layers className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Scalable Architecture</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Custom admin CMS and modular components mean adding new projects takes minutes. Reusable animations and per-project theming scale without duplication.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-background text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><Sparkles className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Self-Demonstrating</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">The portfolio proves the design thinking described in its case studies. Every animation and layout decision reinforces the UX principles I advocate.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-background text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><Monitor className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Full-Stack Proof</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">From frontend animations to backend APIs, database schema to authentication — the portfolio demonstrates end-to-end development capability.</p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-background text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${ACCENT}15` }}><Palette className="w-7 h-7" style={{ color: ACCENT }} /></div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Distinctive Identity</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">The dark editorial aesthetic with burnt-red accents creates a memorable brand that stands out in a sea of minimal white portfolios.</p>
            </div>
          </StaggerReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-16 flex justify-center">
              <a href="https://github.com/eugenekihara/Portfolio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-colors duration-300 text-white" style={{ backgroundColor: ACCENT }}>
                View Source on GitHub <Github className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 11. Next Project ── */}
      <section className="py-16 lg:py-24 bg-background border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">Next Project</p>
                <Link href="/projects/waveeatz" className="group inline-flex items-center gap-4">
                  <h3 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground group-hover:text-accent transition-colors duration-300">Wave Eatz</h3>
                  <ArrowRight className="w-6 h-6 text-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-2" />
                </Link>
                <p className="mt-2 text-muted-foreground text-sm">Food savings and tracking mobile app</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
