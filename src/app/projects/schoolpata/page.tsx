"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
  Star,
  Heart,
  GitCompareArrows,
  MapPin,
  Filter,
  School,
  GraduationCap,
  CheckCircle2,
  ChevronRight,
  Users,
  Clock,
  BookOpen,
  Send,
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
  ScaleIn,
} from "@/components/scroll-animations";

/* ─── Theme Constants ─── */
const PRIMARY = "#0B3A66";
const PRIMARY_LIGHT = "#1A5C9E";
const ACCENT = "#4A90D9";

/* ─── Phone Frame Wrapper ─── */
function PhoneFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ maxWidth: "320px" }}
    >
      <div className="relative rounded-[2.5rem] overflow-hidden border-[6px] border-gray-800 bg-gray-800 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-800 rounded-b-2xl z-10" />
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover rounded-[2rem]"
        />
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
          className={`text-xs font-bold tracking-[0.3em] uppercase mb-3 ${
            light ? "text-[#4A90D9]" : `text-[${ACCENT}]`
          }`}
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
  light = false,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  light?: boolean;
}) {
  return (
    <div
      className={`p-6 lg:p-8 rounded-2xl ${
        light
          ? "bg-white/10 border border-white/10"
          : "bg-secondary/50 border border-foreground/5"
      }`}
    >
      <Icon
        className={`w-6 h-6 mb-4 ${light ? "text-[#4A90D9]" : "text-accent"}`}
      />
      <p
        className={`text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-2 ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {value}
      </p>
      <p
        className={`text-sm leading-relaxed ${
          light ? "text-white/60" : "text-muted-foreground"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

/* ─── User Flow Step ─── */
function FlowStep({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: number;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center relative">
      <div className="relative z-10">
        <div
          className="w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center border-2 shadow-lg"
          style={{
            backgroundColor: PRIMARY,
            borderColor: `${ACCENT}50`,
          }}
        >
          <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-[#4A90D9]" />
        </div>
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
          {number}
        </span>
      </div>
      <h4 className="mt-5 text-sm lg:text-base font-bold font-[family-name:var(--font-poppins)] text-foreground">
        {title}
      </h4>
      <p className="mt-2 text-xs lg:text-sm text-muted-foreground leading-relaxed max-w-[180px]">
        {description}
      </p>
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
        <p
          className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
          style={{ color: PRIMARY }}
        >
          Purpose
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {purpose}
        </p>
      </div>
      <div>
        <p
          className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
          style={{ color: PRIMARY }}
        >
          UX Rationale
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {rationale}
        </p>
      </div>
    </div>
  );
}

/* ─── Screen Showcase Item ─── */
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
          <ScreenTextContent
            title={title}
            purpose={purpose}
            rationale={rationale}
          />
        </ScrollRevealRight>
        <ScrollRevealLeft>
          <PhoneFrame src={src} alt={alt} />
        </ScrollRevealLeft>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <ScrollRevealLeft>
        <PhoneFrame src={src} alt={alt} />
      </ScrollRevealLeft>
      <ScrollRevealRight>
        <ScreenTextContent
          title={title}
          purpose={purpose}
          rationale={rationale}
        />
      </ScrollRevealRight>
    </div>
  );
}

/* ─── Color Swatch ─── */
function ColorSwatch({
  color,
  name,
  hex,
}: {
  color: string;
  name: string;
  hex: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
      <div
        className="w-14 h-14 rounded-xl border border-white/10 flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="text-white font-medium text-sm">{name}</p>
        <p className="text-white/50 text-xs font-mono">{hex}</p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   SCHOOLPATA Case Study Page
   ──────────────────────────────────────────── */
export default function SchoolpataPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── 1. Sticky Navigation ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight font-[family-name:var(--font-poppins)]"
            >
              Eugene<span className="text-accent">.</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {["Home", "Projects", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full bg-foreground/5 hover:bg-foreground/10 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── 2. Hero Section ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: PRIMARY }}>
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#1A5C9E]/30 blur-3xl" />
          <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-[#1A5C9E]/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4A90D9]/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Title + Metadata */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h1 className="text-7xl sm:text-8xl lg:text-[128px] font-bold leading-[0.85] tracking-tight font-[family-name:var(--font-poppins)]">
                  <span className="text-white">SCHOOL</span>
                  <br />
                  <span className="text-[#4A90D9]">PATA</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {[
                  { label: "Category", value: "UI/UX Design" },
                  { label: "Role", value: "Product Designer" },
                  { label: "Timeline", value: "2025" },
                  { label: "Platform", value: "iOS / Android" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-4 py-2 rounded-full border border-white/15 bg-white/5"
                  >
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#4A90D9]">
                      {item.label}:{" "}
                    </span>
                    <span className="text-sm font-medium text-white/90">
                      {item.value}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-8 text-white/60 text-base lg:text-lg leading-relaxed max-w-lg"
              >
                A mobile platform designed to simplify the school selection
                process for parents in Kenya&mdash;centralizing school
                discovery, comparison, and informed decision-making in one
                intuitive app.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="mt-8"
              >
                <MagneticHover>
                  <a
                    href="#overview"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full font-semibold text-sm hover:bg-white/90 transition-colors duration-300"
                    style={{ color: PRIMARY }}
                  >
                    Read Full Case Study
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </MagneticHover>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-16 hidden lg:flex items-center gap-3 text-white/30"
              >
                <div className="w-px h-12 bg-white/20" />
                <span className="text-xs tracking-[0.2em] uppercase">
                  Scroll
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <Parallax speed={-0.08}>
                <PhoneFrame
                  src="/schoolpata/screen-home.png"
                  alt="SchooPata home screen with search and top rated schools"
                  className="w-[260px] lg:w-[300px]"
                />
              </Parallax>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Project Overview ── */}
      <section id="overview" className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading label="Overview" title="What is School Pata?" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="text-foreground/80 text-base lg:text-lg leading-[1.8]">
                  <span className="font-bold font-[family-name:var(--font-poppins)] text-foreground">
                    School Pata
                  </span>{" "}
                  is a mobile application designed to simplify the school
                  selection process for parents across Kenya. Instead of
                  visiting schools individually or relying on scattered,
                  outdated information, parents can search, discover, compare,
                  and save schools directly from their mobile devices.
                </p>
                <p className="text-foreground/70 text-base leading-[1.8]">
                  The platform centralizes important school
                  information&mdash;curriculum details, ratings, fees,
                  facilities, and location data&mdash;making it easier for
                  parents to evaluate different options and make informed
                  enrollment decisions. By combining school discovery,
                  comparison tools, ratings, and personalized collections,
                  School Pata transforms what is often a stressful and
                  time-consuming process into a streamlined digital experience.
                </p>
                <p className="text-foreground/70 text-base leading-[1.8]">
                  The app was designed with the Kenyan educational landscape in
                  mind, supporting multiple curricula including CBC, 8-4-4,
                  British, and American systems. Whether a parent is looking
                  for a day school in Nairobi or a boarding school in Mombasa,
                  School Pata puts all the relevant data at their fingertips.
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealRight>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-foreground/5">
                <img
                  src="/schoolpata/screen-search-discovery.png"
                  alt="SchooPata search and discovery screen showing school categories"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      {/* ── 4. Problem Statement ── */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionHeading
                label="The Problem"
                title="Finding the right school is overwhelming"
              />
              <ScrollReveal delay={0.2}>
                <div className="space-y-5">
                  <p className="text-foreground/80 text-base leading-[1.8]">
                    For many parents in Kenya, choosing the right school for
                    their child is one of the most important decisions
                    they&apos;ll make&mdash;yet the process is fragmented,
                    opaque, and deeply frustrating. Information about schools
                    is scattered across websites, social media groups, word of
                    mouth, and physical brochures, with no single source of
                    truth.
                  </p>
                  <p className="text-foreground/70 text-base leading-[1.8]">
                    Parents often find themselves visiting multiple schools
                    physically, spending entire days traveling between campuses
                    only to discover that a school doesn&apos;t meet their
                    criteria. Comparing schools means manually juggling
                    brochures, phone calls, and conflicting online reviews.
                    Schools that seemed promising during a visit are easily
                    forgotten when it&apos;s time to make the final decision.
                  </p>
                  <p className="text-foreground/70 text-base leading-[1.8]">
                    There is no centralized platform that aggregates school
                    data, provides reliable ratings, or enables side-by-side
                    comparison. This lack of digital infrastructure turns an
                    already emotional decision into a logistical nightmare,
                    especially for busy working parents who cannot afford to
                    spend weeks researching options.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div>
              <StaggerReveal
                className="grid grid-cols-2 gap-4 lg:gap-6"
                stagger={0.15}
              >
                <StatCard
                  icon={MapPin}
                  value="5–10"
                  label="Schools parents visit on average before deciding"
                />
                <StatCard
                  icon={Clock}
                  value="Weeks"
                  label="Time spent researching and comparing schools manually"
                />
                <StatCard
                  icon={Search}
                  value="0"
                  label="Centralized platforms for Kenyan school discovery"
                />
                <StatCard
                  icon={Users}
                  value="60%+"
                  label="Of parents report the school search process as stressful"
                />
              </StaggerReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Design Challenge ── */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: ACCENT }}
              >
                The Challenge
              </p>
            </ScrollReveal>
            <SplitTextReveal
              text="Simplifying a complex decision into an intuitive mobile experience"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-foreground max-w-4xl mx-auto"
            />
          </div>

          <StaggerReveal
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
            stagger={0.15}
          >
            <div className="p-8 lg:p-10 rounded-2xl text-white" style={{ backgroundColor: PRIMARY }}>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-[#4A90D9]" />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-4">
                Information Architecture
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Schools have dozens of relevant data points&mdash;curriculum
                type, fee structure, facilities, location, ratings, student
                population, and more. The challenge was organizing this dense
                information into a hierarchy that parents can navigate
                intuitively without feeling overwhelmed. Each school profile
                needed to surface the most decision-critical information first
                while keeping deeper details accessible.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl text-white" style={{ backgroundColor: PRIMARY }}>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <GitCompareArrows className="w-6 h-6 text-[#4A90D9]" />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-4">
                Comparison Complexity
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Enabling parents to compare up to three schools side-by-side
                required careful data visualization. Different metrics
                (ratings, fees, curriculum, facilities) needed to be presented
                in a way that makes differences immediately apparent. The
                comparison view had to be scannable on mobile screens without
                excessive scrolling or cognitive overload.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl text-white" style={{ backgroundColor: PRIMARY }}>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-[#4A90D9]" />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-4">
                Trust & Simplicity
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Parents needed to trust the information presented&mdash;ratings,
                reviews, and school data must feel authoritative and current.
                At the same time, the interface had to remain simple enough for
                users who may not be digitally savvy. Every interaction was
                designed to reduce friction, from one-tap saving to smart
                search suggestions that anticipate what parents are looking for.
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 6. Research & Insights ── */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Research"
            title="Insights that shaped the design"
          />

          <StaggerReveal
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            stagger={0.1}
          >
            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div
                className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3"
                style={{ color: PRIMARY }}
              >
                01
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Curriculum is the First Filter
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Parents almost always begin their school search with curriculum
                type&mdash;CBC, 8-4-4, British, or American. This is the
                non-negotiable starting point that determines the pool of
                candidate schools. The search experience was designed to make
                curriculum selection prominent and immediate, reducing the
                cognitive load of filtering through irrelevant results.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div
                className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3"
                style={{ color: PRIMARY }}
              >
                02
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Ratings Drive Trust
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Community ratings and reviews are among the most trusted
                signals for parents evaluating schools. A 4.8-star rating from
                over 100 reviews carries more weight than any marketing
                brochure. This insight led to prominently displaying ratings on
                every school card and dedicating a &ldquo;Top Rated&rdquo;
                section on the home screen to surface the best-performing
                schools.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div
                className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3"
                style={{ color: PRIMARY }}
              >
                03
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Comparison is Essential
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Parents rarely decide based on a single school profile. The
                decision process inherently involves comparing multiple
                options&mdash;weighing fees against facilities, or location
                against ratings. A dedicated comparison tool that presents data
                side-by-side was identified as a must-have feature, not a
                nice-to-have, from early user interviews.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div
                className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3"
                style={{ color: PRIMARY }}
              >
                04
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Parents Forget & Revisit
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The school selection process spans weeks or even months. Parents
                discover a promising school, forget its name, and struggle to
                find it again. A favorites or saved schools feature directly
                addresses this pain point, allowing parents to build a personal
                shortlist they can return to at any time without restarting
                their search.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div
                className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3"
                style={{ color: PRIMARY }}
              >
                05
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Location Matters Most
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Proximity is a primary concern for day-school parents. A school
                that looks perfect on paper may be impractical if it requires a
                two-hour daily commute. Location-based search and commute-time
                estimates were integrated to help parents quickly eliminate
                geographically unsuitable options and focus on realistic
                candidates.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div
                className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3"
                style={{ color: PRIMARY }}
              >
                06
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Social Proof Through Trends
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Parents want to know which schools other parents are
                considering. A &ldquo;Most Searched&rdquo; section leverages
                social proof to surface trending schools, helping parents
                discover options they might not have considered while also
                validating that their own choices align with broader community
                interest.
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 7. The Solution ── */}
      <section
        className="py-20 lg:py-32 relative overflow-hidden"
        style={{ backgroundColor: PRIMARY }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#1A5C9E]/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#4A90D9]/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: ACCENT }}
              >
                The Solution
              </p>
            </ScrollReveal>
            <SplitTextReveal
              text="One app to search, compare, and decide with confidence"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-white max-w-4xl mx-auto"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollRevealLeft>
              <div className="space-y-6">
                <p className="text-white/80 text-base lg:text-lg leading-[1.8]">
                  School Pata provides a centralized platform where parents can
                  search for schools based on their specific
                  preferences&mdash;curriculum, location, fees, or
                  ratings&mdash;and instantly access comprehensive school
                  profiles with all the data they need to make an informed
                  choice.
                </p>
                <p className="text-white/60 text-base leading-[1.8]">
                  The app&apos;s standout feature is its side-by-side
                  comparison tool, allowing parents to select up to three
                  schools and compare ratings, fees, curriculum, facilities,
                  and location data in a single, scannable view. Combined with
                  a saved schools feature and community-driven ratings, the
                  platform gives parents everything they need to confidently
                  navigate the school selection process.
                </p>
                <p className="text-white/60 text-base leading-[1.8]">
                  By digitizing the discovery and evaluation process, School
                  Pata eliminates the need for time-consuming physical visits
                  to unsuitable schools, reduces decision fatigue, and ensures
                  that no promising option falls through the cracks. A school
                  request feature also allows parents to suggest schools not
                  yet listed, keeping the platform growing with its community.
                </p>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-white">
                      3 max
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      Schools compared at once
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-white">
                      5
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      Curricula supported
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-white">
                      1-tap
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      Save to favorites
                    </p>
                  </div>
                </div>
              </div>
            </ScrollRevealLeft>

            <ScrollRevealRight>
              <ClipReveal>
                <PhoneFrame
                  src="/schoolpata/screen-comparison-results.png"
                  alt="SchooPata side-by-side school comparison results"
                  className="w-[280px] lg:w-[320px]"
                />
              </ClipReveal>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      {/* ── 8. User Flow ── */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 lg:mb-20">
            <SectionHeading
              label="User Flow"
              title="From discovery to decision"
            />
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            <ScrollReveal>
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute top-10 left-[8%] right-[8%] h-0.5 bg-foreground/10" />

                <div className="grid grid-cols-5 gap-4 relative">
                  <FlowStep
                    number={1}
                    icon={Search}
                    title="Search & Discover"
                    description="Search schools by name, location, curriculum, or browse top-rated and trending schools"
                  />
                  <FlowStep
                    number={2}
                    icon={Filter}
                    title="Filter Results"
                    description="Narrow results by rating, fees, curriculum type, and location to find the best matches"
                  />
                  <FlowStep
                    number={3}
                    icon={Heart}
                    title="Save Favorites"
                    description="Bookmark schools that catch your interest to build a personalized shortlist for later review"
                  />
                  <FlowStep
                    number={4}
                    icon={GitCompareArrows}
                    title="Compare Schools"
                    description="Select up to 3 schools and compare ratings, fees, facilities, and curriculum side by side"
                  />
                  <FlowStep
                    number={5}
                    icon={CheckCircle2}
                    title="Decide with Confidence"
                    description="Review your saved schools and comparison data to make an informed enrollment decision"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="lg:hidden">
            <StaggerReveal className="space-y-6" stagger={0.1}>
              {[
                {
                  number: 1,
                  icon: Search,
                  title: "Search & Discover",
                  description:
                    "Search schools by name, location, curriculum, or browse top-rated and trending schools",
                },
                {
                  number: 2,
                  icon: Filter,
                  title: "Filter Results",
                  description:
                    "Narrow results by rating, fees, curriculum type, and location to find the best matches",
                },
                {
                  number: 3,
                  icon: Heart,
                  title: "Save Favorites",
                  description:
                    "Bookmark schools that catch your interest to build a personalized shortlist for later review",
                },
                {
                  number: 4,
                  icon: GitCompareArrows,
                  title: "Compare Schools",
                  description:
                    "Select up to 3 schools and compare ratings, fees, facilities, and curriculum side by side",
                },
                {
                  number: 5,
                  icon: CheckCircle2,
                  title: "Decide with Confidence",
                  description:
                    "Review your saved schools and comparison data to make an informed enrollment decision",
                },
              ].map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0"
                      style={{
                        backgroundColor: PRIMARY,
                        borderColor: `${ACCENT}50`,
                      }}
                    >
                      <step.icon className="w-5 h-5 text-[#4A90D9]" />
                    </div>
                    {step.number < 5 && (
                      <div className="w-0.5 flex-1 bg-foreground/10 mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h4 className="font-bold font-[family-name:var(--font-poppins)] text-foreground text-sm">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ── 9. Screens Showcase ── */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 lg:mb-24">
            <SectionHeading
              label="App Screens"
              title="Designed for clarity and confidence"
            />
          </div>

          <div className="space-y-20 lg:space-y-32">
            {/* Screen 1: Home */}
            <ScreenShowcase
              src="/schoolpata/screen-home.png"
              alt="SchooPata home screen with personalized greeting and search"
              title="Home Dashboard"
              purpose="The home screen greets parents with a personalized experience, featuring a prominent search bar, recent searches as quick-access pills, and curated sections for Top Rated and Most Searched schools. It serves as the central hub from which all discovery flows originate."
              rationale="The search-first layout reflects research findings that parents almost always start their journey with a query. Recent search pills (e.g., 'British curriculum', 'Nairobi') reduce repetitive typing, while the Top Rated section leverages social proof to surface trusted institutions immediately. The Most Searched section taps into community behavior, helping parents discover popular options they might have overlooked."
            />

            <DrawLine
              direction="horizontal"
              color="#4A90D9"
              className="mx-auto max-w-md"
            />

            {/* Screen 2: Search & Filter */}
            <ScreenShowcase
              src="/schoolpata/screen-search-filters.png"
              alt="SchooPata search filters screen"
              title="Smart Filters"
              purpose="The filter screen allows parents to narrow their search by minimum rating, fee range (semester), curriculum type, and location. Each filter uses intuitive toggle buttons and sliders that provide instant visual feedback on the selected criteria."
              rationale="Filter design was critical because parents have strong non-negotiables (especially curriculum). Toggle buttons for curriculum and rating were chosen over dropdowns to make all options visible at once, reducing the number of interactions needed. The fee slider uses Kenyan Shilling ranges that align with real market segments, and the location input supports GPS-based discovery for mobile users."
              reversed
            />

            <DrawLine
              direction="horizontal"
              color="#4A90D9"
              className="mx-auto max-w-md"
            />

            {/* Screen 3: School Profile */}
            <ScreenShowcase
              src="/schoolpata/screen-school-profile.png"
              alt="SchooPata school profile page for Fairy Academy"
              title="School Profile"
              purpose="The school profile page provides a comprehensive view of a single school, including its campus photo, rating, location, key information cards (curriculum, type, student count, founding year), facilities, and similar school recommendations. A prominent 'Compare' button enables immediate action."
              rationale="Information is layered: the most critical data (name, rating, location) appears at the top, with deeper details (facilities, overview) accessible by scrolling. Key information is presented in scannable card format rather than dense paragraphs. The 'Similar Schools' section at the bottom keeps parents in the discovery loop, reducing dead-end exits and encouraging further exploration."
            />

            <DrawLine
              direction="horizontal"
              color="#4A90D9"
              className="mx-auto max-w-md"
            />

            {/* Screen 4: Compare Landing */}
            <ScreenShowcase
              src="/schoolpata/screen-compare-landing.png"
              alt="SchooPata compare schools landing page"
              title="Compare Landing"
              purpose="This screen introduces the comparison feature with a clean, focused layout. A visual balance scale illustration reinforces the concept of weighing options, and two clear entry points ('Add from Search' and 'Select from saved') accommodate different parental workflows."
              rationale="A dedicated landing page for comparison was intentionally designed to set expectations before parents enter the selection flow. The scale illustration provides a visual metaphor that resonates with the decision-making process. Offering two paths into the selection acknowledges that some parents already have saved schools while others want to search fresh."
              reversed
            />

            <DrawLine
              direction="horizontal"
              color="#4A90D9"
              className="mx-auto max-w-md"
            />

            {/* Screen 5: Comparison Results */}
            <ScreenShowcase
              src="/schoolpata/screen-comparison-results.png"
              alt="SchooPata side-by-side school comparison results"
              title="Side-by-Side Comparison"
              purpose="The comparison view presents selected schools side-by-side with filterable criteria tabs (All, Rating, Fees, Curriculum, Location). Visual progress bars for fees, percentile badges for ratings, and clear facility lists make differences between schools immediately apparent."
              rationale="The tabbed filter approach prevents information overload while allowing parents to focus on specific criteria. Progress bars for fees create an instant visual comparison that is faster to parse than raw numbers. Percentile rankings contextualize ratings beyond raw star counts, helping parents understand how a school performs relative to the broader market."
            />

            <DrawLine
              direction="horizontal"
              color="#4A90D9"
              className="mx-auto max-w-md"
            />

            {/* Screen 6: Saved Schools */}
            <ScreenShowcase
              src="/schoolpata/screen-saved-schools.png"
              alt="SchooPata saved schools list"
              title="Saved Schools"
              purpose="The saved schools screen serves as a parent's personalized shortlist, displaying all bookmarked schools in a clean vertical list with thumbnail images, ratings, and locations. This becomes the go-to reference during the final decision-making phase."
              rationale="The list format was chosen over a grid to maximize scannability on mobile screens. Each card shows just enough information (name, rating, location) for parents to quickly identify schools without needing to open each profile. The screen acts as a persistent memory aid, directly addressing the research insight that parents forget promising schools over long decision timelines."
              reversed
            />
          </div>
        </div>
      </section>

      {/* ── 10. Features Section ── */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionHeading
              label="Features"
              title="Everything parents need"
            />
          </div>

          <StaggerReveal
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            stagger={0.1}
          >
            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A90D9]/30 transition-all duration-500 hover:bg-secondary/60">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:opacity-80 transition-opacity duration-500"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <Search className="w-5 h-5" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Smart School Search
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quickly discover schools through an intuitive search experience
                with support for name, location, and curriculum-based queries.
                Eliminates the need for door-to-door visits and scattered
                research across multiple sources.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A90D9]/30 transition-all duration-500 hover:bg-secondary/60">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:opacity-80 transition-opacity duration-500"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <Heart className="w-5 h-5" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Save Favorites
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bookmark schools of interest and revisit them later without
                needing to remember names or details. Build a personalized
                shortlist that persists throughout the weeks-long decision
                process, ensuring no promising option is forgotten.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A90D9]/30 transition-all duration-500 hover:bg-secondary/60">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:opacity-80 transition-opacity duration-500"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <GitCompareArrows
                  className="w-5 h-5"
                  style={{ color: PRIMARY }}
                />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                School Comparison
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Compare up to 3 schools side-by-side on ratings, fees,
                curriculum, facilities, and location. Visual progress bars and
                percentile rankings make differences between schools instantly
                apparent on mobile screens.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A90D9]/30 transition-all duration-500 hover:bg-secondary/60">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:opacity-80 transition-opacity duration-500"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <Star className="w-5 h-5" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Community Ratings
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ratings and reviews from other parents help users understand
                how the community perceives a school&apos;s quality and
                performance. Schools with the highest ratings are highlighted
                in a dedicated Top Rated section on the home screen.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A90D9]/30 transition-all duration-500 hover:bg-secondary/60">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:opacity-80 transition-opacity duration-500"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <Filter className="w-5 h-5" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Advanced Filters
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Filter schools by minimum rating, fee range, curriculum type
                (CBC, 8-4-4, British, American), and geographic location.
                Toggle-style controls make all options visible at once,
                reducing the number of taps needed to find the right school.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A90D9]/30 transition-all duration-500 hover:bg-secondary/60">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:opacity-80 transition-opacity duration-500"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <GraduationCap
                  className="w-5 h-5"
                  style={{ color: PRIMARY }}
                />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Most Searched
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trending schools provide insight into what other parents are
                actively exploring, leveraging social proof to help users
                discover options they might not have considered and validate
                their own research against broader community interest.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A90D9]/30 transition-all duration-500 hover:bg-secondary/60">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:opacity-80 transition-opacity duration-500"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <BookOpen className="w-5 h-5" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Detailed Profiles
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Each school profile includes campus photos, curriculum
                details, key facts (student count, founding year, school type),
                facilities listings, and similar school recommendations to
                keep discovery flowing naturally.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A90D9]/30 transition-all duration-500 hover:bg-secondary/60">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:opacity-80 transition-opacity duration-500"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <Send className="w-5 h-5" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                School Requests
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If a school is not listed in the platform, parents can submit
                a request for it to be reviewed and potentially added to the
                database, ensuring the platform grows with its community and
                remains comprehensive over time.
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 11. Design System ── */}
      <section
        className="py-20 lg:py-32 relative overflow-hidden"
        style={{ backgroundColor: PRIMARY }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#1A5C9E]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#4A90D9]/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: ACCENT }}
              >
                Design System
              </p>
            </ScrollReveal>
            <SplitTextReveal
              text="Visual language built for trust and clarity"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-white max-w-4xl mx-auto"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Color Palette */}
            <ScrollRevealLeft>
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">
                  Color Palette
                </h3>
                <div className="space-y-3">
                  <ColorSwatch
                    color="#0B3A66"
                    name="Blue Horizon"
                    hex="#0B3A66"
                  />
                  <ColorSwatch
                    color="#4A90D9"
                    name="Sky Blue"
                    hex="#4A90D9"
                  />
                  <ColorSwatch
                    color="#696969"
                    name="Dim Gray"
                    hex="#696969"
                  />
                  <ColorSwatch
                    color="#000000"
                    name="Black"
                    hex="#000000"
                  />
                  <ColorSwatch
                    color="#FFFFFF"
                    name="White"
                    hex="#FFFFFF"
                  />
                </div>
              </div>
            </ScrollRevealLeft>

            {/* Typography & Principles */}
            <ScrollRevealRight>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">
                    Typography
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5">
                      <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-2">
                        Headings
                      </p>
                      <p className="text-white text-2xl font-bold font-[family-name:var(--font-poppins)]">
                        Poppins Bold
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-2">
                        Body
                      </p>
                      <p className="text-white text-base">
                        Inter Regular — for readable body text and UI elements
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">
                    Design Principles
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Trust First",
                        desc: "Blue tones and star ratings build credibility with parents making high-stakes decisions",
                      },
                      {
                        title: "Progressive Disclosure",
                        desc: "Critical info surfaces first; deeper details are accessible without cluttering the initial view",
                      },
                      {
                        title: "Mobile-Native",
                        desc: "Every interaction designed for thumb-first navigation with generous tap targets",
                      },
                    ].map((principle) => (
                      <div
                        key={principle.title}
                        className="p-4 rounded-xl bg-white/5"
                      >
                        <p className="text-white font-medium text-sm mb-1">
                          {principle.title}
                        </p>
                        <p className="text-white/50 text-xs leading-relaxed">
                          {principle.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      {/* ── 12. Outcomes ── */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionHeading
              label="Outcomes"
              title="Making school selection effortless"
            />
          </div>

          <StaggerReveal
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            stagger={0.12}
          >
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <Clock className="w-7 h-7" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Reduced Research Time
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Parents can accomplish in minutes what previously took weeks of
                physical visits, phone calls, and manual comparison. The
                centralized platform eliminates redundant research and puts all
                critical data at their fingertips from day one.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <CheckCircle2
                  className="w-7 h-7"
                  style={{ color: PRIMARY }}
                />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Improved Decision Quality
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Side-by-side comparison and comprehensive data empower parents
                to make decisions based on evidence rather than hearsay. The
                comparison tool ensures that the final choice reflects a
                thorough evaluation of all relevant factors.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <School className="w-7 h-7" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Increased School Visibility
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Schools gain a digital storefront where they can showcase their
                facilities, curriculum, and strengths to an actively searching
                audience. Smaller or newer schools benefit from equal placement
                alongside established institutions.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <Star className="w-7 h-7" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Greater Transparency
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Community ratings and reviews introduce accountability and
                transparency into the school selection ecosystem. Parents
                benefit from the collective wisdom of other families who have
                already navigated the same decision.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <MapPin className="w-7 h-7" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Digital Discovery
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Parents in remote or underserved areas gain access to school
                information that was previously available only through physical
                visits or personal networks. The platform democratizes access
                to educational opportunities across Kenya.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${PRIMARY}15` }}
              >
                <Send className="w-7 h-7" style={{ color: PRIMARY }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Community-Driven Growth
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The school request feature ensures the platform evolves based
                on real parent needs. As more parents use and contribute to the
                platform, the database grows richer and more representative of
                the Kenyan educational landscape.
              </p>
            </div>
          </StaggerReveal>

          {/* Figma CTA */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <a
                href="https://www.figma.com/design/SZE5vqXtIOX3bYFNrARVW7/Eugene%7C-SchoolPata-%7C-FINAL--Copy-?node-id=1506-226&t=V4tfu9CevRCsSz4N-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-colors duration-300 border"
                style={{
                  backgroundColor: PRIMARY,
                  borderColor: PRIMARY,
                  color: "white",
                }}
              >
                View Full Figma File
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 13. Next Project ── */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">
                  Next Project
                </p>
                <Link
                  href="/projects/waveeatz"
                  className="group inline-flex items-center gap-4"
                >
                  <h3 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground group-hover:text-accent transition-colors duration-300">
                    Wave Eats
                  </h3>
                  <ArrowRight className="w-6 h-6 text-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-2" />
                </Link>
                <p className="mt-2 text-muted-foreground text-sm">
                  Group food delivery for university students
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
