"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  Github,
  Linkedin,
  Menu,
  X,
  ChevronDown,
  Send,
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

/* ─── Navigation ─── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero" },
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a
              href="#hero"
              className="text-lg font-bold tracking-tight font-[family-name:var(--font-poppins)]"
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
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-20 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 pt-12">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-2xl font-semibold font-[family-name:var(--font-poppins)]"
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

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent/3 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-medium tracking-widest uppercase text-accent mb-4 border border-accent/30 px-3 py-1 rounded-full">
                UI/UX Designer & Developer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tight font-[family-name:var(--font-poppins)]"
            >
              Eugene
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Kenya-based product designer crafting thoughtful solutions for a
              global audience. Where strategy meets aesthetics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 group"
              >
                <a href="#projects">
                  View Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-border hover:bg-secondary"
              >
                <a href="#contact">Get in Touch</a>
              </Button>
            </motion.div>
          </div>

          {/* Interests card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="w-[1px] h-32 bg-foreground/20 mx-auto mb-8" />
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] mb-6 text-center">
                  Interests
                </h3>
                <div className="space-y-4">
                  {["Motion Design", "Art Direction", "Conversational Design"].map(
                    (interest) => (
                      <div
                        key={interest}
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-base">{interest}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#services" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Services Section ─── */
function ServicesSection() {
  const services = [
    {
      title: "Web Design",
      description:
        "Creating clean, responsive interfaces that blend intuitive UX with modern aesthetics to elevate your brand and engage your audience.",
      icon: "◈",
    },
    {
      title: "Product Design",
      description:
        "Focus on problem-solving, strategy, and the end-to-end journey from idea to execution for digital products that people love.",
      icon: "◉",
    },
    {
      title: "UX Audit & Strategy",
      description:
        "Identifying friction points through data-driven analysis to boost retention and optimize overall performance of your product.",
      icon: "◎",
    },
    {
      title: "Branding & Identity",
      description:
        "Developing cohesive visual identities — from logos to typography — to define your personality and ensure instant recognition.",
      icon: "◆",
    },
  ];

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <span className="text-sm font-medium tracking-widest uppercase text-accent">
            Services
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)]">
            What I Offer
          </h2>
        </FadeInSection>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <FadeInSection key={service.title} delay={i * 0.1}>
              <div className="group relative bg-card border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1">
                <span className="text-3xl text-accent block mb-4">
                  {service.icon}
                </span>
                <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
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
        "Immersive research into your audience, competitors, and constraints to uncover key insights and opportunities.",
    },
    {
      number: "02",
      title: "Define",
      description:
        "Distilling insights into a clear creative brief and system blueprint that guides every design decision.",
    },
    {
      number: "03",
      title: "Design",
      description:
        "Iterating from rough structural sketches to pixel-perfect delivery with relentless attention to detail.",
    },
    {
      number: "04",
      title: "Deliver",
      description:
        "Walking developers through the design logic and user flows for seamless implementation and handoff.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <span className="text-sm font-medium tracking-widest uppercase text-accent">
            Process
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)]">
            How I Work
          </h2>
        </FadeInSection>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <FadeInSection key={step.title} delay={i * 0.12}>
              <div className="group relative p-8 border border-border rounded-2xl bg-background hover:border-accent/50 transition-all duration-300">
                <span className="text-5xl font-bold text-accent/20 font-[family-name:var(--font-poppins)] group-hover:text-accent/40 transition-colors">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-bold font-[family-name:var(--font-poppins)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
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

/* ─── Marquee ─── */
function MarqueeBanner() {
  const items = [
    "WEB DESIGN",
    "BRAND IDENTITY",
    "UI / UX DESIGN",
    "UX RESEARCH",
    "ART DIRECTION",
    "PRODUCT DESIGN",
    "MOTION DESIGN",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="bg-foreground text-background py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-6 text-sm font-medium tracking-wider flex items-center gap-6">
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Projects Section ─── */
function ProjectsSection() {
  const projects = [
    {
      name: "WAVEEATZ",
      category: "Mobile App Design",
      color: "from-[#8b4049] to-[#6b2a33]",
      image: "/waveeatz.png",
    },
    {
      name: "SchooPata",
      category: "Educational Platform",
      color: "from-[#5c3a2e] to-[#3d2518]",
      image: "/schoolpata.png",
    },
    {
      name: "Shamba Rahisi",
      category: "AgriTech Solution",
      color: "from-[#6b4b3a] to-[#4a3328]",
      image: "/shamba-rahisi.png",
    },
  ];

  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <span className="text-sm font-medium tracking-widest uppercase text-accent">
            Selected Work
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)]">
            Projects
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            A collection of selected works spanning web design, brand identity,
            and digital products. Each project represents a unique challenge and
            creative solution.
          </p>
        </FadeInSection>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <FadeInSection key={project.name} delay={i * 0.15}>
              <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10 transition-opacity duration-500 group-hover:opacity-0`}
                />

                {/* Image */}
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Content on overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 transition-opacity duration-500 group-hover:opacity-0">
                  <span className="text-white/70 text-sm font-medium tracking-wider uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-white text-3xl font-bold font-[family-name:var(--font-poppins)] mt-2">
                    {project.name}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 z-30 bg-foreground/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-center">
                    <span className="text-accent text-sm font-medium tracking-wider uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-background text-3xl font-bold font-[family-name:var(--font-poppins)] mt-2">
                      {project.name}
                    </h3>
                    <div className="mt-6 inline-flex items-center gap-2 text-background border border-background/40 rounded-full px-6 py-2 text-sm font-medium hover:bg-background hover:text-foreground transition-colors">
                      View Project <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeInSection>
            <span className="text-sm font-medium tracking-widest uppercase text-accent">
              About
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)]">
              Intentional design, meaningful experiences.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              I&apos;m Eugene, a UI/UX designer and front-end developer based in
              Kenya. I design digital experiences that are clear, intentional,
              and easy to use.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              My work lives at the intersection of design and development, where
              structure, typography, and interaction come together to create
              thoughtful products. I&apos;m particularly interested in systems
              thinking and the kind of simplicity that comes from careful
              constraints.
            </p>

            {/* Experience */}
            <div className="mt-12">
              <h3 className="text-sm font-medium tracking-widest uppercase text-accent mb-6">
                Experience
              </h3>
              <div className="border-b border-border pb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold font-[family-name:var(--font-poppins)]">
                      Product Designer
                    </h4>
                    <p className="text-muted-foreground text-sm mt-1">
                      Designing user-centered digital products with a focus on
                      functionality, clarity, and accessibility. Working across
                      web and mobile platforms to create intuitive experiences.
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-6">
                    <span className="text-sm font-medium text-accent">
                      2025 — Present
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 Year Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/about-studio.png"
                  alt="Creative studio workspace"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-accent/20 rounded-2xl -z-10" />
            </div>
          </FadeInSection>
        </div>

        {/* What I Do grid */}
        <div className="mt-24">
          <FadeInSection>
            <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] mb-10">
              What I Do
            </h3>
          </FadeInSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Web Design",
                desc: "Creating beautiful, functional websites that deliver exceptional user experiences.",
              },
              {
                title: "Brand Identity",
                desc: "Developing cohesive visual identities that communicate brand values effectively.",
              },
              {
                title: "Development",
                desc: "Building robust, scalable web applications using modern technologies.",
              },
              {
                title: "UI/UX Design",
                desc: "Designing intuitive interfaces based on user research and best practices.",
              },
              {
                title: "Design Systems",
                desc: "Creating comprehensive design systems that ensure consistency and efficiency.",
              },
              {
                title: "Consultation",
                desc: "Providing strategic guidance on design, development, and digital transformation.",
              },
            ].map((item, i) => (
              <FadeInSection key={item.title} delay={i * 0.08}>
                <div className="group border border-border rounded-2xl p-6 transition-all duration-300 hover:bg-foreground hover:text-background cursor-default">
                  <h4 className="font-bold font-[family-name:var(--font-poppins)] group-hover:text-background">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground group-hover:text-background/70 leading-relaxed">
                    {item.desc}
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

/* ─── Skills Section ─── */

/* ── SVG Icon Components ── */
function FigmaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zM4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4zM4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4zM12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0zM20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zM12 16h4c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4v-4z" fill="currentColor"/>
    </svg>
  );
}

function SketchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 9l10 13L22 9 12 2z" fill="currentColor" opacity="0.6"/>
      <path d="M12 2L2 9h20L12 2z" fill="currentColor"/>
    </svg>
  );
}

function PrototypeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M9 3v18"/>
      <path d="M3 9h6"/>
      <path d="M3 15h6"/>
    </svg>
  );
}

function UiUxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  );
}

function DesignSystemIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  );
}

function NextjsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor"/>
      <path d="M15.5 7.5L10 17H8.5L14 7.5h1.5z" fill="currentColor"/>
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.33 10.79 14.5 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.67 7.21 14.5 6 12 6zm-5 8c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.33 18.79 9.5 20 12 20c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C11.67 15.21 10.5 14 7 14z" fill="currentColor"/>
    </svg>
  );
}

function TypescriptIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M9 8v8M6 8h6M15 13h4M17 11v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function HtmlIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

function NodejsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 22V12M12 12L3 7M12 12l9-5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function GitIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3"/>
      <circle cx="6" cy="6" r="3"/>
      <circle cx="18" cy="6" r="3"/>
      <path d="M6 9v3c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3V9"/>
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M13.5 21.3c-.4.6-1.3.3-1.3-.4L12 14l-7.5.3c-.7 0-1-.9-.4-1.3L18.5 3c.6-.4 1.3.2 1.1.9L16 14h4.5c.6 0 .9.7.5 1.2L13.5 21.3z" fill="currentColor"/>
    </svg>
  );
}

function FramerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 2h14l-7 8h7l-9 12v-8H5L12 4H5V2z" fill="currentColor"/>
    </svg>
  );
}

function WebflowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22 8.5L18 17l-4-6.5L10 17 6 8.5h2.5l1.5 3 2-5 2 5 1.5-3L18 12l2-3.5H22z" fill="currentColor"/>
    </svg>
  );
}

function VercelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 20h20L12 2z" fill="currentColor"/>
    </svg>
  );
}

function VscodeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3l-8 5-5-2v12l5-2 8 5V3z"/>
    </svg>
  );
}

function PmIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 21V9"/>
    </svg>
  );
}

function ResearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}

function StrategyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20V10"/>
      <path d="M18 20V4"/>
      <path d="M6 20v-4"/>
    </svg>
  );
}

function MotionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  );
}

function A11yIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2"/>
      <path d="M5 8l3.5 1L12 14l3.5-5L19 8"/>
      <path d="M12 14v8"/>
      <path d="M8 22h8"/>
    </svg>
  );
}

function CommIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

/* Category icon helper */
function getCategoryIcon(title: string): React.ReactNode {
  switch (title) {
    case "Design":
      return <UiUxIcon />;
    case "Frontend":
      return <ReactIcon />;
    case "Backend":
      return <NodejsIcon />;
    case "Soft Skills":
      return <CommIcon />;
    default:
      return <UiUxIcon />;
  }
}

/* Circular Progress Ring */
function CircularMeter({
  value,
  size = 72,
  strokeWidth = 4,
  delay = 0,
  gradientId,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  delay?: number;
  gradientId: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transform -rotate-90"
    >
      {/* Track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-foreground/8"
      />
      {/* Progress */}
      <motion.circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={
          isInView
            ? { strokeDashoffset: circumference - (value / 100) * circumference }
            : { strokeDashoffset: circumference }
        }
        transition={{ duration: 1.4, delay: delay * 0.08, ease: "easeOut" }}
      />
      {/* Gradient definition */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b4049" />
          <stop offset="100%" stopColor="#c4666f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Individual Skill Chip with glassmorphism */
function SkillChip({
  name,
  value,
  icon,
  index,
}: {
  name: string;
  value: number;
  icon: React.ReactNode;
  index: number;
}) {
  const gradientId = `grad-${name.replace(/\s+/g, "-").toLowerCase()}-${index}`;

  return (
    <FadeInSection delay={index * 0.04}>
      <div className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/30 dark:border-white/10 transition-all duration-300 hover:scale-[1.03] hover:bg-white/60 dark:hover:bg-white/10 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30 cursor-default">
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 pointer-events-none" />

        {/* Icon container */}
        <div className="relative shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-background/60 dark:bg-white/10 text-foreground/70 group-hover:text-accent transition-colors duration-300">
          {icon}
        </div>

        {/* Name + meter */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium truncate">{name}</span>
            <span className="text-xs font-mono text-muted-foreground/70 shrink-0">
              {value}%
            </span>
          </div>
          {/* Thin progress bar under name */}
          <div className="mt-1.5 h-1 rounded-full bg-foreground/6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${value}%` }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 1.2, delay: index * 0.06, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60"
            />
          </div>
        </div>

        {/* Circular meter */}
        <div className="shrink-0 relative">
          <CircularMeter
            value={value}
            size={44}
            strokeWidth={3}
            delay={index}
            gradientId={gradientId}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-accent">
            {value}
          </span>
        </div>
      </div>
    </FadeInSection>
  );
}

/* Category Card with glassmorphism */
function SkillCategoryCard({
  title,
  description,
  icon,
  color,
  skills,
  categoryIndex,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  skills: { name: string; value: number; icon: React.ReactNode }[];
  categoryIndex: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const displaySkills = expanded ? skills : skills.slice(0, 3);

  return (
    <FadeInSection delay={categoryIndex * 0.12}>
      <div className="relative group/card rounded-3xl overflow-hidden">
        {/* Glassmorphism card */}
        <div className="relative bg-white/30 dark:bg-white/[0.04] backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 lg:p-8 transition-all duration-500 hover:bg-white/40 dark:hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-accent/5">

          {/* Gradient accent bar at top */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color} opacity-60 group-hover/card:opacity-100 transition-opacity duration-300`}
          />

          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}
            >
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)]">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Skills list */}
          <div className="space-y-2.5">
            {displaySkills.map((skill, i) => (
              <SkillChip
                key={skill.name}
                name={skill.name}
                value={skill.value}
                icon={skill.icon}
                index={categoryIndex * 10 + i}
              />
            ))}
          </div>

          {/* Show more/less */}
          {skills.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5"
            >
              {expanded ? "Show less" : `+${skills.length - 3} more`}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={14} />
              </motion.span>
            </button>
          )}
        </div>
      </div>
    </FadeInSection>
  );
}

/* Tool badge with glassmorphism + hover glow */
function ToolBadge({
  name,
  icon,
  index,
}: {
  name: string;
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <FadeInSection delay={index * 0.03}>
      <div className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white/25 dark:bg-white/[0.04] backdrop-blur-lg border border-white/30 dark:border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/50 dark:hover:bg-white/[0.08] hover:shadow-lg hover:shadow-accent/8 hover:border-accent/30 cursor-default">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(139,64,73,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Icon */}
        <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/50 dark:bg-white/10 text-foreground/70 group-hover:text-accent transition-all duration-300 group-hover:shadow-md">
          {icon}
        </div>

        {/* Label */}
        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
          {name}
        </span>
      </div>
    </FadeInSection>
  );
}

/* Education card with glass effect */
function EducationCard({
  degree,
  school,
  year,
  desc,
  index,
}: {
  degree: string;
  school: string;
  year: string;
  desc?: string;
  index: number;
}) {
  return (
    <FadeInSection delay={index * 0.1}>
      <div className="group relative flex items-start gap-5 p-5 rounded-2xl bg-white/30 dark:bg-white/[0.04] backdrop-blur-lg border border-white/30 dark:border-white/10 transition-all duration-300 hover:bg-white/50 dark:hover:bg-white/[0.07] hover:border-accent/20">
        {/* Year badge */}
        <div className="shrink-0 px-3 py-1.5 rounded-xl bg-gradient-to-br from-accent to-accent/70 text-white text-xs font-bold self-center">
          {year}
        </div>

        <div className="min-w-0">
          <h4 className="font-bold font-[family-name:var(--font-poppins)] text-sm lg:text-base">
            {degree}
          </h4>
          <p className="text-muted-foreground text-sm mt-0.5">{school}</p>
          {desc && (
            <p className="text-muted-foreground/60 text-xs mt-1 leading-relaxed">
              {desc}
            </p>
          )}
        </div>
      </div>
    </FadeInSection>
  );
}

function SkillsSection() {
  /* ── Skill categories with icons ── */
  const skillCategories = [
    {
      title: "Design",
      description: "Crafting interfaces that delight",
      color: "from-[#8b4049] to-[#c4666f]",
      skills: [
        { name: "Figma", value: 95, icon: <FigmaIcon /> },
        { name: "Sketch", value: 85, icon: <SketchIcon /> },
        { name: "Prototyping", value: 92, icon: <PrototypeIcon /> },
        { name: "UI/UX Design", value: 95, icon: <UiUxIcon /> },
        { name: "Design Systems", value: 88, icon: <DesignSystemIcon /> },
      ],
    },
    {
      title: "Frontend",
      description: "Building performant interfaces",
      color: "from-[#5c3a2e] to-[#9b7b6a]",
      skills: [
        { name: "React", value: 93, icon: <ReactIcon /> },
        { name: "Next.js", value: 87, icon: <NextjsIcon /> },
        { name: "Tailwind CSS", value: 95, icon: <TailwindIcon /> },
        { name: "TypeScript", value: 84, icon: <TypescriptIcon /> },
        { name: "HTML/CSS", value: 96, icon: <HtmlIcon /> },
      ],
    },
    {
      title: "Backend",
      description: "Architecting reliable systems",
      color: "from-[#3d5a3e] to-[#6d9a6e]",
      skills: [
        { name: "Node.js", value: 82, icon: <NodejsIcon /> },
        { name: "Git", value: 88, icon: <GitIcon /> },
        { name: "REST APIs", value: 86, icon: <ApiIcon /> },
        { name: "Supabase", value: 78, icon: <SupabaseIcon /> },
      ],
    },
    {
      title: "Soft Skills",
      description: "Driving collaboration forward",
      color: "from-[#6b4b3a] to-[#a0785c]",
      skills: [
        { name: "Project Management", value: 85, icon: <PmIcon /> },
        { name: "User Research", value: 80, icon: <ResearchIcon /> },
        { name: "Brand Strategy", value: 78, icon: <StrategyIcon /> },
        { name: "Motion Design", value: 75, icon: <MotionIcon /> },
        { name: "Accessibility", value: 88, icon: <A11yIcon /> },
        { name: "Communication", value: 92, icon: <CommIcon /> },
      ],
    },
  ];

  const tools = [
    { name: "Figma", icon: <FigmaIcon /> },
    { name: "React", icon: <ReactIcon /> },
    { name: "Next.js", icon: <NextjsIcon /> },
    { name: "Tailwind CSS", icon: <TailwindIcon /> },
    { name: "Sketch", icon: <SketchIcon /> },
    { name: "Node.js", icon: <NodejsIcon /> },
    { name: "Git", icon: <GitIcon /> },
    { name: "Framer", icon: <FramerIcon /> },
    { name: "Webflow", icon: <WebflowIcon /> },
    { name: "Supabase", icon: <SupabaseIcon /> },
    { name: "Vercel", icon: <VercelIcon /> },
    { name: "VS Code", icon: <VscodeIcon /> },
  ];

  const education = [
    {
      degree: "Diploma in DBIT",
      school: "Riara University",
      year: "2021",
    },
    {
      degree: "Bachelor of BBIT",
      school: "Riara University",
      year: "2025",
    },
    {
      degree: "Product Design Certificate",
      school: "Moringa School",
      year: "2026",
      desc: "Comprehensive product design training and certification",
    },
  ];

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration - subtle radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[100px]" />
        <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <FadeInSection>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-accent mb-3">
              <span className="w-8 h-px bg-accent" />
              Expertise
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight">
              Skills & <span className="text-accent">Proficiency</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A comprehensive overview of my technical abilities and design
              expertise, developed through years of hands-on experience and
              continuous learning. Every skill tells a story of dedication.
            </p>
          </div>
        </FadeInSection>

        {/* Skill Category Cards */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, i) => (
            <SkillCategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={getCategoryIcon(category.title)}
              color={category.color}
              skills={category.skills}
              categoryIndex={i}
            />
          ))}
        </div>

        {/* Tools & Technologies */}
        <FadeInSection className="mt-20">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-accent mb-3">
              <span className="w-8 h-px bg-accent" />
              Toolkit
              <span className="w-8 h-px bg-accent" />
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)]">
              Tools & Technologies
            </h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {tools.map((tool, i) => (
              <ToolBadge
                key={tool.name}
                name={tool.name}
                icon={tool.icon}
                index={i}
              />
            ))}
          </div>
        </FadeInSection>

        {/* Education */}
        <FadeInSection className="mt-20">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-accent mb-3">
              <span className="w-8 h-px bg-accent" />
              Background
              <span className="w-8 h-px bg-accent" />
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)]">
              Education & Certifications
            </h3>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {education.map((edu, i) => (
              <EducationCard
                key={i}
                degree={edu.degree}
                school={edu.school}
                year={edu.year}
                desc={edu.desc}
                index={i}
              />
            ))}
          </div>
        </FadeInSection>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you within 24h.",
    });

    setFormData({ name: "", email: "", message: "" });
    setSending(false);
  };

  const contactLinks = [
    {
      label: "Phone",
      value: "0726832254",
      href: "tel:0726832254",
      icon: Phone,
    },
    {
      label: "Email",
      value: "kiharaeugene@gmail.com",
      href: "mailto:kiharaeugene@gmail.com",
      icon: Mail,
    },
    {
      label: "GitHub",
      value: "eugenekihara",
      href: "https://github.com/eugenekihara",
      icon: Github,
    },
    {
      label: "LinkedIn",
      value: "eugenekihara",
      href: "https://www.linkedin.com/in/eugenekihara",
      icon: Linkedin,
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <FadeInSection>
            <span className="text-sm font-medium tracking-widest uppercase text-accent">
              Contact
            </span>
            <h2 className="mt-3 text-5xl sm:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-poppins)] leading-[0.95]">
              Let&apos;s Work.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Open to full-time roles, freelance projects, and creative
              collaborations. Reach out — I respond within 24h.
            </p>

            <div className="mt-10 space-y-0">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center justify-between border-b border-border py-5 group hover:border-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <link.icon
                      size={18}
                      className="text-muted-foreground group-hover:text-accent transition-colors"
                    />
                    <span className="text-sm font-medium tracking-wider uppercase text-muted-foreground">
                      {link.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{link.value}</span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </a>
              ))}
            </div>
          </FadeInSection>

          {/* Right - Form */}
          <FadeInSection delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="bg-background border border-border rounded-2xl p-8 lg:p-10"
            >
              <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] mb-8">
                Send a Message
              </h3>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-secondary/50 border-border rounded-xl focus:ring-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-secondary/50 border-border rounded-xl focus:ring-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="bg-secondary/50 border-border rounded-xl focus:ring-accent resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl py-6 text-base font-medium group"
                >
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                      >
                        ◌
                      </motion.span>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <a
              href="#hero"
              className="text-xl font-bold font-[family-name:var(--font-poppins)]"
            >
              Eugene<span className="text-accent">.</span>
            </a>
            <p className="text-background/50 text-sm mt-2">
              UI/UX Designer & Developer based in Kenya
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/eugenekihara"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/eugenekihara"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:kiharaeugene@gmail.com"
              className="text-background/60 hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="tel:0726832254"
              className="text-background/60 hover:text-accent transition-colors"
              aria-label="Phone"
            >
              <Phone size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/10 text-center">
          <p className="text-background/40 text-sm">
            &copy; {new Date().getFullYear()} Eugene Kihara. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <MarqueeBanner />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <MarqueeBanner />
      <Footer />
    </main>
  );
}
