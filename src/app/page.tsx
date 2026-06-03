"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

/* ─── Animated Section Wrapper (Refined) ─── */
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Navigation (Brutalist) ─── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "PROJECTS", href: "#projects" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background border-b-2 border-foreground"
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
                  className="text-xs tracking-[0.2em] font-bold text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
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

      {/* Mobile menu — full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-20 md:hidden"
          >
            <div className="flex flex-col items-start gap-6 pt-8 px-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-4xl font-bold font-[family-name:var(--font-poppins)] tracking-tight hover:text-accent transition-colors"
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

/* ─── Hero Section (Editorial) ─── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16 w-full">
        <div className="relative">
          {/* Top-left label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-accent font-bold mb-6">
              UI/UX Designer &amp; Developer
            </span>
          </motion.div>

          {/* Massive headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-[family-name:var(--font-poppins)] leading-[0.85] tracking-tighter"
          >
            <span className="block text-[clamp(80px,15vw,220px)] font-extrabold text-foreground">
              EUGENE
            </span>
            <span className="block text-[clamp(80px,15vw,220px)] font-extralight text-foreground/30">
              KIHARA
            </span>
          </motion.h1>

          {/* Subtitle with intentional asymmetry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 max-w-lg ml-0 lg:ml-auto lg:mr-32"
          >
            <p className="text-lg text-muted-foreground leading-[1.7]">
              Kenya-based product designer crafting thoughtful digital solutions
              where strategy meets aesthetics.
            </p>
          </motion.div>

          {/* Two CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4 ml-0 lg:ml-auto lg:mr-32"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all duration-300"
            >
              VIEW WORK
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border-2 border-foreground bg-transparent px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
            >
              GET IN TOUCH
            </a>
          </motion.div>

          {/* Decorative vertical line on the right */}
          <div className="hidden lg:block absolute right-12 top-0 bottom-0 w-px bg-foreground/10" />
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee Banner (Brutalist) ─── */
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
    <div className="bg-foreground text-background py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-lg font-bold tracking-[0.3em] flex items-center gap-8"
          >
            {item}
            <span className="text-accent text-sm">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Projects Section (Dark bg, Editorial) ─── */
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
        "A digital ecosystem bridging high-tech soil data and farm execution for African cooperatives. Translates IoT sensor data into localized voice-based tasks and cost blueprints.",
      impact: "IoT-to-action for farmers",
      techStack: ["Figma", "Adobe XD", "Wireframing", "UX Audit"],
      image: "/shamba-rahisi.png",
      href: "/projects/shamba-rahisi",
      featured: false,
    },
  ];

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

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
              href={featuredProject.href || "#"}
              className={featuredProject.href ? "" : "pointer-events-none"}
            >
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
                          {featuredProject.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-6 text-neutral-400 leading-relaxed text-sm max-w-lg">
                          {featuredProject.description}
                        </p>

                        {/* Impact badge */}
                        <div className="mt-6 inline-flex items-center gap-2 border-2 border-[#8b4049]/40 bg-[#8b4049]/10 px-4 py-2">
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
                              className="text-[11px] font-medium tracking-wider uppercase text-neutral-500 border-2 border-neutral-800 px-3 py-1.5 group-hover:border-neutral-600 group-hover:text-neutral-400 transition-colors duration-300"
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

        {/* Other Projects — Grid */}
        <div className="mt-16 lg:mt-24 grid md:grid-cols-2 gap-6 lg:gap-8">
          {otherProjects.map((project, i) => (
            <FadeInSection key={project.name} delay={i * 0.15}>
              <Link
                href={project.href || "#"}
                className={project.href ? "" : "pointer-events-none"}
              >
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
                          {project.name}
                        </h3>
                        <span className="shrink-0 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 border-2 border-neutral-700 px-2.5 py-1 mt-1">
                          {project.categoryTag}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-neutral-400 text-sm leading-relaxed flex-1">
                        {project.description}
                      </p>

                      {/* Impact */}
                      <div className="mt-5 inline-flex items-center gap-2 border-2 border-[#8b4049]/40 bg-[#8b4049]/10 px-3 py-1.5 w-fit">
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
                            className="text-[10px] font-medium tracking-wider uppercase text-neutral-500 border-2 border-neutral-800 px-2.5 py-1 group-hover:border-neutral-600 group-hover:text-neutral-400 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* CTA row */}
                      <div className="mt-6 pt-5 border-t-2 border-neutral-800 flex items-center justify-between">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 group-hover:text-[#8b4049] transition-colors duration-300">
                          {project.href ? "View Case Study" : "Coming Soon"}
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

/* ─── About Section (Two-column, Structured Facts) ─── */
function AboutSection() {
  const facts = [
    { label: "BASED IN", value: "Kenya" },
    { label: "FOCUS", value: "UI/UX Design & Development" },
    { label: "APPROACH", value: "Intentional, Systems-Driven" },
    { label: "INTEREST", value: "Motion Design, Art Direction" },
  ];

  return (
    <section id="about" className="py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Title + Bio */}
          <FadeInSection>
            <div>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent">
                About
              </span>
              <h2 className="mt-4 text-6xl sm:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-poppins)] leading-[0.85] tracking-tighter">
                ABOUT
              </h2>
              <div className="mt-8 space-y-4">
                <p className="text-muted-foreground leading-[1.7] text-base">
                  I&apos;m Eugene, a UI/UX designer and front-end developer
                  based in Kenya. I design digital experiences that are clear,
                  intentional, and easy to use.
                </p>
                <p className="text-muted-foreground leading-[1.7] text-base">
                  My work lives at the intersection of design and development,
                  where structure, typography, and interaction come together to
                  create thoughtful products. I&apos;m particularly interested
                  in systems thinking and the kind of simplicity that comes from
                  careful constraints.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Right: Key Facts */}
          <FadeInSection delay={0.2}>
            <div className="space-y-4">
              {facts.map((fact, i) => (
                <div
                  key={fact.label}
                  className="border-2 border-foreground p-6 transition-all duration-300 hover:border-accent hover:bg-accent/5"
                >
                  <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent block mb-2">
                    {fact.label}
                  </span>
                  <span className="text-xl font-bold font-[family-name:var(--font-poppins)] block">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills Section (Capabilities, Bordered Tags) ─── */
function SkillsSection() {
  const designSkills = [
    "Figma",
    "Adobe XD",
    "Wireframing",
    "Prototyping",
    "UX Research",
    "UI Design",
  ];

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "PHP", "REST APIs", "Express.js"],
    },
    {
      title: "Database",
      skills: ["MySQL", "SQL"],
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "GitHub", "VS Code", "Responsive Design", "SEO"],
    },
  ];

  return (
    <section id="skills" className="py-28 lg:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <FadeInSection>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent">
            Capabilities
          </span>
          <h2 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-poppins)] leading-[0.85] tracking-tighter">
            SKILLS
          </h2>
        </FadeInSection>

        {/* Design — Featured Category (Full-width, larger tags) */}
        <FadeInSection className="mt-16">
          <div>
            {/* Category header */}
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-poppins)]">
                Design
              </h3>
              <div className="flex-1 h-[2px] bg-accent" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent border-2 border-accent px-3 py-1">
                Core Focus
              </span>
            </div>
            {/* Skill tags — larger for Design */}
            <div className="flex flex-wrap gap-3">
              {designSkills.map((skill, i) => (
                <FadeInSection key={skill} delay={i * 0.05}>
                  <div className="border-2 border-foreground px-6 py-3 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/5 cursor-default">
                    {skill}
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Other Skill Categories */}
        <div className="mt-16 space-y-12">
          {skillCategories.map((category, i) => (
            <FadeInSection key={category.title} delay={i * 0.1}>
              <div>
                {/* Category header */}
                <div className="flex items-center gap-4 mb-5">
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)]">
                    {category.title}
                  </h3>
                  <div className="flex-1 h-px bg-accent/30" />
                </div>
                {/* Skill tags */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="border-2 border-foreground px-4 py-2 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/5 cursor-default"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Experience Section (Modern Timeline) ─── */
function ExperienceSection() {
  return (
    <section id="experience" className="py-28 lg:py-40 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <FadeInSection>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent">
            Experience
          </span>
          <h2 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-poppins)] leading-[0.85] tracking-tighter">
            WORK
          </h2>
        </FadeInSection>

        {/* Timeline */}
        <div className="mt-16 relative">
          {/* Accent vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />

          <FadeInSection delay={0.1}>
            <div className="pl-10 lg:pl-16">
              {/* Date range */}
              <span className="text-sm font-bold text-accent tracking-[0.2em] uppercase block mb-3">
                2025 — Present
              </span>

              {/* Role title */}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] tracking-tight leading-[0.9] mb-4">
                PRODUCT DESIGNER
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-[1.7] text-base max-w-2xl">
                Designing user-centered digital products with a focus on
                functionality, clarity, and accessibility. Working across web
                and mobile platforms to create intuitive experiences.
              </p>

              {/* Experience badge */}
              <div className="mt-6 inline-flex items-center gap-2 border-2 border-foreground px-4 py-2">
                <span className="w-1.5 h-1.5 bg-accent" />
                <span className="text-xs font-bold tracking-wider uppercase">
                  1 Year Experience
                </span>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section (Minimal, Bold) ─── */
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

  return (
    <section id="contact" className="py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <FadeInSection>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent">
            Contact
          </span>
          <h2 className="mt-4 text-6xl sm:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-poppins)] leading-[0.85] tracking-tighter">
            LET&apos;S WORK
          </h2>
          <p className="mt-6 text-muted-foreground leading-[1.7] text-base max-w-md">
            Have a project in mind? Let&apos;s create something meaningful
            together.
          </p>
        </FadeInSection>

        <div className="mt-16 grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <FadeInSection delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="YOUR NAME"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="border-2 border-foreground bg-transparent px-4 py-3 text-sm font-bold tracking-wider uppercase placeholder:text-muted-foreground/50 focus:border-accent"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="YOUR EMAIL"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="border-2 border-foreground bg-transparent px-4 py-3 text-sm font-bold tracking-wider uppercase placeholder:text-muted-foreground/50 focus:border-accent"
                />
              </div>
              <div>
                <Textarea
                  placeholder="YOUR MESSAGE"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  className="border-2 border-foreground bg-transparent px-4 py-3 text-sm font-bold tracking-wider uppercase placeholder:text-muted-foreground/50 focus:border-accent resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="bg-foreground text-background px-8 py-4 font-bold tracking-[0.2em] uppercase border-2 border-foreground hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
              >
                {sending ? "SENDING..." : "SEND MESSAGE"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </FadeInSection>

          {/* Social links */}
          <FadeInSection delay={0.2}>
            <div className="space-y-6 lg:pt-2">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-accent">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <a
                  href="https://github.com/eugenekihara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase border-b-2 border-foreground/30 group-hover:border-accent transition-colors">
                    GitHub
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/eugenekihara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase border-b-2 border-foreground/30 group-hover:border-accent transition-colors">
                    LinkedIn
                  </span>
                </a>
                <a
                  href="mailto:kiharaeugene@gmail.com"
                  className="group flex items-center gap-3 text-foreground hover:text-accent transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-bold tracking-wider uppercase border-b-2 border-foreground/30 group-hover:border-accent transition-colors">
                    Email
                  </span>
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t-2 border-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#hero"
            className="text-xl font-bold tracking-tight font-[family-name:var(--font-poppins)]"
          >
            Eugene<span className="text-accent">.</span>
          </a>

          {/* Center text */}
          <p className="text-sm text-muted-foreground">
            Designed &amp; Built by Eugene Kihara
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/eugenekihara"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/eugenekihara"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <MarqueeBanner />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
