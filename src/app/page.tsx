"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  Github,
  Linkedin,
  Menu,
  X,
  Send,
  ChevronDown,
  Palette,
  Layout,
  Search,
  PenTool,
  Monitor,
  Figma,
  Code2,
  Database,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

/* ─── Animated Section Wrapper ─── */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── SVG Icon Components for Skills ─── */
function FigmaIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="4" />
      <circle cx="12" cy="18" r="4" />
      <circle cx="6" cy="12" r="4" />
      <circle cx="18" cy="12" r="4" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <path d="M6 12h6" />
      <path d="M18 12h-6" />
    </svg>
  );
}

function AdobeXDIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <text x="7" y="16" fontSize="10" fontWeight="bold" fill="currentColor" stroke="none">Xd</text>
    </svg>
  );
}

function WireframeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="9" x2="9" y2="21" />
      <rect x="5" y="5" width="2" height="2" rx="0.5" />
    </svg>
  );
}

function PrototypeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polygon points="10,8 16,12 10,16" fill="currentColor" />
    </svg>
  );
}

function ResearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="16" y1="16" x2="21" y2="21" />
      <line x1="8" y1="11" x2="14" y2="11" />
      <line x1="11" y1="8" x2="11" y2="14" />
    </svg>
  );
}

function UIDesignIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8" r="2" />
      <rect x="12" y="6" width="7" height="4" rx="1" />
      <rect x="5" y="13" width="14" height="6" rx="1" />
    </svg>
  );
}

function HTMLIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16,18 22,12 16,6" />
      <polyline points="8,6 2,12 8,18" />
    </svg>
  );
}

function CSSIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 8h4" />
      <path d="M8 12h8" />
      <path d="M8 16h6" />
    </svg>
  );
}

function JSIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 17v-3" />
      <path d="M15 17c0-1.5 3-2 3-4" />
    </svg>
  );
}

function ReactIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-60 12 12)" />
    </svg>
  );
}

function NextIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M14 8v8" />
      <path d="M10 8l4 4-4 4" />
    </svg>
  );
}

function TailwindIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6c-2.7 0-4.2 1.3-4.5 4 1.4-1.3 3-1.7 4.5-1.3 1 .3 1.7 1 2.5 1.7 1.3 1.2 2.7 2.6 5 2.6 2.7 0 4.2-1.3 4.5-4-1.4 1.3-3 1.7-4.5 1.3-1-.3-1.7-1-2.5-1.7C15.7 7.4 14.3 6 12 6z" />
      <path d="M5 14c-2.7 0-4.2 1.3-4.5 4 1.4-1.3 3-1.7 4.5-1.3 1 .3 1.7 1 2.5 1.7 1.3 1.2 2.7 2.6 5 2.6 2.7 0 4.2-1.3 4.5-4-1.4 1.3-3 1.7-4.5 1.3-1-.3-1.7-1-2.5-1.7C8.7 15.4 7.3 14 5 14z" />
    </svg>
  );
}

function NodeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
      <line x1="12" y1="22" x2="12" y2="12" />
      <line x1="12" y1="12" x2="3" y2="7" />
      <line x1="12" y1="12" x2="21" y2="7" />
    </svg>
  );
}

function ExpressIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <text x="6" y="15" fontSize="9" fontWeight="bold" fill="currentColor" stroke="none">ex</text>
    </svg>
  );
}

function PHPIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="10" ry="6" />
      <text x="6" y="15" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">php</text>
    </svg>
  );
}

function APIIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <line x1="8.5" y1="10.5" x2="15.5" y2="7.5" />
      <line x1="8.5" y1="13.5" x2="15.5" y2="16.5" />
    </svg>
  );
}

function MySQLIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="6" rx="9" ry="4" />
      <path d="M3 6v6c0 2.2 4 4 9 4s9-1.8 9-4V6" />
      <path d="M3 12v6c0 2.2 4 4 9 4s9-1.8 9-4v-6" />
    </svg>
  );
}

function GitIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <line x1="12" y1="15" x2="12" y2="9" />
      <path d="M8.5 8L12 9l3.5-1" />
    </svg>
  );
}

function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function VSCodeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="16,3 21,7 21,17 16,21 3,14 3,10" />
      <line x1="16" y1="3" x2="16" y2="21" />
    </svg>
  );
}

function ResponsiveIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function SEOIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="16" y1="16" x2="21" y2="21" />
      <path d="M8 11h6" />
      <path d="M11 8v6" />
    </svg>
  );
}

/* ─── Navigation (Warm Modern) ─── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a
              href="#hero"
              className="text-xl font-bold tracking-tight font-[family-name:var(--font-poppins)]"
            >
              Eugene<span className="text-accent">.</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-8 pt-20">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl font-bold font-[family-name:var(--font-poppins)] hover:text-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Hero Section (Warm Modern) ─── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Decorative blur blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs tracking-[0.2em] uppercase text-accent font-medium border border-accent/30 rounded-full px-4 py-1.5 mb-8">
                UI/UX Designer &amp; Developer
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold font-[family-name:var(--font-poppins)] leading-[0.9] tracking-tight"
            >
              Eugene
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Kenya-based product designer crafting thoughtful digital solutions
              where strategy meets aesthetics.
            </motion.p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4 relative z-10">
              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-label="View my projects"
                type="button"
              >
                View Work
                <ArrowRight className="w-4 h-4 pointer-events-none" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 border border-border bg-transparent px-8 py-4 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-label="Get in touch with me"
                type="button"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Interests card (right side) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block"
          >
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Interests
              </h3>
              <div className="space-y-3">
                {[
                  { icon: <Palette className="w-4 h-4" />, label: "UI/UX Design" },
                  { icon: <Layout className="w-4 h-4" />, label: "Web Development" },
                  { icon: <Search className="w-4 h-4" />, label: "UX Research" },
                  { icon: <PenTool className="w-4 h-4" />, label: "Brand Identity" },
                  { icon: <Monitor className="w-4 h-4" />, label: "Motion Design" },
                ].map((interest) => (
                  <div
                    key={interest.label}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="text-accent">{interest.icon}</span>
                    {interest.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-muted-foreground">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services Section ─── */
function ServicesSection() {
  const services = [
    {
      icon: "◈",
      title: "Web Design",
      description:
        "Clean, responsive websites that balance aesthetics with usability, built to engage and convert.",
    },
    {
      icon: "◉",
      title: "Product Design",
      description:
        "End-to-end product experiences from research to high-fidelity prototypes, solving real user problems.",
    },
    {
      icon: "◎",
      title: "UX Audit & Strategy",
      description:
        "In-depth analysis of existing products to identify friction points and optimize the user journey.",
    },
    {
      icon: "◆",
      title: "Branding & Identity",
      description:
        "Cohesive visual identities that communicate your brand's values and stand out in the market.",
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium">
              What I Offer
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)]">
              Services
            </h2>
          </div>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <FadeInSection key={service.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="text-3xl text-accent">{service.icon}</span>
                <h3 className="mt-4 text-lg font-bold font-[family-name:var(--font-poppins)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process Section ─── */
function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      description:
        "Understanding the problem, the users, and the business goals through research and stakeholder interviews.",
    },
    {
      number: "02",
      title: "Define",
      description:
        "Synthesizing insights into clear problem statements and defining the project direction and scope.",
    },
    {
      number: "03",
      title: "Design",
      description:
        "Crafting wireframes, prototypes, and visual designs that balance user needs with business objectives.",
    },
    {
      number: "04",
      title: "Deliver",
      description:
        "Refining and handoff with detailed specifications, ensuring pixel-perfect implementation.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium">
              How I Work
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)]">
              Process
            </h2>
          </div>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeInSection key={step.title} delay={i * 0.1}>
              <div className="p-8 border border-border rounded-2xl bg-background hover:border-accent/50 transition-all duration-300">
                <span className="text-5xl font-bold text-accent/20 font-[family-name:var(--font-poppins)]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-bold font-[family-name:var(--font-poppins)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Projects Section (Dark bg, Editorial) ─── */
interface ProjectData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  categoryTag: string | null;
  technologies: string;
  thumbnail: string;
  impact: string | null;
  caseStudyHref: string | null;
  featured: boolean;
  order: number;
}

function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  if (loading) {
    return (
      <section id="projects" className="py-28 lg:py-40 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-neutral-500">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="py-28 lg:py-40 bg-[#0a0a0a] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <FadeInSection>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 lg:mb-24">
            <div>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#8b4049]">
                Selected Work
              </span>
              <h2 className="mt-4 text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold font-[family-name:var(--font-poppins)] leading-[0.85] tracking-tighter">
                Projects
              </h2>
            </div>
            <p className="text-neutral-400 max-w-sm text-sm leading-relaxed sm:text-right sm:pb-2">
              Each project is a case study — not just a screenshot. Strategy,
              design, and outcome fused into one narrative.
            </p>
          </div>
        </FadeInSection>

        {/* Decorative rule */}
        <FadeInSection>
          <div className="h-px bg-gradient-to-r from-[#8b4049] via-neutral-700 to-transparent mb-16 lg:mb-24" />
        </FadeInSection>

        {/* Featured Project — Full-width Editorial Block */}
        {featuredProject && (
          <FadeInSection>
            <Link
              href={`/projects/${featuredProject.slug}`}
            >
              <div className="group relative cursor-pointer">
                {/* Outer border frame */}
                <div className="border-2 border-neutral-700 group-hover:border-[#8b4049] transition-colors duration-500">
                  {/* Inner content */}
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left — Image */}
                    <div className="relative overflow-hidden bg-neutral-900 aspect-[4/3] lg:aspect-auto">
                      <img
                        src={featuredProject.thumbnail}
                        alt={featuredProject.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      {/* Category overlay chip */}
                      <div className="absolute top-6 left-6 bg-[#0a0a0a] border-2 border-neutral-600 px-3 py-1.5">
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8b4049]">
                          {featuredProject.category}
                        </span>
                      </div>
                    </div>

                    {/* Right — Content */}
                    <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-between bg-[#0a0a0a] border-t-2 lg:border-t-0 lg:border-l-2 border-neutral-700 group-hover:border-[#8b4049] transition-colors duration-500">
                      <div>
                        {/* Project number + tag */}
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-7xl lg:text-8xl font-bold font-[family-name:var(--font-poppins)] text-neutral-800 group-hover:text-neutral-700 transition-colors duration-500 leading-none">
                            01
                          </span>
                          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-500 border-2 border-neutral-700 px-3 py-1.5">
                            {featuredProject.categoryTag}
                          </span>
                        </div>

                        {/* Project name */}
                        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] tracking-tight leading-[0.9]">
                          {featuredProject.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-6 text-neutral-400 leading-relaxed text-sm max-w-lg">
                          {featuredProject.shortDescription}
                        </p>

                        {/* Impact badge */}
                        {featuredProject.impact && (
                          <div className="mt-6 inline-flex items-center gap-2 border-2 border-[#8b4049]/40 bg-[#8b4049]/10 px-4 py-2">
                            <span className="w-1.5 h-1.5 bg-[#8b4049]" />
                            <span className="text-[#8b4049] text-xs font-bold tracking-wider uppercase">
                              {featuredProject.impact}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bottom — Tech stack + CTA */}
                      <div className="mt-10">
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {featuredProject.technologies.split(",").map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-medium tracking-wider uppercase text-neutral-500 border-2 border-neutral-800 px-3 py-1.5 group-hover:border-neutral-600 group-hover:text-neutral-400 transition-colors duration-300"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-3 text-[#8b4049] group-hover:gap-5 transition-all duration-300">
                          <span className="text-sm font-bold tracking-wider uppercase">
                            View Case Study
                          </span>
                          <div className="w-10 h-10 border-2 border-[#8b4049] flex items-center justify-center group-hover:bg-[#8b4049] group-hover:text-white transition-all duration-300">
                            <ArrowUpRight size={18} strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </FadeInSection>
        )}

        {/* Other Projects — Grid */}
        <div className="mt-16 lg:mt-24 grid md:grid-cols-2 gap-6 lg:gap-8">
          {otherProjects.map((project, i) => (
            <FadeInSection key={project.id} delay={i * 0.15}>
              <Link
                href={`/projects/${project.slug}`}
              >
                <div className="group cursor-pointer h-full">
                  {/* Card outer border */}
                  <div className="border-2 border-neutral-700 group-hover:border-[#8b4049] transition-colors duration-500 h-full flex flex-col">
                    {/* Image area */}
                    <div className="relative overflow-hidden bg-neutral-900 aspect-[16/10]">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      {/* Category chip */}
                      <div className="absolute top-5 left-5 bg-[#0a0a0a] border-2 border-neutral-600 px-3 py-1.5">
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8b4049]">
                          {project.category}
                        </span>
                      </div>
                      {/* Project number watermark */}
                      <span className="absolute bottom-4 right-5 text-6xl font-bold font-[family-name:var(--font-poppins)] text-neutral-800/50 leading-none select-none">
                        0{i + 2}
                      </span>
                    </div>

                    {/* Content area */}
                    <div className="p-6 sm:p-8 flex flex-col flex-1 bg-[#0a0a0a] border-t-2 border-neutral-700 group-hover:border-[#8b4049] transition-colors duration-500">
                      {/* Name + tag */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)] tracking-tight leading-[0.9]">
                          {project.title}
                        </h3>
                        {project.categoryTag && (
                          <span className="shrink-0 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 border-2 border-neutral-700 px-2.5 py-1 mt-1">
                            {project.categoryTag}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-neutral-400 text-sm leading-relaxed flex-1">
                        {project.shortDescription}
                      </p>

                      {/* Impact */}
                      {project.impact && (
                        <div className="mt-5 inline-flex items-center gap-2 border-2 border-[#8b4049]/40 bg-[#8b4049]/10 px-3 py-1.5 w-fit">
                          <span className="w-1.5 h-1.5 bg-[#8b4049]" />
                          <span className="text-[#8b4049] text-[11px] font-bold tracking-wider uppercase">
                            {project.impact}
                          </span>
                        </div>
                      )}

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mt-5">
                        {project.technologies.split(",").map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-medium tracking-wider uppercase text-neutral-500 border-2 border-neutral-800 px-2.5 py-1 group-hover:border-neutral-600 group-hover:text-neutral-400 transition-colors duration-300"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>

                      {/* CTA row */}
                      <div className="mt-6 pt-5 border-t-2 border-neutral-800 flex items-center justify-between">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 group-hover:text-[#8b4049] transition-colors duration-300">
                          View Case Study
                        </span>
                        <div className="w-8 h-8 border-2 border-neutral-600 flex items-center justify-center group-hover:border-[#8b4049] group-hover:bg-[#8b4049] group-hover:text-white transition-all duration-300">
                          <ArrowUpRight size={14} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>

        {/* Bottom rule */}
        <FadeInSection className="mt-16 lg:mt-24">
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-[#8b4049]" />
        </FadeInSection>
      </div>
    </section>
  );
}

/* ─── About Section (Two-column with image) ─── */
function AboutSection() {
  const whatIDo = [
    { icon: <Palette className="w-5 h-5" />, title: "UI Design", description: "Pixel-perfect interfaces that delight users" },
    { icon: <Search className="w-5 h-5" />, title: "UX Research", description: "Data-driven design decisions" },
    { icon: <Layout className="w-5 h-5" />, title: "Web Development", description: "Responsive, performant websites" },
    { icon: <PenTool className="w-5 h-5" />, title: "Brand Identity", description: "Cohesive visual systems" },
    { icon: <Monitor className="w-5 h-5" />, title: "Prototyping", description: "Interactive design validation" },
    { icon: <Code2 className="w-5 h-5" />, title: "Frontend Code", description: "Clean, maintainable code" },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <FadeInSection>
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium">
                About
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)]">
                Intentional design, meaningful experiences.
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  I&apos;m Eugene, a UI/UX designer and front-end developer
                  based in Kenya. I design digital experiences that are clear,
                  intentional, and easy to use.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My work lives at the intersection of design and development,
                  where structure, typography, and interaction come together to
                  create thoughtful products. I&apos;m particularly interested
                  in systems thinking and the kind of simplicity that comes from
                  careful constraints.
                </p>
              </div>

              {/* Experience entry */}
              <div className="mt-8 border-b border-border pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold font-[family-name:var(--font-poppins)]">
                      Product Designer
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Freelance / Contract
                    </p>
                  </div>
                  <span className="text-sm text-accent font-medium">
                    2025 — Present
                  </span>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Right: Image */}
          <FadeInSection delay={0.2}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/about-studio.png"
                  alt="Design studio workspace"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-accent/20 rounded-2xl -z-10" />
            </div>
          </FadeInSection>
        </div>

        {/* What I Do grid */}
        <div className="mt-20">
          <FadeInSection>
            <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] mb-8">
              What I Do
            </h3>
          </FadeInSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatIDo.map((item, i) => (
              <FadeInSection key={item.title} delay={i * 0.05}>
                <div className="border border-border rounded-2xl p-6 hover:bg-foreground hover:text-background transition-all duration-300 group cursor-default">
                  <span className="text-accent group-hover:text-accent-foreground">
                    {item.icon}
                  </span>
                  <h4 className="mt-3 font-bold font-[family-name:var(--font-poppins)]">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground group-hover:text-background/70">
                    {item.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills Section (Design first, no percentages) ─── */
function SkillCategoryBlock({
  title,
  icon,
  skills,
  iconMap,
  featured = false,
}: {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  iconMap: Record<string, React.ReactNode>;
  featured?: boolean;
}) {
  return (
    <div
      className={`border border-border rounded-2xl p-6 ${
        featured ? "lg:p-8 border-accent/30" : ""
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-accent">{icon}</span>
        <h3
          className={`font-bold font-[family-name:var(--font-poppins)] ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          {title}
        </h3>
        {featured && (
          <span className="ml-auto text-[10px] font-bold tracking-[0.2em] uppercase text-accent border border-accent/30 rounded-full px-3 py-1">
            Core Focus
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className={`flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-sm hover:border-accent/50 hover:bg-accent/5 transition-all duration-200 cursor-default ${
              featured ? "px-4 py-2.5" : ""
            }`}
          >
            {iconMap[skill] && (
              <span className="text-accent/70">{iconMap[skill]}</span>
            )}
            <span className="font-medium">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  const designSkills = [
    "Figma",
    "Adobe XD",
    "Wireframing",
    "Prototyping",
    "UX Research",
    "UI Design",
  ];

  const designIconMap: Record<string, React.ReactNode> = {
    Figma: <FigmaIcon className="w-4 h-4" />,
    "Adobe XD": <AdobeXDIcon className="w-4 h-4" />,
    Wireframing: <WireframeIcon className="w-4 h-4" />,
    Prototyping: <PrototypeIcon className="w-4 h-4" />,
    "UX Research": <ResearchIcon className="w-4 h-4" />,
    "UI Design": <UIDesignIcon className="w-4 h-4" />,
  };

  const frontendSkills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
  ];

  const frontendIconMap: Record<string, React.ReactNode> = {
    HTML5: <HTMLIcon className="w-4 h-4" />,
    CSS3: <CSSIcon className="w-4 h-4" />,
    JavaScript: <JSIcon className="w-4 h-4" />,
    React: <ReactIcon className="w-4 h-4" />,
    "Next.js": <NextIcon className="w-4 h-4" />,
    "Tailwind CSS": <TailwindIcon className="w-4 h-4" />,
  };

  const backendSkills = ["Node.js", "Express.js", "PHP", "REST APIs"];

  const backendIconMap: Record<string, React.ReactNode> = {
    "Node.js": <NodeIcon className="w-4 h-4" />,
    "Express.js": <ExpressIcon className="w-4 h-4" />,
    PHP: <PHPIcon className="w-4 h-4" />,
    "REST APIs": <APIIcon className="w-4 h-4" />,
  };

  const databaseSkills = ["MySQL", "SQL"];

  const databaseIconMap: Record<string, React.ReactNode> = {
    MySQL: <MySQLIcon className="w-4 h-4" />,
    SQL: <Database className="w-4 h-4" />,
  };

  const toolsSkills = [
    "Git",
    "GitHub",
    "VS Code",
    "Responsive Design",
    "SEO",
  ];

  const toolsIconMap: Record<string, React.ReactNode> = {
    Git: <GitIcon className="w-4 h-4" />,
    GitHub: <GitHubIcon className="w-4 h-4" />,
    "VS Code": <VSCodeIcon className="w-4 h-4" />,
    "Responsive Design": <ResponsiveIcon className="w-4 h-4" />,
    SEO: <SEOIcon className="w-4 h-4" />,
  };

  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium">
              Capabilities
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)]">
              Skills
            </h2>
          </div>
        </FadeInSection>

        <div className="space-y-6">
          {/* Design — Featured Category */}
          <FadeInSection>
            <SkillCategoryBlock
              title="Design"
              icon={<Palette className="w-6 h-6" />}
              skills={designSkills}
              iconMap={designIconMap}
              featured
            />
          </FadeInSection>

          {/* Frontend + Backend row */}
          <div className="grid md:grid-cols-2 gap-6">
            <FadeInSection delay={0.1}>
              <SkillCategoryBlock
                title="Frontend"
                icon={<Code2 className="w-5 h-5" />}
                skills={frontendSkills}
                iconMap={frontendIconMap}
              />
            </FadeInSection>
            <FadeInSection delay={0.15}>
              <SkillCategoryBlock
                title="Backend"
                icon={<Wrench className="w-5 h-5" />}
                skills={backendSkills}
                iconMap={backendIconMap}
              />
            </FadeInSection>
          </div>

          {/* Database + Tools row */}
          <div className="grid md:grid-cols-2 gap-6">
            <FadeInSection delay={0.2}>
              <SkillCategoryBlock
                title="Database"
                icon={<Database className="w-5 h-5" />}
                skills={databaseSkills}
                iconMap={databaseIconMap}
              />
            </FadeInSection>
            <FadeInSection delay={0.25}>
              <SkillCategoryBlock
                title="Tools & Technologies"
                icon={<Figma className="w-5 h-5" />}
                skills={toolsSkills}
                iconMap={toolsIconMap}
              />
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ─── */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateForm = (): boolean => {
    const errors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = "Please enter a message (at least 5 characters).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you within 24h.",
        });
        setFormData({ name: "", email: "", message: "" });
        setFormErrors({});
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium">
              Contact
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)]">
              Let&apos;s Work Together
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Have a project in mind? Let&apos;s create something meaningful
              together.
            </p>
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <FadeInSection delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  required
                  className={`border-border rounded-lg px-4 py-3 text-sm focus:border-accent ${formErrors.name ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  required
                  className={`border-border rounded-lg px-4 py-3 text-sm focus:border-accent ${formErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (formErrors.message) setFormErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  required
                  rows={6}
                  className={`border-border rounded-lg px-4 py-3 text-sm focus:border-accent resize-none ${formErrors.message ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {formErrors.message && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="bg-foreground text-background rounded-full px-8 py-3 hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </FadeInSection>

          {/* Contact info */}
          <FadeInSection delay={0.2}>
            <div className="space-y-8 lg:pt-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:kiharaeugene@gmail.com"
                    className="flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                  >
                    <Mail className="w-5 h-5 text-accent" />
                    <span className="text-sm">kiharaeugene@gmail.com</span>
                  </a>
                  <a
                    href="tel:+254712345678"
                    className="flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                  >
                    <Phone className="w-5 h-5 text-accent" />
                    <span className="text-sm">+254 712 345 678</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Follow Me
                </h3>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/eugenekihara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/eugenekihara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
