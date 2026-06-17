"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
  Users,
  Mic,
  Globe,
  Bell,
  Sprout,
  BarChart3,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Clock,
  BookOpen,
  Target,
  Lightbulb,
  Leaf,
  Languages,
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
const GREEN = "#2E5C3E";
const GREEN_DARK = "#1A3A26";
const ORANGE = "#ED6C02";
const ORANGE_LIGHT = "#F5923A";
const ACCENT_GREEN = "#4A8B5E";

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
  accentColor,
}: {
  label: string;
  title: string;
  light?: boolean;
  accentColor?: string;
}) {
  return (
    <div className="mb-12 lg:mb-16">
      <ScrollReveal>
        <p
          className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
          style={{ color: accentColor || ORANGE }}
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
      <Icon className="w-6 h-6 mb-4" style={{ color: light ? ORANGE_LIGHT : ORANGE }} />
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
          style={{ backgroundColor: GREEN, borderColor: `${ACCENT_GREEN}50` }}
        >
          <Icon className="w-7 h-7 lg:w-8 lg:h-8" style={{ color: ACCENT_GREEN }} />
        </div>
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ backgroundColor: ORANGE }}>
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
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: GREEN }}>
          Purpose
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {purpose}
        </p>
      </div>
      <div>
        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: GREEN }}>
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
          <ScreenTextContent title={title} purpose={purpose} rationale={rationale} />
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
        <ScreenTextContent title={title} purpose={purpose} rationale={rationale} />
      </ScrollRevealRight>
    </div>
  );
}

/* ─── Color Swatch ─── */
function ColorSwatch({ color, name, hex }: { color: string; name: string; hex: string }) {
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
   SHAMBA RAHISI Case Study Page
   ──────────────────────────────────────────── */
export default function ShambaRahisiPage() {
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
      <section className="relative overflow-hidden" style={{ backgroundColor: GREEN }}>
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${GREEN_DARK}` }} />
          <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full blur-3xl" style={{ backgroundColor: `${GREEN_DARK}50` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: `${ORANGE}08` }} />
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
                <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-bold leading-[0.85] tracking-tight font-[family-name:var(--font-poppins)]">
                  <span className="text-white">SHAMBA</span>
                  <br />
                  <span style={{ color: ORANGE }}>RAHISI</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {[
                  { label: "Category", value: "AgriTech UX" },
                  { label: "Role", value: "UX Research Lead" },
                  { label: "Timeline", value: "2025" },
                  { label: "Platform", value: "Mobile App" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-4 py-2 rounded-full border border-white/15 bg-white/5"
                  >
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: ORANGE }}>
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
                An agricultural technology solution that transforms complex farm
                data into simple, actionable insights&mdash;delivered in
                farmers&apos; own languages through voice and smart reminders.
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
                    style={{ color: GREEN }}
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
                <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
                  src="/shamba-rahisi/screen-splash.png"
                  alt="Shamba Rahisi splash screen with farmer"
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
          <SectionHeading label="Overview" title="The voice of your soil" accentColor={ORANGE} />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="text-foreground/80 text-base lg:text-lg leading-[1.8]">
                  <span className="font-bold font-[family-name:var(--font-poppins)] text-foreground">
                    Shamba Rahisi
                  </span>{" "}
                  is an agricultural technology solution designed to help
                  farmers better understand and utilize farm data. The platform
                  transforms complex agricultural and environmental data into
                  simple, actionable insights presented in language that farmers
                  can easily understand.
                </p>
                <p className="text-foreground/70 text-base leading-[1.8]">
                  Recognizing the diversity of farmers across Kenya, the
                  solution supports multiple languages including local and native
                  languages such as Kiswahili, Kalenjin, and Kikuyu. This makes
                  critical farming information more accessible regardless of
                  literacy level or language preference. The platform also
                  provides timely reminders for important farming activities and
                  environmental conditions, helping farmers make informed
                  decisions and improve productivity.
                </p>
                <p className="text-foreground/70 text-base leading-[1.8]">
                  Developed through primary research with AgTech leaders like
                  Synnefa, the platform integrates real-time IoT sensor data
                  from FarmShield devices, translating raw soil readings into
                  localized, voice-based task recommendations and pre-season
                  cost blueprints that ensure technical recommendations become
                  affordable, reliable action at the farm level.
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealRight>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-foreground/5">
                <img
                  src="/shamba-rahisi/screen-home-dashboard.png"
                  alt="Shamba Rahisi home dashboard with farm overview"
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
                title="Data-rich, insight-poor"
                accentColor={ORANGE}
              />
              <ScrollReveal delay={0.2}>
                <div className="space-y-5">
                  <p className="text-foreground/80 text-base leading-[1.8]">
                    Many farmers in Kenya now have access to agricultural
                    data&mdash;from soil sensors, weather stations, and extension
                    services&mdash;but they struggle to interpret the technical
                    information and complex reports this data generates. Critical
                    insights about soil health, nutrient deficiencies, and
                    planting conditions are presented using scientific terminology
                    that creates barriers rather than enabling informed
                    decision-making.
                  </p>
                  <p className="text-foreground/70 text-base leading-[1.8]">
                    Language barriers compound the problem. Most agricultural
                    data platforms present information exclusively in English,
                    yet many farmers are more comfortable in Kiswahili or their
                    local native languages. This linguistic gap effectively
                    locks out the very people who need the information most,
                    turning potentially transformative data into inaccessible
                    noise.
                  </p>
                  <p className="text-foreground/70 text-base leading-[1.8]">
                    Additionally, farmers struggle to track important farming
                    activities and deadlines. Without timely reminders for
                    crucial actions like fertilizer application or planting
                    windows, even the best data-driven recommendations fail to
                    translate into on-the-ground action.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div>
              <StaggerReveal className="grid grid-cols-2 gap-4 lg:gap-6" stagger={0.15}>
                <StatCard
                  icon={BarChart3}
                  value="Raw Data"
                  label="Complex sensor data that farmers cannot interpret without technical knowledge"
                />
                <StatCard
                  icon={Languages}
                  value="English Only"
                  label="Most AgTech platforms ignore local and native languages"
                />
                <StatCard
                  icon={Clock}
                  value="Missed Deadlines"
                  label="No timely reminders for critical farming activities like planting windows"
                />
                <StatCard
                  icon={Sprout}
                  value="Yield Gap"
                  label="The disconnect between available data and farmer action reduces productivity"
                />
              </StaggerReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. My Role / Contributions ── */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: ORANGE }}>
                My Role
              </p>
            </ScrollReveal>
            <SplitTextReveal
              text="UX Research Lead — from stakeholder interviews to product strategy"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-foreground max-w-4xl mx-auto"
            />
          </div>

          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" stagger={0.12}>
            <div className="p-6 lg:p-8 rounded-2xl text-white" style={{ backgroundColor: GREEN }}>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" style={{ color: ACCENT_GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-4">
                Stakeholder Interviews
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Organized and coordinated interviews with representatives from
                Synnefa. Facilitated discussions to understand industry
                challenges, user needs, and business objectives. Documented
                meeting outcomes and maintained detailed research notes.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl text-white" style={{ backgroundColor: GREEN }}>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Search className="w-6 h-6" style={{ color: ACCENT_GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-4">
                User & Market Research
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Conducted extensive online research to understand agricultural
                technology trends and farmer challenges. Analyzed existing
                solutions within the market to identify gaps and opportunities.
                Gathered insights on how farmers interact with information.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl text-white" style={{ backgroundColor: GREEN }}>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" style={{ color: ACCENT_GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-4">
                Problem Identification
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Identified key pain points affecting farmers when interpreting
                agricultural data. Mapped challenges related to accessibility,
                language barriers, and information comprehension. Defined core
                problem areas that shaped the product direction.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl text-white" style={{ backgroundColor: GREEN }}>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6" style={{ color: ACCENT_GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-4">
                Opportunity Discovery
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Investigated potential market opportunities where technology
                could simplify data interpretation for farmers. Contributed
                research findings that informed feature prioritization and
                product strategy, ensuring the solution addressed real needs.
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 6. Research Insights ── */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading
            label="Research Insights"
            title="What farmers told us"
            accentColor={ORANGE}
          />

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3" style={{ color: GREEN }}>
                01
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Technical Data is Inaccessible
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Farmers found technical agricultural data extremely difficult to
                understand. Soil pH readings, nitrogen levels, and sensor
                metrics meant nothing without translation into practical
                language. The gap between raw data and actionable knowledge was
                the single biggest barrier to adoption.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3" style={{ color: GREEN }}>
                02
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Conversational Language Preferred
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Farmers overwhelmingly preferred information presented in
                simple, conversational language rather than scientific reports.
                Metaphors and analogies (e.g., &ldquo;Your soil is hungry for
                nitrogen&rdquo;) resonated far more than charts and graphs.
                This insight directly shaped the recommendation engine&apos;s
                communication style.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3" style={{ color: GREEN }}>
                03
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Reminders Drive Action
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Farmers benefited significantly from receiving reminders for
                critical farming activities. Without nudges, important tasks
                like fertilizer application were often delayed past optimal
                windows, reducing their effectiveness. Timely notifications
                emerged as a key feature request across all user segments.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3" style={{ color: GREEN }}>
                04
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Local Language is Non-Negotiable
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Solutions that only supported English effectively excluded a
                large portion of the target user base. Farmers required
                interfaces and audio in their native languages&mdash;including
                Kiswahili, Kalenjin, and Kikuyu. Voice-based delivery in local
                dialects was identified as essential for low-literacy contexts.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3" style={{ color: GREEN }}>
                05
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Recommendations, Not Raw Data
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Farmers didn&apos;t want to see raw sensor readings&mdash;they
                wanted to know what to do. Actionable recommendations (e.g.,
                &ldquo;Apply 50kg of DAP fertilizer within 7 days&rdquo;) were
                far more valuable than being told &ldquo;Nitrogen level: Low.&rdquo;
                The platform needed to move from data display to decision
                support.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-3" style={{ color: GREEN }}>
                06
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Cost Awareness Matters
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Farmers needed to understand the financial implications of
                recommendations before acting. Including estimated costs (e.g.,
                &ldquo;2,800 KES for DAP&rdquo;) and potential savings (e.g.,
                &ldquo;Potential savings: Ksh 15,000&rdquo;) alongside
                agricultural advice built trust and enabled financial planning
                around farming activities.
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 7. The Solution ── */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: GREEN }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: GREEN_DARK }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ backgroundColor: `${ORANGE}08` }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: ORANGE }}>
                The Solution
              </p>
            </ScrollReveal>
            <SplitTextReveal
              text="Complex data, simple voice — your farm speaks your language"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-white max-w-4xl mx-auto"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollRevealLeft>
              <div className="space-y-6">
                <p className="text-white/80 text-base lg:text-lg leading-[1.8]">
                  Shamba Rahisi converts complex farm and environmental data
                  into simplified, easy-to-understand insights that support
                  better decision-making. By connecting to Synnefa&apos;s
                  FarmShield IoT sensors, the app pulls real-time soil data and
                  transforms it into practical recommendations delivered in the
                  farmer&apos;s preferred language.
                </p>
                <p className="text-white/60 text-base leading-[1.8]">
                  The platform&apos;s standout innovation is its multi-language
                  voice system. Farmers can receive audio recommendations in
                  Kiswahili, Kalenjin, Kikuyu, or English&mdash;choosing both
                  their preferred language and voice gender. This ensures that
                  even farmers with limited literacy can benefit from
                  data-driven insights through accessible audio delivery.
                </p>
                <p className="text-white/60 text-base leading-[1.8]">
                  Smart reminders ensure that critical farming activities are
                  never missed. The app sends timely notifications tied to
                  real-time environmental conditions&mdash;alerting farmers
                  when to apply fertilizer before rain, or when soil moisture
                  levels indicate optimal planting conditions.
                </p>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-white">4+</p>
                    <p className="text-xs text-white/50 mt-1">Languages supported</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)]" style={{ color: ORANGE }}>IoT</p>
                    <p className="text-xs text-white/50 mt-1">Real-time sensor data</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-white">Voice</p>
                    <p className="text-xs text-white/50 mt-1">Audio recommendations</p>
                  </div>
                </div>
              </div>
            </ScrollRevealLeft>

            <ScrollRevealRight>
              <ClipReveal>
                <PhoneFrame
                  src="/shamba-rahisi/screen-recommendation.png"
                  alt="Shamba Rahisi recommendation screen with actionable insights"
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
            <SectionHeading label="User Flow" title="From data to action" accentColor={ORANGE} />
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            <ScrollReveal>
              <div className="relative">
                <div className="absolute top-10 left-[8%] right-[8%] h-0.5 bg-foreground/10" />
                <div className="grid grid-cols-5 gap-4 relative">
                  <FlowStep number={1} icon={Sprout} title="Welcome" description="Splash screen introduces the brand and gets farmers started with the app" />
                  <FlowStep number={2} icon={BarChart3} title="Provide Data" description="Choose how to share soil data — soil test results, extension officer, or manual entry" />
                  <FlowStep number={3} icon={MapPin} title="Map Farm" description="Trace field boundaries on satellite maps and connect Synnefa sensor accounts" />
                  <FlowStep number={4} icon={Lightbulb} title="Get Insights" description="Receive personalized recommendations in your language with cost estimates and deadlines" />
                  <FlowStep number={5} icon={CheckCircle2} title="Take Action" description="Follow step-by-step task instructions with location verification and smart reminders" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="lg:hidden">
            <StaggerReveal className="space-y-6" stagger={0.1}>
              {[
                { number: 1, icon: Sprout, title: "Welcome", description: "Splash screen introduces the brand and gets farmers started with the app" },
                { number: 2, icon: BarChart3, title: "Provide Data", description: "Choose how to share soil data — soil test results, extension officer, or manual entry" },
                { number: 3, icon: MapPin, title: "Map Farm", description: "Trace field boundaries on satellite maps and connect Synnefa sensor accounts" },
                { number: 4, icon: Lightbulb, title: "Get Insights", description: "Receive personalized recommendations in your language with cost estimates and deadlines" },
                { number: 5, icon: CheckCircle2, title: "Take Action", description: "Follow step-by-step task instructions with location verification and smart reminders" },
              ].map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0" style={{ backgroundColor: GREEN, borderColor: `${ACCENT_GREEN}50` }}>
                      <step.icon className="w-5 h-5" style={{ color: ACCENT_GREEN }} />
                    </div>
                    {step.number < 5 && <div className="w-0.5 flex-1 bg-foreground/10 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <h4 className="font-bold font-[family-name:var(--font-poppins)] text-foreground text-sm">{step.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{step.description}</p>
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
            <SectionHeading label="App Screens" title="From soil data to farmer action" accentColor={ORANGE} />
          </div>

          <div className="space-y-20 lg:space-y-32">
            {/* Screen 1: Splash */}
            <ScreenShowcase
              src="/shamba-rahisi/screen-splash.png"
              alt="Shamba Rahisi splash welcome screen"
              title="Welcome Screen"
              purpose="The splash screen establishes the brand identity with authentic agricultural imagery — a real farmer working in a field. The bold 'Shamba Rahisi' branding in orange alongside the tagline 'The Voice of Your Soil' immediately communicates the app's mission to give farmers a voice through their soil data."
              rationale="Research showed that farmers respond to authentic, relatable imagery rather than abstract tech visuals. The dual-path entry (Get Started for new users, Log In for returning) reduces friction. The orange brand text against the natural photography creates visual warmth that resonates with the agricultural community."
            />

            <DrawLine direction="horizontal" color="#ED6C02" className="mx-auto max-w-md" />

            {/* Screen 2: Onboarding Data Source */}
            <ScreenShowcase
              src="/shamba-rahisi/screen-onboarding-data-source.png"
              alt="Shamba Rahisi onboarding data source selection"
              title="Data Source Selection"
              purpose="The first onboarding step asks farmers how they'd like to provide soil and farm information. Three clear options — Soil Test Results, Extension Officer, or Manual Entry — accommodate different farmer profiles and data access levels."
              rationale="Bilingual presentation (English + Swahili) from the very first interaction reinforces the app's commitment to accessibility. The three-card layout was designed to be scannable without reading long paragraphs. Offering multiple data input methods ensures the app is useful even for farmers without recent lab results or sensor access."
              reversed
            />

            <DrawLine direction="horizontal" color="#ED6C02" className="mx-auto max-w-md" />

            {/* Screen 3: Home Dashboard */}
            <ScreenShowcase
              src="/shamba-rahisi/screen-home-dashboard.png"
              alt="Shamba Rahisi home dashboard with farm overview and priority task"
              title="Home Dashboard"
              purpose="The home dashboard serves as the farmer's central hub, displaying a personalized greeting, real-time farm summary (Farm Size, Soil pH, Crop), weather conditions, priority tasks, quick actions, and recent activity — all above the fold."
              rationale="The priority task card uses Swahili for the recommendation title ('Tumia Mbolea yenye Naitrojeni Nyingi') to demonstrate the multilingual approach. Including potential savings (Ksh 15,000) alongside the task provides financial motivation. Weather integration helps farmers contextualize recommendations against current conditions."
            />

            <DrawLine direction="horizontal" color="#ED6C02" className="mx-auto max-w-md" />

            {/* Screen 4: Recommendation */}
            <ScreenShowcase
              src="/shamba-rahisi/screen-recommendation.png"
              alt="Shamba Rahisi recommendation with actionable insights"
              title="Smart Recommendations"
              purpose="The recommendation screen is where complex data becomes simple action. It shows the sensor source, soil status cards (Nitrogen, pH, Moisture), a conversational explanation using metaphors, recommended action with cost estimates, step-by-step instructions, and CTAs to add to tasks or set savings goals."
              rationale="The metaphor-based explanation ('Your soil is hungry for nitrogen') was a direct result of research finding that farmers prefer conversational language over scientific terminology. Including estimated cost (2,800 KES) and deadline context ('before rain') transforms an abstract recommendation into a concrete, plannable action. The 'Watch Demo Video' option caters to visual learners."
              reversed
            />

            <DrawLine direction="horizontal" color="#ED6C02" className="mx-auto max-w-md" />

            {/* Screen 5: Voice Settings */}
            <ScreenShowcase
              src="/shamba-rahisi/screen-voice-settings.png"
              alt="Shamba Rahisi voice settings with language selection"
              title="Voice & Language Settings"
              purpose="The voice settings screen allows farmers to choose their preferred language (Kiswahili, English, Kalenjin, or Kikuyu) and voice gender for audio recommendations. A preview feature lets users sample the voice before committing."
              rationale="This screen directly addresses the research insight that local language is non-negotiable. Including native languages like Kalenjin and Kikuyu (with their native script: 'Gikuyu') demonstrates genuine localization rather than token translation. The voice gender option adds personalization, and the preview function builds confidence before committing to settings."
            />

            <DrawLine direction="horizontal" color="#ED6C02" className="mx-auto max-w-md" />

            {/* Screen 6: Connect Synnefa */}
            <ScreenShowcase
              src="/shamba-rahisi/screen-onboarding-connect-synnefa.png"
              alt="Shamba Rahisi Synnefa FarmShield sensor connection screen"
              title="Connect Synnefa Sensors"
              purpose="Step 2 of onboarding integrates the farmer's Synnefa FarmShield account to sync real-time IoT sensor data. A simple login form with phone number and password fields bridges the gap between sensor hardware and the recommendation engine."
              rationale="Placing sensor integration early in onboarding ensures the app can deliver data-driven recommendations from the very first session. The phone number field with Kenyan format hint (+254) reduces input errors. By separating this step from data source selection, farmers who choose manual entry aren't forced through a sensor login they don't need — the flow adapts to their earlier choice."
              reversed
            />

            <DrawLine direction="horizontal" color="#ED6C02" className="mx-auto max-w-md" />

            {/* Screen 7: Map Farm */}
            <ScreenShowcase
              src="/shamba-rahisi/screen-onboarding-map-farm.png"
              alt="Shamba Rahisi farm mapping with satellite view"
              title="Farm Mapping"
              purpose="The final onboarding step enables farmers to trace their field boundaries on a satellite map. The satellite imagery provides a realistic aerial view, while simple drawing tools let users outline their plots with precision. Undo and Save Field controls ensure confidence before committing."
              rationale="Satellite imagery was chosen over map views because farmers can visually identify their own land — landmarks, buildings, and field shapes act as natural verification. The three-action button system (Undo, Save Field, Finish Setup) breaks the complex task of boundary tracing into manageable steps. Completing this step enables location-specific sensor data correlation."
            />

            <DrawLine direction="horizontal" color="#ED6C02" className="mx-auto max-w-md" />

            {/* Screen 8: Tasks */}
            <ScreenShowcase
              src="/shamba-rahisi/screen-tasks.png"
              alt="Shamba Rahisi task management with priority levels"
              title="Task Management"
              purpose="The tasks screen organizes all farming activities by urgency. Today's high-priority task sits at the top with a bold orange border and immediate 'Start Task' CTA, while this week's medium-priority items appear below. Completed tasks are accessible via a separate link."
              rationale="Priority-based visual hierarchy (orange border for HIGH, lighter for MEDIUM) ensures farmers see the most urgent action first. The 'Start Task' button on high-priority items reduces the friction between seeing a task and beginning it. Separating completed tasks prevents clutter while maintaining a sense of progress and accomplishment."
              reversed
            />

            <DrawLine direction="horizontal" color="#ED6C02" className="mx-auto max-w-md" />

            {/* Screen 9: Task Details */}
            <ScreenShowcase
              src="/shamba-rahisi/screen-task-details.png"
              alt="Shamba Rahisi task detail with step-by-step instructions and location check"
              title="Task Execution"
              purpose="The task detail screen guides farmers through execution with numbered step-by-step instructions, resource verification (confirming available fertilizer in storage), and GPS-based location confirmation. An aerial map view confirms the farmer is at the correct field before starting."
              rationale="Location verification addresses a real-world problem — farmers with multiple fields applying the wrong treatment to the wrong plot. The resource check ('You have 50kg DAP in storage') removes the guesswork around material availability. Numbered instructions with precise measurements (e.g., '10g per planting hole') translate recommendations into unambiguous actions that leave no room for misinterpretation."
            />
          </div>
        </div>
      </section>

      {/* ── 10. Features Section ── */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionHeading label="Features" title="Built for the field, not the lab" accentColor={ORANGE} />
          </div>

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${GREEN}15` }}>
                <BarChart3 className="w-5 h-5" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Data Interpretation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Transforms raw agricultural sensor data into clear, understandable recommendations using conversational language and relatable metaphors that farmers can immediately act on.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${GREEN}15` }}>
                <Globe className="w-5 h-5" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Multi-Language Support</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Supports Kiswahili, English, Kalenjin, and Kikuyu with native script display. Farmers select their preferred language and voice gender for audio recommendations delivered in their mother tongue.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${GREEN}15` }}>
                <Bell className="w-5 h-5" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Smart Reminders</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Provides timely notifications for important farming activities and environmental conditions, tied to real-time weather and sensor data so farmers never miss critical planting or fertilization windows.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${GREEN}15` }}>
                <Mic className="w-5 h-5" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Voice Delivery</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Audio recommendations in local dialects ensure accessibility for farmers with limited literacy. Voice gender selection and preview functionality allow farmers to choose a voice they trust.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${GREEN}15` }}>
                <MapPin className="w-5 h-5" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Farm Mapping</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Satellite-based field boundary mapping enables precise, location-specific recommendations. Farmers trace their plots on aerial imagery for accurate sensor data correlation and task location verification.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${GREEN}15` }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Step-by-Step Tasks</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Each recommendation converts into actionable tasks with numbered instructions, resource verification (e.g., confirming available fertilizer), and location check-in to ensure correct execution.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${GREEN}15` }}>
                <Leaf className="w-5 h-5" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Synnefa Integration</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Direct connection to FarmShield IoT sensors via Synnefa accounts provides real-time soil data — pH, nitrogen, moisture — that powers personalized recommendations without manual data entry.
              </p>
            </div>

            <div className="group p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${GREEN}15` }}>
                <BookOpen className="w-5 h-5" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Cost Transparency</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every recommendation includes estimated costs, potential savings, and savings goal tracking. Farmers see the financial impact before committing, building trust and enabling budget-conscious farming decisions.
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 11. Design System ── */}
      <section className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: GREEN }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: GREEN_DARK }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{ backgroundColor: `${ORANGE}08` }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: ORANGE }}>Design System</p>
            </ScrollReveal>
            <SplitTextReveal
              text="Rooted in nature, built for accessibility"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-white max-w-4xl mx-auto"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Color Palette */}
            <ScrollRevealLeft>
              <div className="space-y-6">
                <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">Color Palette</h3>
                <div className="space-y-3">
                  <ColorSwatch color="#2E5C3E" name="Deep Forest Green" hex="#2E5C3E" />
                  <ColorSwatch color="#4A8B5E" name="Leaf Green" hex="#4A8B5E" />
                  <ColorSwatch color="#ED6C02" name="Burnt Orange" hex="#ED6C02" />
                  <ColorSwatch color="#F5923A" name="Harvest Gold" hex="#F5923A" />
                  <ColorSwatch color="#FFFFFF" name="White" hex="#FFFFFF" />
                </div>
              </div>
            </ScrollRevealLeft>

            {/* Typography & Principles */}
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
                      <p className="text-white text-base">Inter Regular — for readable body text in both English and Swahili</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">Design Principles</h3>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Accessibility First",
                        desc: "Voice delivery and multi-language support ensure every farmer can use the platform regardless of literacy level",
                      },
                      {
                        title: "Conversational Data",
                        desc: "Complex sensor readings translated into metaphors and plain language that farmers relate to naturally",
                      },
                      {
                        title: "Action-Oriented",
                        desc: "Every data point leads to a clear recommendation with cost, deadline, and step-by-step instructions",
                      },
                    ].map((principle) => (
                      <div key={principle.title} className="p-4 rounded-xl bg-white/5">
                        <p className="text-white font-medium text-sm mb-1">{principle.title}</p>
                        <p className="text-white/50 text-xs leading-relaxed">{principle.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      {/* ── 12. Tools & Technology ── */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionHeading label="Tools & Technology" title="The stack behind the solution" accentColor={ORANGE} />
          </div>

          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8" stagger={0.08}>
            {/* GitHub */}
            <div className="group p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${GREEN}15` }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill={GREEN}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-poppins)] text-foreground">GitHub</h4>
              <p className="text-xs text-muted-foreground mt-1">Version Control</p>
            </div>

            {/* Claude AI */}
            <div className="group p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${GREEN}15` }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill={GREEN}><path d="M17.2 24c-.32 0-.64-.12-.88-.36L12 19.32l-4.32 4.32a1.24 1.24 0 01-1.76 0 1.24 1.24 0 010-1.76L10.24 17l-4.32-4.88a1.24 1.24 0 011.76-1.76L12 15.68l4.32-5.32a1.24 1.24 0 011.76 1.76L13.76 17l4.32 4.88c.48.48.48 1.28 0 1.76-.24.24-.56.36-.88.36z"/><circle cx="12" cy="8" r="5"/></svg>
              </div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-poppins)] text-foreground">Claude AI</h4>
              <p className="text-xs text-muted-foreground mt-1">AI Assistant</p>
            </div>

            {/* Z.AI */}
            <div className="group p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${GREEN}15` }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill={GREEN}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-poppins)] text-foreground">Z.AI</h4>
              <p className="text-xs text-muted-foreground mt-1">AI Platform</p>
            </div>

            {/* Visual Studio */}
            <div className="group p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${GREEN}15` }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill={GREEN}><path d="M17.583 2.322l-5.106 4.86L6.5 3.5 2.5 6.5v11l4 3 5.977-3.682 5.106 4.86L21.5 19V5l-3.917-2.678zM6.5 16V8l4 3v2l-4 3zm11 1l-4-3v-4l4-3v10z"/></svg>
              </div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-poppins)] text-foreground">Visual Studio</h4>
              <p className="text-xs text-muted-foreground mt-1">Code Editor</p>
            </div>

            {/* Nano Banana Banani AI */}
            <div className="group p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${GREEN}15` }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill={GREEN}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-poppins)] text-foreground">Nano Banana Banani AI</h4>
              <p className="text-xs text-muted-foreground mt-1">AI Tool</p>
            </div>

            {/* FlowStep */}
            <div className="group p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${GREEN}15` }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill={GREEN}><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>
              </div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-poppins)] text-foreground">FlowStep</h4>
              <p className="text-xs text-muted-foreground mt-1">UX Workflow</p>
            </div>

            {/* Figma */}
            <div className="group p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${GREEN}15` }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill={GREEN}><path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zM4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zM4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4zM12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0zM20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z"/></svg>
              </div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-poppins)] text-foreground">Figma</h4>
              <p className="text-xs text-muted-foreground mt-1">Design Tool</p>
            </div>

            {/* Figma Make */}
            <div className="group p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5 hover:border-[#4A8B5E]/30 transition-all duration-500 hover:bg-secondary/60 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${GREEN}15` }}>
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill={GREEN}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h4 className="text-sm font-bold font-[family-name:var(--font-poppins)] text-foreground">Figma Make</h4>
              <p className="text-xs text-muted-foreground mt-1">AI Prototyping</p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 13. Outcomes ── */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <SectionHeading label="Outcomes" title="Empowering farmers through understanding" accentColor={ORANGE} />
          </div>

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" stagger={0.12}>
            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${GREEN}15` }}>
                <Lightbulb className="w-7 h-7" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Informed Decisions</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Farmers can make better-informed decisions based on real-time sensor data translated into actionable recommendations. The gap between data availability and farmer understanding was eliminated through conversational design and voice delivery.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${GREEN}15` }}>
                <Sprout className="w-7 h-7" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Improved Farm Management</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Smart reminders and step-by-step task instructions improved on-time execution of critical farming activities. Farmers no longer miss optimal planting windows or fertilizer application deadlines because of timely, contextual notifications.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${GREEN}15` }}>
                <BarChart3 className="w-7 h-7" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Reduced Data Complexity</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Farmers reduced reliance on complex technical reports by receiving pre-interpreted insights. The platform eliminated the need for agricultural officers to manually translate soil data for each farmer, scaling knowledge delivery.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${GREEN}15` }}>
                <Globe className="w-7 h-7" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Language Accessibility</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Multi-language support including Kiswahili, Kalenjin, and Kikuyu ensured that critical farming insights reached farmers in their mother tongue. Voice delivery made the platform accessible to users regardless of literacy level.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${GREEN}15` }}>
                <Bell className="w-7 h-7" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Timely Alerts</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Weather-linked reminders and environmental alerts kept farmers informed through timely notifications. The system connected real-time conditions to actionable guidance, ensuring recommendations were relevant to current farm realities.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl border border-foreground/5 bg-secondary/30 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${GREEN}15` }}>
                <Users className="w-7 h-7" style={{ color: GREEN }} />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">Research-Driven Design</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The project demonstrated the power of UX research in agricultural technology. Stakeholder interviews, market analysis, and user insights directly shaped feature prioritization, proving that user-centered design principles apply universally.
              </p>
            </div>
          </StaggerReveal>

          {/* Figma CTA */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <a
                href="https://www.figma.com/deck/lZy1RpGIHIaL2WsBdfbuDT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-colors duration-300 text-white"
                style={{ backgroundColor: GREEN }}
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
                  href="/projects/schoolpata"
                  className="group inline-flex items-center gap-4"
                >
                  <h3 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] text-foreground group-hover:text-accent transition-colors duration-300">
                    School Pata
                  </h3>
                  <ArrowRight className="w-6 h-6 text-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-2" />
                </Link>
                <p className="mt-2 text-muted-foreground text-sm">
                  School discovery and comparison platform for parents
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
