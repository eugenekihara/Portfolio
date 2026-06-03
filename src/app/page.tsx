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

/* ─── Projects Section — Brutalist Editorial ─── */
function ProjectsSection() {
  const projects = [
    {
      name: "WAVEEATZ",
      category: "UI/UX Design",
      categoryTag: "Product Design",
      description:
        "A food delivery mobile app reimagining the ordering experience with bold visuals and frictionless flows. Designed to increase user retention by 40% through intuitive navigation and reduced checkout steps.",
      impact: "40% retention increase",
      techStack: ["Figma", "Prototyping", "UX Research", "UI Design"],
      image: "/waveeatz.png",
      href: "/projects/waveeatz",
      featured: true,
    },
    {
      name: "SchooPata",
      category: "Product Design",
      categoryTag: "App Design",
      description:
        "A mobile platform helping parents find the perfect school for their child. Centralizes school information, ratings, and comparison tools to simplify a complex decision-making process.",
      impact: "Streamlined school search",
      techStack: ["Figma", "Prototyping", "UX Research", "UI Design"],
      image: "/schoolpata.png",
      href: "/projects/schoolpata",
      featured: false,
    },
    {
      name: "Shamba Rahisi",
      category: "Product Design",
      categoryTag: "AgriTech",
      description:
        "An agritech solution empowering smallholder farmers with real-time market data, weather insights, and direct buyer connections. Designed for low-bandwidth rural environments.",
      impact: "500+ farmers onboarded",
      techStack: ["Figma", "Adobe XD", "Wireframing", "UX Audit"],
      image: "/shamba-rahisi.png",
      href: null,
      featured: false,
    },
  ];

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 lg:py-40 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Section Header ── */}
        <FadeInSection>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 lg:mb-24">
            <div>
              <span className="text-sm font-medium tracking-[0.3em] uppercase text-[#8b4049]">
                Selected Work
              </span>
              <h2 className="mt-4 text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold font-[family-name:var(--font-poppins)] leading-[0.85] tracking-tighter">
                Projects
              </h2>
            </div>
            <p className="text-neutral-400 max-w-sm text-sm leading-relaxed sm:text-right sm:pb-2">
              Each project is a case study — not just a screenshot. Strategy, design, and outcome fused into one narrative.
            </p>
          </div>
        </FadeInSection>

        {/* ── Decorative rule ── */}
        <FadeInSection>
          <div className="h-px bg-gradient-to-r from-[#8b4049] via-neutral-700 to-transparent mb-16 lg:mb-24" />
        </FadeInSection>

        {/* ── Featured Project — Full-width Editorial Block ── */}
        {featuredProject && (
          <FadeInSection>
            <Link href={featuredProject.href || "#"} className={featuredProject.href ? "" : "pointer-events-none"}>
              <div className="group relative cursor-pointer">
                {/* Outer border frame */}
                <div className="border-2 border-neutral-700 group-hover:border-[#8b4049] transition-colors duration-500">
                  {/* Inner content */}
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left — Image */}
                    <div className="relative overflow-hidden bg-neutral-900 aspect-[4/3] lg:aspect-auto">
                      <img
                        src={featuredProject.image}
                        alt={featuredProject.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      {/* Category overlay chip */}
                      <div className="absolute top-6 left-6 bg-[#0a0a0a] border border-neutral-600 px-3 py-1.5">
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
                          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-500 border border-neutral-700 px-3 py-1.5">
                            {featuredProject.categoryTag}
                          </span>
                        </div>

                        {/* Project name */}
                        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] tracking-tight leading-[0.9]">
                          {featuredProject.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-6 text-neutral-400 leading-relaxed text-sm max-w-lg">
                          {featuredProject.description}
                        </p>

                        {/* Impact badge */}
                        <div className="mt-6 inline-flex items-center gap-2 border border-[#8b4049]/40 bg-[#8b4049]/10 px-4 py-2">
                          <span className="w-1.5 h-1.5 bg-[#8b4049]" />
                          <span className="text-[#8b4049] text-xs font-bold tracking-wider uppercase">
                            {featuredProject.impact}
                          </span>
                        </div>
                      </div>

                      {/* Bottom — Tech stack + CTA */}
                      <div className="mt-10">
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {featuredProject.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-medium tracking-wider uppercase text-neutral-500 border border-neutral-800 px-3 py-1.5 group-hover:border-neutral-600 group-hover:text-neutral-400 transition-colors duration-300"
                            >
                              {tech}
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

        {/* ── Other Projects — Asymmetrical Grid ── */}
        <div className="mt-16 lg:mt-24 grid md:grid-cols-2 gap-6 lg:gap-8">
          {otherProjects.map((project, i) => (
            <FadeInSection key={project.name} delay={i * 0.15}>
              <Link href={project.href || "#"} className={project.href ? "" : "pointer-events-none"}>
                <div className="group cursor-pointer h-full">
                  {/* Card outer border */}
                  <div className="border-2 border-neutral-700 group-hover:border-[#8b4049] transition-colors duration-500 h-full flex flex-col">
                    {/* Image area */}
                    <div className="relative overflow-hidden bg-neutral-900 aspect-[16/10]">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      {/* Category chip */}
                      <div className="absolute top-5 left-5 bg-[#0a0a0a] border border-neutral-600 px-3 py-1.5">
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
                          {project.name}
                        </h3>
                        <span className="shrink-0 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 border border-neutral-700 px-2.5 py-1 mt-1">
                          {project.categoryTag}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-neutral-400 text-sm leading-relaxed flex-1">
                        {project.description}
                      </p>

                      {/* Impact */}
                      <div className="mt-5 inline-flex items-center gap-2 border border-[#8b4049]/40 bg-[#8b4049]/10 px-3 py-1.5 w-fit">
                        <span className="w-1.5 h-1.5 bg-[#8b4049]" />
                        <span className="text-[#8b4049] text-[11px] font-bold tracking-wider uppercase">
                          {project.impact}
                        </span>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mt-5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-medium tracking-wider uppercase text-neutral-500 border border-neutral-800 px-2.5 py-1 group-hover:border-neutral-600 group-hover:text-neutral-400 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA row */}
                      <div className="mt-6 pt-5 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 group-hover:text-[#8b4049] transition-colors duration-300">
                          {project.href ? "View Case Study" : "Coming Soon"}
                        </span>
                        <div className="w-8 h-8 border border-neutral-600 flex items-center justify-center group-hover:border-[#8b4049] group-hover:bg-[#8b4049] group-hover:text-white transition-all duration-300">
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

        {/* ── Bottom rule ── */}
        <FadeInSection className="mt-16 lg:mt-24">
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-[#8b4049]" />
        </FadeInSection>
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
function Html5Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 2l1.8 20L12 24l6.2-2L20 2H4zm12.4 6H8.6l.3 3h7.2l-.7 7.5L12 19.5l-3.4-1-.2-2.5h2.5l.1 1.2 1 .3 1-.3.3-3.2H8L7.4 6h9.2l-.2 2z" fill="currentColor"/>
    </svg>
  );
}

function Css3Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 2l1.8 20L12 24l6.2-2L20 2H4zm12.6 6H8.5l.2 2.5h7.2l-.6 6.5-3.5 1-3.5-1-.2-2.8h2.5l.1 1.4.9.3.9-.3.1-1.6H8L7.5 6h9.4l-.3 2z" fill="currentColor"/>
    </svg>
  );
}

function JavascriptIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor"/>
      <path d="M15 17.5c.8 1 1.8 1.5 3 1.5 1.5 0 2.5-.8 2.5-2 0-1.2-.8-1.8-2.3-2.4l-.5-.2c-2-.9-3.2-2-3.2-4 0-2.2 1.7-3.9 4.2-3.9 1.7 0 2.8.5 3.7 2l-2 1.3c-.5-.8-1-1.1-1.7-1.1-1 0-1.5.6-1.5 1.3 0 .9.5 1.3 2 1.9l.5.2c2.4 1 3.5 2.1 3.5 4.2 0 2.5-1.8 3.7-4.5 3.7-2.2 0-3.8-.9-4.7-2.5l2.2-1.3zM8.5 17.8c.5.8 1 1.5 2 1.5.9 0 1.5-.4 1.5-1.8V6h3v11.5c0 3-1.7 4.5-4.2 4.5-2.3 0-3.5-1.2-4.3-2.8l2-1.5z" fill="white"/>
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.3" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.3" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  );
}

function NextjsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor"/>
      <path d="M15.5 7.5L10 17H8.5L14 7.5h1.5z" fill="white"/>
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C13.33 10.79 14.5 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.67 7.21 14.5 6 12 6zm-5 8c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.33 18.79 9.5 20 12 20c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C11.67 15.21 10.5 14 7 14z" fill="currentColor"/>
    </svg>
  );
}

function NodejsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 22V12M12 12L3 7M12 12l9-5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function PhpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="6" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <text x="12" y="15" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="bold" fontFamily="sans-serif">PHP</text>
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}

function ExpressIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <text x="12" y="15" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="bold" fontFamily="monospace">ex</text>
    </svg>
  );
}

function MysqlIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    </svg>
  );
}

function SqlIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zM4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4zM4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4zM12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0zM20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4zM12 16h4c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4v-4z" fill="currentColor"/>
    </svg>
  );
}

function AdobeXdIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <text x="12" y="15" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Xd</text>
    </svg>
  );
}

function WireframeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 9v12"/>
    </svg>
  );
}

function PrototypeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );
}

function UxResearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}

function UiDesignIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  );
}

function GitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="18" r="3"/>
      <circle cx="6" cy="6" r="3"/>
      <circle cx="18" cy="6" r="3"/>
      <path d="M6 9v3c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3V9"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
    </svg>
  );
}

function NotionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <path d="M8 7h8M8 12h8M8 17h5"/>
    </svg>
  );
}

function TrelloIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="6" y="6" width="5" height="12" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="13" y="6" width="5" height="8" rx="1" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" fill="currentColor"/>
    </svg>
  );
}

function GeminiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2c1.5 4 4 6.5 8 8-4 1.5-6.5 4-8 8-1.5-4-4-6.5-8-8 4-1.5 6.5-4 8-8z" fill="currentColor"/>
    </svg>
  );
}

function CopilotIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a8 8 0 0 0-8 8v2l-1 4h2l1-1v1a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-1l1 1h2l-1-4v-2a8 8 0 0 0-8-8z"/>
      <circle cx="9" cy="11" r="1" fill="currentColor"/>
      <circle cx="15" cy="11" r="1" fill="currentColor"/>
    </svg>
  );
}

function ZaiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 4h18l-7 8h7l-11 12 3-8H4l7-8H3V4z" fill="currentColor"/>
    </svg>
  );
}

function VscodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3l-8 5-5-2v12l5-2 8 5V3z"/>
    </svg>
  );
}

/* Category icon helper */
function getCategoryIcon(title: string): React.ReactNode {
  switch (title) {
    case "Frontend":
      return <ReactIcon />;
    case "Backend":
      return <NodejsIcon />;
    case "Database":
      return <MysqlIcon />;
    case "Design":
      return <FigmaIcon />;
    case "Tools & Technologies":
      return <GitIcon />;
    default:
      return <UiDesignIcon />;
  }
}

/* Skill Tile — clean interactive badge with icon, no percentages */
function SkillTile({ name, icon, index, featured = false }: { name: string; icon: React.ReactNode; index: number; featured?: boolean }) {
  if (featured) {
    return (
      <FadeInSection delay={index * 0.04}>
        <div className="group relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white/50 dark:bg-white/[0.08] backdrop-blur-md border border-white/40 dark:border-white/[0.1] transition-all duration-300 hover:scale-[1.05] hover:bg-white/80 dark:hover:bg-white/[0.15] hover:shadow-xl hover:shadow-accent/10 hover:border-accent/40 cursor-default">
          {/* Hover glow ring */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/8 via-transparent to-accent/8 pointer-events-none" />

          {/* Icon */}
          <div className="relative shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 text-accent transition-all duration-300 group-hover:from-accent/20 group-hover:to-accent/10 group-hover:shadow-lg group-hover:shadow-accent/20">
            {icon}
          </div>

          {/* Name */}
          <span className="relative text-sm font-semibold text-center leading-tight">{name}</span>
        </div>
      </FadeInSection>
    );
  }

  return (
    <FadeInSection delay={index * 0.03}>
      <div className="group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/40 dark:bg-white/[0.06] backdrop-blur-md border border-white/30 dark:border-white/[0.08] transition-all duration-300 hover:scale-[1.04] hover:bg-white/70 dark:hover:bg-white/[0.12] hover:shadow-lg hover:shadow-accent/8 hover:border-accent/30 cursor-default">
        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 pointer-events-none" />

        {/* Icon */}
        <div className="relative shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-white/60 dark:bg-white/[0.08] text-foreground/60 group-hover:text-accent transition-all duration-300 group-hover:bg-accent/10">
          {icon}
        </div>

        {/* Name */}
        <span className="relative text-sm font-medium">{name}</span>
      </div>
    </FadeInSection>
  );
}

/* Featured Design Category Block — hero-style with gradient backdrop */
function FeaturedDesignBlock({
  title,
  description,
  color,
  skills,
  categoryIndex,
}: {
  title: string;
  description: string;
  color: string;
  skills: { name: string; icon: React.ReactNode }[];
  categoryIndex: number;
}) {
  return (
    <FadeInSection delay={categoryIndex * 0.1}>
      <div className="relative rounded-3xl overflow-hidden">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-accent/[0.02] to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,64,73,0.08),transparent_60%)] pointer-events-none" />

        {/* Decorative floating shapes */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent/[0.06] blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-accent/[0.04] blur-2xl pointer-events-none" />

        <div className="relative p-6 sm:p-8 lg:p-10 border border-accent/10 rounded-3xl backdrop-blur-sm">
          {/* Category header */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg shadow-accent/20`}>
              <FigmaIcon />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-poppins)]">{title}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                  Core Focus
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{description}</p>
            </div>
          </div>

          {/* Featured skill tiles - 3 cols on desktop, 2 on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {skills.map((skill, i) => (
              <SkillTile
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                index={categoryIndex * 10 + i}
                featured
              />
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}

/* Category Block — standard layout for non-featured categories */
function SkillCategoryBlock({
  title,
  description,
  color,
  skills,
  categoryIndex,
}: {
  title: string;
  description: string;
  color: string;
  skills: { name: string; icon: React.ReactNode }[];
  categoryIndex: number;
}) {
  return (
    <FadeInSection delay={categoryIndex * 0.1}>
      <div>
        {/* Category header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-md`}>
            {getCategoryIcon(title)}
          </div>
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)]">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>

        {/* Skill tiles grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {skills.map((skill, i) => (
            <SkillTile
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              index={categoryIndex * 10 + i}
            />
          ))}
        </div>
      </div>
    </FadeInSection>
  );
}

/* Education card */
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
      <div className="group relative flex items-start gap-5 p-5 rounded-2xl bg-white/30 dark:bg-white/[0.04] backdrop-blur-lg border border-white/30 dark:border-white/[0.08] transition-all duration-300 hover:bg-white/50 dark:hover:bg-white/[0.07] hover:border-accent/20">
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
  // Design category is first & featured
  const designCategory = {
    title: "Design",
    description: "Crafting intuitive and delightful user experiences — the core of everything I do",
    color: "from-[#8b4049] to-[#c4666f]",
    skills: [
      { name: "Figma", icon: <FigmaIcon /> },
      { name: "Adobe XD", icon: <AdobeXdIcon /> },
      { name: "Wireframing", icon: <WireframeIcon /> },
      { name: "Prototyping", icon: <PrototypeIcon /> },
      { name: "UX Research", icon: <UxResearchIcon /> },
      { name: "UI Design", icon: <UiDesignIcon /> },
    ],
  };

  const skillCategories = [
    {
      title: "Frontend",
      description: "Building modern, responsive interfaces",
      color: "from-[#8b4049] to-[#c4666f]",
      skills: [
        { name: "HTML5", icon: <Html5Icon /> },
        { name: "CSS3", icon: <Css3Icon /> },
        { name: "JavaScript", icon: <JavascriptIcon /> },
        { name: "React", icon: <ReactIcon /> },
        { name: "Next.js", icon: <NextjsIcon /> },
        { name: "Tailwind CSS", icon: <TailwindIcon /> },
      ],
    },
    {
      title: "Backend",
      description: "Architecting reliable server-side systems",
      color: "from-[#5c3a2e] to-[#9b7b6a]",
      skills: [
        { name: "Node.js", icon: <NodejsIcon /> },
        { name: "PHP", icon: <PhpIcon /> },
        { name: "REST APIs", icon: <ApiIcon /> },
        { name: "Express.js", icon: <ExpressIcon /> },
      ],
    },
    {
      title: "Database",
      description: "Managing and querying data efficiently",
      color: "from-[#3d5a3e] to-[#6d9a6e]",
      skills: [
        { name: "MySQL", icon: <MysqlIcon /> },
        { name: "SQL", icon: <SqlIcon /> },
      ],
    },
    {
      title: "Tools & Technologies",
      description: "Streamlining development and collaboration",
      color: "from-[#6b4b3a] to-[#a0785c]",
      skills: [
        { name: "Git", icon: <GitIcon /> },
        { name: "GitHub", icon: <GithubIcon /> },
        { name: "Notion", icon: <NotionIcon /> },
        { name: "Trello", icon: <TrelloIcon /> },
        { name: "Claude", icon: <ClaudeIcon /> },
        { name: "Gemini", icon: <GeminiIcon /> },
        { name: "GitHub Copilot", icon: <CopilotIcon /> },
        { name: "VS Code", icon: <VscodeIcon /> },
        { name: "Z AI", icon: <ZaiIcon /> },
      ],
    },
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
      {/* Background decoration */}
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
              Tech Stack
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight">
              Skills & <span className="text-accent">Technologies</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The tools and technologies I use daily to design, build, and ship
              digital products. Focused on what I work with — not arbitrary numbers.
            </p>
          </div>
        </FadeInSection>

        {/* Design — Featured Category */}
        <div className="mt-16">
          <FeaturedDesignBlock
            title={designCategory.title}
            description={designCategory.description}
            color={designCategory.color}
            skills={designCategory.skills}
            categoryIndex={0}
          />
        </div>

        {/* Other Skill Categories */}
        <div className="mt-14 space-y-12">
          {skillCategories.map((category, i) => (
            <SkillCategoryBlock
              key={category.title}
              title={category.title}
              description={category.description}
              color={category.color}
              skills={category.skills}
              categoryIndex={i + 1}
            />
          ))}
        </div>

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
