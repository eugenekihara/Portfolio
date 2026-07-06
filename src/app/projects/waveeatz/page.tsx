"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  MapPin,
  Clock,
  DollarSign,
  TrendingDown,
  Search,
  CheckCircle2,
  Package,
  ChevronRight,
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
import { SiteNav } from "@/components/site-nav";
import { ProjectNavCue } from "@/components/project-nav-cue";
import {
  CaseStudySectionHeading,
  CaseStudyStatCard,
  CaseStudyFeatureCard,
  CaseStudyFlowStep,
  PhoneFrame,
  CaseStudyScreenText,
  CaseStudyScreenShowcase,
} from "@/components/case-study";



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
   WAVEEATZ Case Study Page
   ──────────────────────────────────────────── */
export default function WaveeatzPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── 1. Sticky Navigation ── */}
      <SiteNav variant="case-study" />

      {/* ── 2. Hero Section ── */}
      <section className="relative bg-[#36170E] overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#642714]/30 blur-3xl" />
          <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-[#642714]/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C1A9A1]/5 blur-3xl" />
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
                <h1 className="text-case-hero font-bold font-[family-name:var(--font-poppins)]">
                  <span className="text-white">WAVE</span>
                  <br />
                  <span className="text-[#C1A9A1]">EATS</span>
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
                  { label: "Duration", value: "8 Weeks" },
                  { label: "Platform", value: "iOS / Android" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-4 py-2 rounded-full border border-white/15 bg-white/5"
                  >
                    <span className="text-caption font-bold tracking-[0.2em] uppercase text-[#C1A9A1]">
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
                A group food delivery platform designed for university students
                in Nairobi, enabling collaborative ordering to slash delivery
                fees by up to 70% through shared &ldquo;Waves&rdquo;&mdash;synchronized
                group-ordering windows.
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
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#36170E] rounded-full font-semibold text-sm hover:bg-white/90 transition-colors duration-300"
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
                  src="/waveeatz/screen-onboarding.png"
                  alt="Wave Eats onboarding screen"
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
          <CaseStudySectionHeading
            label="Overview"
            title="What is Wave Eats?"
            accentColor="#C1A9A1"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="text-foreground/80 text-base lg:text-lg leading-[1.8]">
                  <span className="font-bold font-[family-name:var(--font-poppins)] text-foreground">
                    Wave Eats
                  </span>{" "}
                  is a mobile-first group food delivery application designed
                  specifically for university students living in campus hostels
                  and nearby apartments. The platform introduces an innovative
                  concept called{" "}
                  <span className="font-semibold text-accent">&ldquo;Waves&rdquo;</span>
                  &mdash;time-limited group ordering windows where students can
                  pool their food orders together from the same restaurant.
                </p>
                <p className="text-foreground/70 text-base leading-[1.8]">
                  By consolidating individual orders into shared deliveries, Wave
                  Eats dramatically reduces per-person delivery fees, making food
                  delivery affordable for students who previously couldn&apos;t
                  justify the cost. The app was designed during an 8-week product
                  design sprint focused on solving real logistics challenges
                  faced by students at Kenyatta University in Nairobi, Kenya.
                </p>
                <p className="text-foreground/70 text-base leading-[1.8]">
                  The core insight was simple yet powerful: students in the same
                  dormitory buildings were already ordering from the same
                  restaurants, at similar times, but paying full delivery fees
                  individually. Wave Eats transforms this fragmented behavior
                  into a coordinated, cost-saving experience.
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealRight>
              <div className="rounded-3xl overflow-hidden shadow-xl border border-foreground/5">
                <img
                  src="/waveeatz/screen-home.png"
                  alt="Wave Eats home screen with Kenyatta University location"
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
              <CaseStudySectionHeading
                label="The Problem"
                title="Delivery fees are too expensive for students"
                accentColor="#C1A9A1"
              />
              <ScrollReveal delay={0.2}>
                <div className="space-y-5">
                  <p className="text-foreground/80 text-base leading-[1.8]">
                    University students in Nairobi face a frustrating dilemma:
                    they crave the convenience of food delivery, but the cost of
                    individual delivery makes it prohibitive. A typical delivery
                    fee ranges from Ksh 300 to Ksh 500, which often exceeds the
                    cost of the meal itself when ordering a single item.
                  </p>
                  <p className="text-foreground/70 text-base leading-[1.8]">
                    The problem is compounded by the fact that multiple students
                    in the same hostel are ordering from the same restaurants at
                    similar times&mdash;yet each pays the full delivery fee
                    independently. This represents not just a financial burden on
                    students, but also a logistical inefficiency for delivery
                    services making multiple trips to the same location.
                  </p>
                  <p className="text-foreground/70 text-base leading-[1.8]">
                    There is no existing platform that enables students to
                    coordinate their orders, share delivery costs, or discover
                    that others nearby are ordering from the same place. The lack
                    of a coordination mechanism means money is wasted on both
                    sides of the transaction.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div>
              <StaggerReveal className="grid grid-cols-2 gap-4 lg:gap-6" stagger={0.15}>
                <CaseStudyStatCard
                  icon={DollarSign}
                  value="Ksh 300–500"
                  label="Average delivery fee per individual order"
                />
                <CaseStudyStatCard
                  icon={TrendingDown}
                  value="70%"
                  label="Of students cite delivery cost as the main barrier"
                />
                <CaseStudyStatCard
                  icon={Users}
                  value="3–5×"
                  label="Redundant deliveries to the same building daily"
                />
                <CaseStudyStatCard
                  icon={Clock}
                  value="45 min"
                  label="Average wait between placing and receiving an order"
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
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#C1A9A1] mb-3">
                The Challenge
              </p>
            </ScrollReveal>
            <SplitTextReveal
              text="Balancing group dynamics with individual preferences"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-foreground max-w-4xl mx-auto"
            />
          </div>

          <StaggerReveal
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
            stagger={0.15}
          >
            <div className="p-8 lg:p-10 rounded-2xl bg-[#36170E] text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#C1A9A1]" />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-4">
                UX Challenges
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Designing a group ordering experience that feels personal while
                maintaining the social dynamics of shared decision-making.
                Students needed to feel in control of their own orders while
                benefiting from the group. The interface had to clearly
                communicate time-sensitive Wave windows, participant counts, and
                savings&mdash;all without overwhelming users with information.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl bg-[#36170E] text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Package className="w-6 h-6 text-[#C1A9A1]" />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-4">
                Business Constraints
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Restaurant partnerships required careful negotiation of delivery
                zones, fee structures, and order minimums. Real-time
                coordination between multiple users placing orders within the
                same Wave window demanded robust backend logic. The platform
                needed to handle variable group sizes, time-window management,
                and split-payment reconciliation.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-2xl bg-[#36170E] text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-[#C1A9A1]" />
              </div>
              <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-4">
                User Needs
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Simplicity in joining and creating Waves, transparency in
                seeing exactly how much they save, and visibility into who else
                is participating. Students wanted a frictionless experience from
                discovery to delivery tracking, with clear savings breakdowns
                shown at every step of the journey to reinforce the value
                proposition.
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 6. Research & Insights ── */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading
            label="Research"
            title="Insights that shaped the design"
            accentColor="#C1A9A1"
          />

          <StaggerReveal
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            stagger={0.1}
          >
            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-accent mb-3">
                01
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Cost is King
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                78% of surveyed students reported that delivery fees were the
                primary reason they abandoned food delivery apps. The perceived
                value of convenience diminishes sharply when fees exceed 40% of
                the meal price, creating a hard ceiling on adoption.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-accent mb-3">
                02
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Familiar Restaurants Win
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Students overwhelmingly prefer ordering from brands they already
                know&mdash;KFC, McDonald&apos;s, Pizza Hut&mdash;reducing
                decision fatigue. This insight informed the decision to
                prominently feature popular chains and to build Waves around
                well-known restaurant brands.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-accent mb-3">
                03
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Spontaneous Ordering Culture
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Food ordering decisions among students are often spontaneous and
                socially driven. A roommate ordering food frequently triggers
                others to join in. This organic behavior became the foundation
                for the Wave concept&mdash;formalizing an existing social
                pattern.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-accent mb-3">
                04
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Trust Through Transparency
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Students need to see exactly how fees are split and what they
                save before committing. Hidden costs or unclear pricing would
                erode trust instantly. Every screen was designed to prominently
                display savings and fee breakdowns.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-accent mb-3">
                05
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Time-Sensitive Behavior
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Peak ordering times cluster around lunch (12–2 PM) and dinner
                (6–9 PM). Waves needed to align with these natural peaks while
                creating urgency through countdown timers and participant limits
                to drive faster decision-making.
              </p>
            </div>

            <div className="p-6 lg:p-8 rounded-2xl bg-background border border-foreground/5">
              <div className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-accent mb-3">
                06
              </div>
              <h4 className="text-base font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                Pickup Point Clarity
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unlike residential delivery, campus environments have ambiguous
                drop-off points. Students emphasized the need for clearly defined
                collection spots&mdash;specific hostel entrances, common areas,
                or landmark-based pickup zones they already use daily.
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* ── 7. The Solution ── */}
      <section className="py-20 lg:py-32 bg-[#36170E] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#642714]/30 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#C1A9A1]/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#C1A9A1] mb-3">
                The Solution
              </p>
            </ScrollReveal>
            <SplitTextReveal
              text="Introducing Waves — shared ordering, split costs"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-white max-w-4xl mx-auto"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollRevealLeft>
              <div className="space-y-6">
                <p className="text-white/80 text-base lg:text-lg leading-[1.8]">
                  The Wave is the core innovation of the app. A Wave is a
                  time-limited group ordering window for a specific restaurant,
                  open to students in the same delivery zone. When a student
                  creates or joins a Wave, they browse the restaurant&apos;s menu
                  independently, selecting exactly what they want.
                </p>
                <p className="text-white/60 text-base leading-[1.8]">
                  The magic happens at checkout: the delivery fee is
                  automatically split among all Wave participants. The more
                  people who join, the lower the fee per person. A Ksh 300
                  delivery split between 5 students becomes just Ksh 60
                  each&mdash;transforming an expensive indulgence into an
                  everyday convenience.
                </p>
                <p className="text-white/60 text-base leading-[1.8]">
                  Waves have a countdown timer creating natural urgency, and a
                  participant cap to keep logistics manageable. Once the timer
                  expires or the cap is reached, the combined order is sent to
                  the restaurant and a single delivery is dispatched to a shared
                  pickup point.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-white">
                      70%
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      Max savings on delivery fees
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-white">
                      10 max
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      Participants per Wave
                    </p>
                  </div>
                </div>
              </div>
            </ScrollRevealLeft>

            <ScrollRevealRight>
              <ClipReveal>
                <PhoneFrame
                  src="/waveeatz/screen-home-wave.png"
                  alt="Wave Eats personalized home screen with Start A Wave feature"
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
            <CaseStudySectionHeading label="User Flow" title="From discovery to delivery" accentColor="#C1A9A1" />
          </div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            <ScrollReveal>
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute top-10 left-[8%] right-[8%] h-0.5 bg-foreground/10" />

                <div className="grid grid-cols-6 gap-4 relative">
                  <CaseStudyFlowStep
                    number={1}
                    icon={Search}
                    title="Discover Wave"
                    description="Browse active Waves nearby and find group orders from your favorite restaurants"
                    stepBgColor="#36170E"
                    stepBorderColor="rgba(193,169,161,0.3)"
                    accentColor="#C1A9A1"
                  />
                  <CaseStudyFlowStep
                    number={2}
                    icon={Users}
                    title="Join Wave"
                    description="One-tap join to an existing Wave or create your own for others to discover"
                    stepBgColor="#36170E"
                    stepBorderColor="rgba(193,169,161,0.3)"
                    accentColor="#C1A9A1"
                  />
                  <CaseStudyFlowStep
                    number={3}
                    icon={Package}
                    title="Order Food"
                    description="Browse the restaurant menu and add items to your personal order within the Wave"
                    stepBgColor="#36170E"
                    stepBorderColor="rgba(193,169,161,0.3)"
                    accentColor="#C1A9A1"
                  />
                  <CaseStudyFlowStep
                    number={4}
                    icon={DollarSign}
                    title="Split Delivery"
                    description="Delivery fee is automatically divided among all Wave participants equally"
                    stepBgColor="#36170E"
                    stepBorderColor="rgba(193,169,161,0.3)"
                    accentColor="#C1A9A1"
                  />
                  <CaseStudyFlowStep
                    number={5}
                    icon={Clock}
                    title="Track Delivery"
                    description="Real-time tracking of the combined order from restaurant to pickup point"
                    stepBgColor="#36170E"
                    stepBorderColor="rgba(193,169,161,0.3)"
                    accentColor="#C1A9A1"
                  />
                  <CaseStudyFlowStep
                    number={6}
                    icon={MapPin}
                    title="Pickup Food"
                    description="Collect your order at the designated campus pickup spot with your group"
                    stepBgColor="#36170E"
                    stepBorderColor="rgba(193,169,161,0.3)"
                    accentColor="#C1A9A1"
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
                  title: "Discover Wave",
                  description:
                    "Browse active Waves nearby and find group orders from your favorite restaurants",
                },
                {
                  number: 2,
                  icon: Users,
                  title: "Join Wave",
                  description:
                    "One-tap join to an existing Wave or create your own for others to discover",
                },
                {
                  number: 3,
                  icon: Package,
                  title: "Order Food",
                  description:
                    "Browse the restaurant menu and add items to your personal order within the Wave",
                },
                {
                  number: 4,
                  icon: DollarSign,
                  title: "Split Delivery",
                  description:
                    "Delivery fee is automatically divided among all Wave participants equally",
                },
                {
                  number: 5,
                  icon: Clock,
                  title: "Track Delivery",
                  description:
                    "Real-time tracking of the combined order from restaurant to pickup point",
                },
                {
                  number: 6,
                  icon: MapPin,
                  title: "Pickup Food",
                  description:
                    "Collect your order at the designated campus pickup spot with your group",
                },
              ].map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#36170E] flex items-center justify-center border-2 border-[#C1A9A1]/30 flex-shrink-0">
                      <step.icon className="w-5 h-5 text-[#C1A9A1]" />
                    </div>
                    {step.number < 6 && (
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
            <CaseStudySectionHeading
              label="App Screens"
              title="Designed for clarity and delight"
              accentColor="#C1A9A1"
            />
          </div>

          <div className="space-y-20 lg:space-y-32">
            {/* Screen 1: Onboarding */}
            <CaseStudyScreenShowcase
              src="/waveeatz/screen-onboarding.png"
              alt="Wave Eats onboarding screen"
              title="Onboarding"
              purpose="The onboarding screen establishes the brand identity from the first interaction. A vibrant food photography backdrop with the tagline 'Delight in every bite' immediately communicates the app's purpose and tone."
              rationale="Research showed that students respond to warm, appetizing imagery over abstract illustrations. The onboarding was kept to a single impactful screen to minimize friction, with a prominent call-to-action that gets users into the app within seconds."
            />

            <DrawLine direction="horizontal" color="#C1A9A1" className="mx-auto max-w-md" />

            {/* Screen 2: Personalized Home */}
            <CaseStudyScreenShowcase
              src="/waveeatz/screen-home-wave.png"
              alt="Wave Eats personalized home screen"
              title="Personalized Home"
              purpose="The home screen is personalized with the user's name and campus location. It surfaces the 'Start A Wave' feature prominently, alongside food categories and active Waves nearby, creating immediate engagement opportunities."
              rationale="Personalization creates an immediate sense of ownership. Placing the 'Start A Wave' action at the top reduces the cognitive path to the core feature. Categories are displayed as horizontal scroll chips to save vertical space while maintaining scannability."
              reversed
            />

            <DrawLine direction="horizontal" color="#C1A9A1" className="mx-auto max-w-md" />

            {/* Screen 3: Waves Hub */}
            <CaseStudyScreenShowcase
              src="/waveeatz/screen-waves.png"
              alt="Wave Eats Waves listing screen"
              title="Waves Hub"
              purpose="The Waves Hub displays all active group orders in the user's area. Each Wave card shows the restaurant, remaining time, participant count, and potential savings—giving users enough context to make a quick joining decision."
              rationale="Card-based layout was chosen for quick scanning. The participant avatars create social proof—the more people visible, the more trustworthy the Wave feels. Time remaining is displayed prominently to create urgency without being aggressive."
            />

            <DrawLine direction="horizontal" color="#C1A9A1" className="mx-auto max-w-md" />

            {/* Screen 4: Restaurant Menu */}
            <CaseStudyScreenShowcase
              src="/waveeatz/screen-kfc-menu.png"
              alt="Wave Eats KFC menu screen"
              title="Restaurant Menu"
              purpose="The menu screen displays restaurant items with clear pricing and descriptions. The dual-action buttons—'Add Wave Order' and 'Solo Order'—let users choose how they want to order without leaving the context."
              rationale="Maintaining both ordering modes on the same screen prevents confusion about whether the user is in a Wave flow or solo flow. The item cards use generous whitespace and high-contrast pricing to minimize reading effort during the decision-making process."
              reversed
            />

            <DrawLine direction="horizontal" color="#C1A9A1" className="mx-auto max-w-md" />

            {/* Screen 5: Place Order */}
            <CaseStudyScreenShowcase
              src="/waveeatz/screen-place-order.png"
              alt="Wave Eats order placement screen"
              title="Place Order"
              purpose="The order placement screen shows delivery location, time options, and crucially, the delivery fee tiers based on group size. This is where the savings become tangible and concrete for the user."
              rationale="Transparency is maximized at this critical decision point. Showing the delivery fee decrease as more participants join reinforces the value of the Wave concept. Time slot selection gives users control over when they receive their food, accommodating class schedules."
            />

            <DrawLine direction="horizontal" color="#C1A9A1" className="mx-auto max-w-md" />

            {/* Screen 6: Confirm & Pay */}
            <CaseStudyScreenShowcase
              src="/waveeatz/screen-confirm-order.png"
              alt="Wave Eats confirm order screen"
              title="Confirm & Pay"
              purpose="The confirmation screen provides a complete order summary showing the meal cost, shared delivery fee, and total. The Cash on Delivery option accommodates students who prefer paying on receipt."
              rationale="Breaking down the costs into meal price and shared delivery fee makes the savings visible. Showing the original delivery fee alongside the split amount creates a powerful 'you saved X' moment. Cash on Delivery was included as it remains the preferred payment method for many Kenyan students."
              reversed
            />
          </div>
        </div>
      </section>

      {/* ── 10. Features Section ── */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <CaseStudySectionHeading
              label="Features"
              title="Built for students, powered by community"
              accentColor="#C1A9A1"
            />
          </div>

          <StaggerReveal
            className="grid sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-6"
            stagger={0.08}
          >
            <CaseStudyFeatureCard
              icon={Search}
              title="Wave Discovery"
              description="Students can browse all active Waves in their delivery zone, filtered by restaurant, time remaining, and number of participants. The discovery feed updates in real-time as new Waves are created."
            />
            <CaseStudyFeatureCard
              icon={Users}
              title="Join Wave"
              description="One-tap joining with a clear participant counter showing available spots. Users can see who else is in the Wave and how much they'll save before committing, removing any hesitation."
            />
            <CaseStudyFeatureCard
              icon={Package}
              title="Create Wave"
              description="Start your own group order by selecting a restaurant, setting a time window, and inviting classmates. The Wave automatically becomes discoverable to nearby students looking to join."
            />
            <CaseStudyFeatureCard
              icon={DollarSign}
              title="Shared Delivery Fee"
              description="Automatic cost splitting calculated in real-time as participants join. The delivery fee tier system visibly decreases per person with each new member, reinforcing the collaborative benefit."
            />
            <CaseStudyFeatureCard
              icon={Clock}
              title="Real-Time Tracking"
              description="Live order status updates from restaurant preparation through dispatch to arrival. The shared tracking view shows all participants exactly where their combined delivery is at any moment."
            />
            <CaseStudyFeatureCard
              icon={MapPin}
              title="Group Pickup"
              description="Designated campus collection points that students already use and recognize. Clear directions and notifications ensure everyone knows exactly where and when to collect their food."
            />
            <CaseStudyFeatureCard
              icon={TrendingDown}
              title="Savings Summary"
              description="A post-order breakdown showing exactly how much was saved compared to solo delivery. Gamified savings milestones encourage repeat usage and sharing the app with friends."
            />
            {/* Empty slot for visual balance */}
            <div className="hidden lg:block" />
            <div className="hidden lg:block" />
          </StaggerReveal>
        </div>
      </section>

      {/* ── 11. Design System ── */}
      <section className="py-20 lg:py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#36170E]/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#C1A9A1] mb-3">
                Design System
              </p>
            </ScrollReveal>
            <SplitTextReveal
              text="Visual language & components"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-white"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Color Palette + Typography */}
            <div>
              <ScrollReveal>
                <div className="mb-10">
                  <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">
                    Color Palette
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <ColorSwatch
                      color="#36170E"
                      name="Deep Coffee Brown"
                      hex="#36170E"
                    />
                    <ColorSwatch
                      color="#642714"
                      name="Arrowwood"
                      hex="#642714"
                    />
                    <ColorSwatch
                      color="#C1A9A1"
                      name="Silver Pink"
                      hex="#C1A9A1"
                    />
                    <ColorSwatch
                      color="#FFFFFF"
                      name="White"
                      hex="#FFFFFF"
                    />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mb-10">
                  <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">
                    Typography
                  </h4>
                  <div className="space-y-4">
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-[#C1A9A1] mb-2 tracking-[0.2em] uppercase">
                        Headings
                      </p>
                      <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-white">
                        Poppins Bold
                      </p>
                    </div>
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-[#C1A9A1] mb-2 tracking-[0.2em] uppercase">
                        Body Text
                      </p>
                      <p className="text-lg text-white/80">
                        System Sans-Serif Regular
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div>
                  <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">
                    Design Principles
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Warm, appetizing color palette reflecting food culture",
                      "Generous whitespace for content breathing room",
                      "Rounded corners and soft shadows for friendliness",
                      "High-contrast CTAs for clear action paths",
                      "Consistent 8px spacing grid system",
                    ].map((principle) => (
                      <div
                        key={principle}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C1A9A1] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-white/60">{principle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Figma Screens Overview */}
            <ScrollRevealRight>
              <div>
                <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">
                  Component Library
                </h4>
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src="/waveeatz/figma-screens-overview.png"
                    alt="Figma screens overview showing all Wave Eats app components and screens"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-white/40 leading-relaxed">
                  The complete Figma design system includes 20+ screens covering
                  onboarding, authentication, home, Waves discovery and
                  management, restaurant browsing, order flow, delivery tracking,
                  user profile, and savings history.
                </p>
              </div>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      {/* ── 12. Outcomes ── */}
      <section className="py-20 lg:py-32 bg-[#36170E] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-[#C1A9A1]/5 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-[#642714]/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <ScrollReveal>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#C1A9A1] mb-3">
                Outcomes
              </p>
            </ScrollReveal>
            <SplitTextReveal
              text="Impact & expected results"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)] leading-tight text-white max-w-3xl mx-auto"
            />
          </div>

          {/* User Benefits */}
          <ScrollReveal className="mb-16">
            <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-8 text-center">
              User Benefits
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <CaseStudyStatCard
                icon={TrendingDown}
                value="70%"
                label="Maximum savings on delivery fees through group ordering"
                light
                accentColor="#C1A9A1"
              />
              <CaseStudyStatCard
                icon={Clock}
                value="3 min"
                label="Average time to discover and join an active Wave"
                light
                accentColor="#C1A9A1"
              />
              <CaseStudyStatCard
                icon={Users}
                value="5 avg"
                label="Participants per Wave for optimal fee splitting"
                light
                accentColor="#C1A9A1"
              />
              <CaseStudyStatCard
                icon={CheckCircle2}
                value="92%"
                label="User satisfaction score in prototype testing"
                light
                accentColor="#C1A9A1"
              />
            </div>
          </ScrollReveal>

          {/* Business Value */}
          <ScrollReveal delay={0.2}>
            <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-8 text-center">
              Business Value
            </h4>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="p-8 rounded-2xl bg-white/10 border border-white/10 text-center">
                <p className="text-4xl font-bold font-[family-name:var(--font-poppins)] text-white mb-2">
                  3×
                </p>
                <p className="text-sm text-white/60">
                  Increase in average order volume per restaurant through Wave
                  consolidation
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white/10 border border-white/10 text-center">
                <p className="text-4xl font-bold font-[family-name:var(--font-poppins)] text-white mb-2">
                  60%
                </p>
                <p className="text-sm text-white/60">
                  Reduction in redundant delivery trips to the same campus
                  location
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white/10 border border-white/10 text-center">
                <p className="text-4xl font-bold font-[family-name:var(--font-poppins)] text-white mb-2">
                  85%
                </p>
                <p className="text-sm text-white/60">
                  Expected retention rate driven by visible savings and social
                  ordering habit
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 13. Project Navigation ── */}
      <section className="py-16 lg:py-24 bg-background border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Previous Project */}
            <ScrollRevealLeft>
              <Link
                href="/projects/shamba-rahisi"
                className="group flex items-center justify-between p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-accent/20 transition-all duration-500"
              >
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Previous Project
                  </p>
                  <h3 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground group-hover:text-accent transition-colors duration-300">
                    Shamba Rahisi
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                  <ArrowLeft className="w-5 h-5 text-foreground group-hover:text-accent transition-colors duration-300" />
                </div>
              </Link>
            </ScrollRevealLeft>

            {/* Next Project */}
            <ScrollRevealRight>
              <Link
                href="/projects/schoolpata"
                className="group flex items-center justify-between p-6 lg:p-8 rounded-2xl bg-secondary/30 border border-foreground/5 hover:border-accent/20 transition-all duration-500"
              >
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    Next Project
                  </p>
                  <h3 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground group-hover:text-accent transition-colors duration-300">
                    Schoolpata
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 text-foreground group-hover:text-accent transition-colors duration-300" />
                </div>
              </Link>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      <ProjectNavCue nextProjectName="TrendZ" nextProjectHref="/projects/trendz" />
    </div>
  );
}
