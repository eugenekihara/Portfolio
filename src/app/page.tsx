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
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
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
function SkillBar({
  label,
  value,
  delay = 0,
}: {
  label: string;
  value: number;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground font-mono">
          {value}%
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay * 0.1, ease: "easeOut" }}
          className="h-full bg-accent rounded-full"
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  const designSkills = [
    { label: "Figma", value: 95 },
    { label: "Sketch", value: 85 },
    { label: "Prototyping", value: 92 },
    { label: "UI/UX Design", value: 95 },
    { label: "Design Systems", value: 88 },
  ];

  const devSkills = [
    { label: "React", value: 93 },
    { label: "Next.js", value: 87 },
    { label: "Tailwind CSS", value: 95 },
    { label: "Node.js", value: 82 },
    { label: "Git", value: 88 },
  ];

  const otherSkills = [
    { label: "Project Management", value: 85 },
    { label: "User Research", value: 80 },
    { label: "Brand Strategy", value: 78 },
    { label: "Motion Design", value: 75 },
    { label: "Accessibility", value: 88 },
    { label: "Communication", value: 92 },
  ];

  const tools = [
    "Figma",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Sketch",
    "Node.js",
    "Git",
    "Framer",
    "Webflow",
    "Supabase",
    "Vercel",
    "VS Code",
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
    <section id="skills" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <span className="text-sm font-medium tracking-widest uppercase text-accent">
            Expertise
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-[family-name:var(--font-poppins)]">
            Skills
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            A comprehensive overview of my technical abilities and design
            expertise, developed through years of hands-on experience and
            continuous learning.
          </p>
        </FadeInSection>

        {/* Skill bars */}
        <div className="mt-16 grid md:grid-cols-3 gap-12">
          <FadeInSection>
            <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent" />
              Design
            </h3>
            <div className="space-y-5">
              {designSkills.map((skill, i) => (
                <SkillBar
                  key={skill.label}
                  label={skill.label}
                  value={skill.value}
                  delay={i}
                />
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-foreground/60" />
              Development
            </h3>
            <div className="space-y-5">
              {devSkills.map((skill, i) => (
                <SkillBar
                  key={skill.label}
                  label={skill.label}
                  value={skill.value}
                  delay={i}
                />
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-foreground/30" />
              Other
            </h3>
            <div className="space-y-5">
              {otherSkills.map((skill, i) => (
                <SkillBar
                  key={skill.label}
                  label={skill.label}
                  value={skill.value}
                  delay={i}
                />
              ))}
            </div>
          </FadeInSection>
        </div>

        {/* Tools grid */}
        <FadeInSection className="mt-20">
          <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-8">
            Tools & Technologies
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {tools.map((tool, i) => (
              <FadeInSection key={tool} delay={i * 0.05}>
                <div className="group border border-border rounded-xl p-4 text-center transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground cursor-default">
                  <span className="text-sm font-medium group-hover:text-background">
                    {tool}
                  </span>
                </div>
              </FadeInSection>
            ))}
          </div>
        </FadeInSection>

        {/* Education */}
        <FadeInSection className="mt-20">
          <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-8">
            Education & Certifications
          </h3>
          <div className="space-y-0">
            {education.map((edu, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-border py-6 last:border-b-0"
              >
                <div>
                  <h4 className="font-bold font-[family-name:var(--font-poppins)]">
                    {edu.degree}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {edu.school}
                  </p>
                  {edu.desc && (
                    <p className="text-muted-foreground/70 text-xs mt-1">
                      {edu.desc}
                    </p>
                  )}
                </div>
                <span className="text-sm font-medium text-accent mt-2 sm:mt-0 shrink-0">
                  {edu.year}
                </span>
              </div>
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
