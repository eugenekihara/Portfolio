"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

/* ─── Fade-in Wrapper ─── */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Footer Marquee ─── */
function FooterMarquee() {
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

/* ─── SchooPata Project Page ─── */
export default function SchoolpataPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-background border-b-2 border-foreground"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              href="/#projects"
              className="text-xl font-bold tracking-tight font-[family-name:var(--font-poppins)]"
            >
              Eugene<span className="text-accent">.</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-xs tracking-[0.2em] font-bold text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                HOME
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/#projects"
                className="text-xs tracking-[0.2em] font-bold text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                PROJECTS
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/#about"
                className="text-xs tracking-[0.2em] font-bold text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                ABOUT
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/#contact"
                className="text-xs tracking-[0.2em] font-bold text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                CONTACT
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Back Link */}
      <FadeIn delay={0.1}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-bold tracking-[0.15em] uppercase text-xs text-muted-foreground hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO PROJECTS
          </Link>
        </div>
      </FadeIn>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-24">
        {/* Hero Title */}
        <FadeIn delay={0.2}>
          <div className="pt-4 pb-8">
            <h1 className="text-7xl sm:text-8xl lg:text-[128px] font-bold leading-[0.85] tracking-tight font-[family-name:var(--font-poppins)]">
              <span className="text-foreground">SCHOOL</span>
              <span className="text-[#0B3A66]">PATA</span>
            </h1>
          </div>
        </FadeIn>

        {/* Project Metadata Bar */}
        <FadeIn delay={0.3}>
          <div className="grid grid-cols-2 lg:grid-cols-4 border-2 border-foreground overflow-hidden">
            {[
              { label: "Client", value: "School Project", dark: false },
              { label: "Role", value: "App Design", dark: false },
              { label: "Timeline", value: "2025", dark: true },
              { label: "Platform", value: "iOS / Android", dark: true },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`relative px-6 py-5 ${
                  item.dark
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground"
                } ${i < 3 ? "border-r-2 border-foreground" : ""}`}
              >
                <p
                  className={`text-xs tracking-[0.2em] uppercase mb-1 font-bold ${
                    item.dark
                      ? "text-background/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </p>
                <p
                  className={`font-bold font-[family-name:var(--font-poppins)] text-lg ${
                    item.dark ? "text-background" : "text-foreground"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Two-Column Layout: Mockup + Description */}
        <div className="mt-10 grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Phone Mockup */}
          <FadeIn delay={0.4}>
            <div className="border-2 border-foreground overflow-hidden bg-[#0B3A66]">
              <img
                src="/schoolpata.png"
                alt="SchooPata App Design"
                className="w-full h-auto object-cover"
              />
            </div>
          </FadeIn>

          {/* Right: Description */}
          <FadeIn delay={0.5}>
            <div className="space-y-8">
              {/* Problem */}
              <div className="border-2 border-foreground p-8">
                <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-[#0B3A66] mb-4">
                  The Problem
                </h3>
                <p className="text-foreground/80 leading-[1.7] text-base">
                  Parents in Kenya face significant challenges when searching for
                  the right school for their children. Information is fragmented
                  across multiple sources, comparison between schools is manual
                  and time-consuming, and critical details about curriculum,
                  facilities, and performance are often inaccessible or outdated.
                  This lack of centralized, reliable data makes an already
                  stressful decision even harder.
                </p>
              </div>

              {/* Solution */}
              <div className="border-2 border-foreground p-8">
                <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-[#0B3A66] mb-4">
                  The Solution
                </h3>
                <p className="text-foreground/80 leading-[1.7] text-base">
                  <span className="font-bold font-[family-name:var(--font-poppins)]">
                    SchooPata
                  </span>{" "}
                  is a mobile platform that helps parents find the perfect school
                  for their child by centralizing all relevant information in one
                  place. The app provides detailed school profiles with ratings,
                  curriculum details, and location data. Key features like a
                  side-by-side compare tool and a saved schools list help parents
                  make informed decisions efficiently, turning a daunting search
                  into a streamlined experience.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Color Palette Section */}
        <FadeIn delay={0.6}>
          <div className="mt-16 flex flex-col lg:flex-row gap-8 items-start">
            {/* Color Palette Card */}
            <div className="lg:ml-auto bg-foreground p-8 border-2 border-foreground w-full lg:w-[480px]">
              <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-background mb-6">
                Color Palette
              </h3>
              <div className="space-y-0">
                {[
                  {
                    name: "BLUE HORIZON",
                    hex: "#0B3A66",
                    color: "#0B3A66",
                  },
                  { name: "DIM GRAY", hex: "#696969", color: "#696969" },
                  { name: "BLACK", hex: "#000000", color: "#000000" },
                ].map((item, i) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 border-2 border-white/20"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-background font-bold text-base">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-background/60 text-sm font-mono">
                        {item.hex}
                      </span>
                    </div>
                    {i < 2 && <div className="h-px bg-white/20" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Next Project */}
        <FadeIn delay={0.7}>
          <div className="mt-20 flex justify-start">
            <Link
              href="/projects/shamba-rahisi"
              className="group inline-flex items-center gap-4 px-8 py-5 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <span className="font-bold tracking-[0.2em] uppercase text-sm">
                Next Project
              </span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Footer Marquee */}
      <FooterMarquee />
    </div>
  );
}
