"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Stethoscope,
  Pill,
  ShieldCheck,
  Wallet,
  Radio,
  Truck,
  Wheat,
  Volume2,
  UploadCloud,
  Languages,
  Users,
  Sprout,
  Repeat,
  Quote,
  Database,
  Eye,
  Handshake,
  ClipboardList,
  CheckCircle2,
  PiggyBank,
  Leaf,
} from "lucide-react";
import {
  ScrollReveal,
  ScrollRevealLeft,
  ScrollRevealRight,
  Parallax,
  SplitTextReveal,
  StaggerReveal,
  MagneticHover,
} from "@/components/scroll-animations";
import { SiteNav } from "@/components/site-nav";
import {
  CaseStudySectionHeading,
  PhoneFrame,
  CaseStudyColorSwatch,
} from "@/components/case-study";
import { ProjectNavCue } from "@/components/project-nav-cue";

/* ─── Theme Constants ─── */
const GREEN = "#2E5C3E";
const GREEN_DARK = "#1A3A26";
const ORANGE = "#ED6C02";
const ACCENT_GREEN = "#4A8B5E";
const S = "/shamba-rahisi";

/* ─── Evidence labels: keep research, design decisions and proposals apart ─── */
const TAGS = {
  evidence: { label: "Research evidence", color: GREEN, style: "solid" },
  design: { label: "Design decision", color: ORANGE, style: "solid" },
  proposed: { label: "Proposed", color: "#6b7280", style: "dashed" },
} as const;

function Tag({ kind, label }: { kind: keyof typeof TAGS; label?: string }) {
  const t = TAGS[kind];
  return (
    <span
      className="inline-flex items-center text-caption font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border"
      style={{
        color: t.color,
        borderColor: `${t.color}55`,
        borderStyle: t.style,
        backgroundColor: t.style === "solid" ? `${t.color}10` : "transparent",
      }}
    >
      {label ?? t.label}
    </span>
  );
}

/* ─── Content ─── */
const researchThemes = [
  {
    icon: Handshake,
    title: "Trust and advice",
    text: "Farmers commonly rely on agro-dealers, agricultural extension officers, cooperatives, neighbors, radio and community training rather than interpreting soil data on their own. Digital guidance may be more accessible when it reflects these familiar, trusted sources.",
  },
  {
    icon: Database,
    title: "Understanding soil data",
    text: "Raw sensor readings are difficult to translate into specific farming decisions. Farmers need clear, practical recommendations rather than data alone.",
  },
  {
    icon: Wallet,
    title: "Affordability",
    text: "Limited cash can lead farmers to delay purchases, buy smaller quantities or choose cheaper substitutes, which may affect crop performance.",
  },
  {
    icon: Truck,
    title: "Input access and quality",
    text: "Recommended fertilizers or other specialized inputs may not be available nearby. Transport costs, counterfeit products and supply delays add further barriers.",
  },
  {
    icon: ClipboardList,
    title: "Implementation",
    text: "Even when farmers receive a recommendation, cost, unclear instructions, or farm workers not applying it correctly can stop it from being acted on.",
  },
  {
    icon: Languages,
    title: "Language and digital access",
    text: "Some farmers have limited digital literacy and may prefer local-language voice guidance or simpler, phone-based experiences.",
  },
  {
    icon: Users,
    title: "Gender and decision-making",
    text: "Women often carry out much of the farm work, while men may control financial and input-purchasing decisions. Women also take part in cooperatives and group farming.",
  },
];

const roleItems = [
  {
    title: "Stakeholder interviews",
    text: "Organized and coordinated stakeholder interviews with Synnefa and documented the outcomes.",
  },
  {
    title: "Market and user research",
    text: "Researched agricultural technology trends and farmer challenges, and reviewed existing solutions to spot gaps.",
  },
  {
    title: "Problem identification",
    text: "Identified pain points around interpreting agricultural data and defined the core problem areas.",
  },
  {
    title: "Research to strategy",
    text: "Contributed research findings that informed feature prioritization and product direction.",
  },
];

const personas = [
  {
    name: "Joseph",
    age: 45,
    role: "Smallholder farmer",
    place: "Nakuru",
    farm: "2 acres of maize and beans",
    context: "Limited digital experience. Relies on agro-dealers and neighbors.",
    needs: [
      "Simple explanations of soil conditions",
      "Practical recommendations",
      "Nearby input suppliers",
    ],
  },
  {
    name: "Mary",
    age: 38,
    role: "Cooperative vegetable farmer",
    place: "Kirinyaga",
    farm: "1.5 acres",
    context: "Uses a smartphone but prefers voice guidance.",
    needs: [
      "Understandable recommendations",
      "Information on input availability",
      "Flexible ways to manage costs",
    ],
  },
  {
    name: "Daniel",
    age: 29,
    role: "Technology-curious farmer",
    place: "Eldoret",
    farm: "3 acres",
    context: "Comfortable using apps but lacks reliable, actionable advice.",
    needs: [
      "Soil-data interpretation",
      "Timely alerts",
      "Trusted input suppliers",
    ],
  },
];

const layers = [
  {
    key: "Doctor",
    verb: "Understand",
    icon: Stethoscope,
    what: "Interprets soil sensor data into simple, actionable recommendations.",
    responds: ["Understanding soil data", "Language and digital access"],
    status: "design" as const,
    statusLabel: "In the prototype",
    statusNote: "Recommendation, task and voice-settings screens.",
  },
  {
    key: "Pharmacist",
    verb: "Access",
    icon: Pill,
    what: "Helps farmers discover nearby agro-dealers and locate the recommended inputs.",
    responds: ["Input access and quality", "Trust and advice"],
    status: "proposed" as const,
    statusLabel: "Proposed",
    statusNote: "No screen for this layer yet.",
  },
  {
    key: "Insurance",
    verb: "Afford",
    icon: ShieldCheck,
    what: "Supports financial planning through options such as savings and group purchasing.",
    responds: ["Affordability", "Implementation"],
    status: "design" as const,
    statusLabel: "Early signs in the prototype",
    statusNote: "Cost estimates and a savings-goal action. No insurance product was designed.",
  },
];

const journey = [
  { icon: Radio, title: "Sensors collect data", layer: "Sensors" },
  { icon: UploadCloud, title: "Data is uploaded", layer: "Sensors" },
  { icon: Stethoscope, title: "Doctor interprets the readings", layer: "Doctor" },
  { icon: Volume2, title: "Farmer gets a local-language voice alert", layer: "Doctor" },
  { icon: Pill, title: "Pharmacist helps locate a nearby supplier", layer: "Pharmacist" },
  { icon: PiggyBank, title: "Insurance supports cost planning", layer: "Insurance" },
  { icon: Wheat, title: "Farmer buys and applies the input", layer: "Farmer" },
  { icon: Eye, title: "Sensors help monitor soil conditions", layer: "Sensors" },
];

const layerColor: Record<string, string> = {
  Sensors: "#6b7280",
  Doctor: GREEN,
  Pharmacist: ORANGE,
  Insurance: "#8A5A00",
  Farmer: ACCENT_GREEN,
};

const screens = [
  {
    src: `${S}/screen-onboarding-data-source.png`,
    alt: "Data source selection screen",
    title: "Data source",
    shows: "Asks how the farmer wants to provide soil and farm information: soil test results, an extension officer, or manual entry. Shown in English and Swahili.",
    reflects: "Trust and advice: an extension officer is one of three ways in.",
  },
  {
    src: `${S}/screen-onboarding-connect-synnefa.png`,
    alt: "Connect sensor account screen",
    title: "Connect sensors",
    shows: "Links a sensor account so readings can sync. This is the “data is uploaded” step of the flow.",
    reflects: null,
  },
  {
    src: `${S}/screen-home.png`,
    alt: "Home screen with priority task",
    title: "Home",
    shows: "A farm summary (size, soil pH, crop), today’s weather, a priority recommendation and quick actions such as Map a Field and Join a Chama.",
    reflects: "Action over data: the highest-priority task leads the screen.",
  },
  {
    src: `${S}/screen-recommendation.png`,
    alt: "Recommendation screen for low nitrogen",
    title: "Recommendation",
    shows: "Soil status per reading, a plain-language explanation, the recommended input, quantity, estimated cost, deadline and instructions, with Add to Tasks and Set Savings Goal.",
    reflects: "Understanding soil data and affordability sit on the same screen.",
  },
  {
    src: `${S}/screen-task-details.png`,
    alt: "Task details screen with numbered instructions",
    title: "Task details",
    shows: "Numbered instructions for applying the input, plus a check that the farmer is at the correct location.",
    reflects: "Implementation: clear steps support correct application.",
  },
  {
    src: `${S}/screen-voice-settings.png`,
    alt: "Voice settings screen with language choice",
    title: "Voice settings",
    shows: "Choice of Kiswahili, English, Kalenjin or Kikuyu, a voice gender option, and a sample preview.",
    reflects: "Language and digital access: voice guidance in a language the farmer chooses.",
  },
];

const nextSteps = [
  "Test the concept with farmers who resemble the three profiles.",
  "Check the agro-dealer and savings ideas with suppliers and cooperatives.",
  "Try voice guidance in local languages with farmers who prefer it.",
  "Look at who does the farm work and who decides on purchases, so recommendations reach both.",
];

/* ────────────────────────────────────────────
   SHAMBA RAHISI Case Study Page
   ──────────────────────────────────────────── */
export default function ShambaRahisiPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav variant="case-study" />

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
                <h1 className="text-case-hero font-bold font-[family-name:var(--font-poppins)]">
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
                  { label: "Status", value: "Design concept" },
                  { label: "Platform", value: "Mobile app" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-4 py-2 rounded-full border border-white/15 bg-white/5"
                  >
                    <span className="text-caption font-bold tracking-[0.2em] uppercase" style={{ color: ORANGE }}>
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
                Exploring how farmers can turn soil sensor data into practical
                farming decisions, from stakeholder research to a mobile app
                concept.
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

      {/* ── Overview ── */}
      <section id="overview" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Project Overview" title="From soil data to farming decisions" accentColor={ORANGE} />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <ScrollReveal className="lg:col-span-7">
              <div className="space-y-5 text-foreground/80 text-base lg:text-lg leading-[1.8]">
                <p>
                  Shamba Rahisi explores how farmers can turn soil sensor data into practical farming decisions.
                  A sensor can show what is happening in the ground, but a reading only helps if the farmer
                  understands it, can get what it recommends, and can afford to act on it.
                </p>
                <p>
                  I worked as <span className="font-semibold text-foreground">UX Research Lead</span>. This case
                  study follows the path from research to product direction, and shows where each part comes from.
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-foreground/10 bg-secondary/40 p-5 lg:p-6">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-4">How to read this case study</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3"><Tag kind="evidence" /><span>What the research indicates.</span></li>
                  <li className="flex items-start gap-3"><Tag kind="design" /><span>A choice I made in response to it.</span></li>
                  <li className="flex items-start gap-3"><Tag kind="proposed" /><span>An idea that is not yet designed or tested.</span></li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal className="lg:col-span-5">
              <dl className="rounded-2xl bg-background border border-foreground/10 divide-y divide-foreground/10">
                {[
                  ["Role", "UX Research Lead"],
                  ["Focus", "Stakeholder research, synthesis and product direction"],
                  ["Output", "Research themes, personas, a product concept and Figma screens"],
                  ["Status", "Design concept"],
                ].map(([k, v]) => (
                  <div key={k} className="p-5 lg:p-6">
                    <dt className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: ORANGE }}>{k}</dt>
                    <dd className="mt-1 text-foreground font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="The Problem" title="Having data does not guarantee action" accentColor={ORANGE} />
          <ScrollReveal>
            <p className="max-w-3xl text-foreground/80 text-base lg:text-lg leading-[1.8]">
              Synnefa&rsquo;s dashboards provide soil sensor data. The research synthesis suggests that farmers may
              still need agronomist support to interpret it and decide what to do. The distance between a reading
              and a decision is the problem this project explores.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <ol className="mt-10 flex flex-col sm:flex-row sm:items-stretch gap-3 sm:gap-0" aria-label="From reading to action">
              {["Sensor reading", "Understand it", "Get the input", "Afford it", "Act"].map((step, i, arr) => (
                <li key={step} className="flex items-center sm:flex-1">
                  <span
                    className="flex-1 text-center text-sm font-semibold px-4 py-3 rounded-xl border"
                    style={
                      i === 0 || i === arr.length - 1
                        ? { backgroundColor: GREEN, color: "#fff", borderColor: GREEN }
                        : { backgroundColor: "transparent", color: GREEN, borderColor: `${GREEN}55`, borderStyle: "dashed" }
                    }
                  >
                    {step}
                  </span>
                  {i < arr.length - 1 && <ChevronRight className="hidden sm:block w-5 h-5 shrink-0 text-muted-foreground" aria-hidden="true" />}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">Dashed steps are where the research suggests farmers can get stuck.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Research ── */}
      <section id="research" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Research" title="What the research indicates" accentColor={ORANGE} />

          {/* My role */}
          <ScrollReveal>
            <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mb-5">My role as UX Research Lead</h3>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 mb-16">
            {roleItems.map((r) => (
              <ScrollReveal key={r.title}>
                <div className="h-full p-5 lg:p-6 rounded-2xl bg-secondary/40 border border-foreground/5">
                  <h4 className="font-bold text-foreground">{r.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Stakeholder observation */}
          <ScrollReveal>
            <div className="rounded-2xl border-2 p-6 lg:p-10 mb-16" style={{ borderColor: `${ORANGE}55`, backgroundColor: `${ORANGE}08` }}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: ORANGE }}>Stakeholder interview</span>
                <Tag kind="evidence" label="Stakeholder observation" />
              </div>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <dl className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-4 text-sm">
                  <div><dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Interviewee</dt><dd className="mt-1 font-semibold text-foreground">Stacy Oyalo, Synnefa</dd></div>
                  <div><dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Date</dt><dd className="mt-1 font-semibold text-foreground">March 12, 2026</dd></div>
                  <div><dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Length</dt><dd className="mt-1 font-semibold text-foreground">About 33 minutes</dd></div>
                </dl>
                <div className="lg:col-span-8">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-3">What the research notes indicate</p>
                  <p className="text-foreground/85 text-base lg:text-lg leading-[1.8]">
                    Synnefa&rsquo;s dashboards provide soil sensor data, but farmers may still need agronomist support
                    to interpret it and determine what to do. Having data alone does not guarantee action.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Broader research themes */}
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground">Seven themes from the research synthesis</h3>
              <Tag kind="evidence" label="Broader research findings" />
            </div>
            <p className="max-w-3xl text-sm text-muted-foreground mb-8">
              These are patterns from the wider research, separate from the interview above. They do not describe every farmer.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {researchThemes.map((t, i) => (
              <ScrollReveal key={t.title} className={i === researchThemes.length - 1 ? "lg:col-start-2" : ""}>
                <div className="h-full p-6 rounded-2xl bg-background border border-foreground/10 hover:border-[#4A8B5E]/40 transition-colors duration-300">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${GREEN}12` }}>
                    <t.icon className="w-5 h-5" style={{ color: GREEN }} aria-hidden="true" />
                  </div>
                  <h4 className="font-bold font-[family-name:var(--font-poppins)] text-foreground">{t.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personas ── */}
      <section id="personas" className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Personas" title="Three profiles, three sets of needs" accentColor={ORANGE} />
          <ScrollReveal>
            <p className="max-w-3xl text-sm text-muted-foreground mb-10">
              These are research-informed profiles that represent different needs. They are not verified individual participants.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {personas.map((p) => (
              <ScrollReveal key={p.name}>
                <article className="h-full p-6 lg:p-7 rounded-2xl bg-background border border-foreground/10">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground">{p.name}, {p.age}</h3>
                    <Tag kind="proposed" label="Representative" />
                  </div>
                  <p className="mt-1 text-sm font-medium" style={{ color: GREEN }}>{p.role}, {p.place}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.farm}</p>
                  <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{p.context}</p>
                  <p className="mt-5 text-xs font-bold tracking-[0.2em] uppercase text-foreground">Needs</p>
                  <ul className="mt-3 space-y-2">
                    {p.needs.map((n) => (
                      <li key={n} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_GREEN }} aria-hidden="true" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core insight ── */}
      <section id="insight" className="relative overflow-hidden py-20 lg:py-28" style={{ backgroundColor: GREEN }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: GREEN_DARK }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-6" style={{ color: ORANGE }}>Core insight</p>
            <Quote className="w-8 h-8 mx-auto mb-6 text-white/30" aria-hidden="true" />
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] text-white leading-snug">
              Information alone is not enough. Farmers need help understanding recommendations, finding the inputs they
              require, and deciding how to afford them.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Product direction ── */}
      <section id="solution" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Product Direction" title="A three-layer support system" accentColor={ORANGE} />
          <ScrollReveal>
            <p className="max-w-3xl text-foreground/80 text-base lg:text-lg leading-[1.8] mb-12">
              The concept answers the insight with three layers, named after everyday roles: a doctor who diagnoses,
              a pharmacist who supplies, and insurance that helps manage cost.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {layers.map((l, i) => (
              <ScrollReveal key={l.key}>
                <article className="h-full flex flex-col p-6 lg:p-7 rounded-2xl border border-foreground/10 bg-secondary/30">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: GREEN }}>
                      <l.icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-5xl font-bold font-[family-name:var(--font-poppins)] text-foreground/10 leading-none">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground">
                    {l.key} <span className="font-normal text-muted-foreground">· {l.verb}</span>
                  </h3>
                  <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{l.what}</p>
                  <p className="mt-5 text-xs font-bold tracking-[0.2em] uppercase text-foreground">Responds to</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {l.responds.map((r) => (
                      <li key={r} className="text-xs px-2.5 py-1 rounded-full border border-foreground/10 text-muted-foreground">{r}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    <Tag kind={l.status} label={l.statusLabel} />
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{l.statusNote}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <p className="mt-6 text-xs text-muted-foreground max-w-3xl">
              &ldquo;Insurance&rdquo; is a metaphor for the affordability layer. This project did not develop an insurance product.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── User flow ── */}
      <section id="flow" className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Tag kind="proposed" label="Proposed flow" />
          </div>
          <CaseStudySectionHeading label="User Flow" title="From sensor reading to action" accentColor={ORANGE} />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {journey.map((s, i) => (
              <li key={s.title} className="flex">
                <ScrollReveal className="w-full">
                  <div className="h-full relative p-5 rounded-2xl bg-background border border-foreground/10">
                    <div className="flex items-center justify-between">
                      <span
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${layerColor[s.layer]}18` }}
                      >
                        <s.icon className="w-5 h-5" style={{ color: layerColor[s.layer] }} aria-hidden="true" />
                      </span>
                      <span className="text-sm font-bold font-[family-name:var(--font-poppins)] text-muted-foreground">{i + 1}</span>
                    </div>
                    <p className="mt-4 font-semibold text-foreground leading-snug">{s.title}</p>
                    <p className="mt-2 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: layerColor[s.layer] }}>{s.layer}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
          <ScrollReveal>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Repeat className="w-4 h-4 shrink-0" aria-hidden="true" />
              Monitoring in step 8 produces new readings, so the loop starts again.
            </p>
            <div className="mt-8 rounded-2xl border border-dashed border-foreground/20 p-5 lg:p-6 max-w-3xl">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-2">Illustrative scenario, not live functionality</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A reading suggests the soil needs a fertilizer. The Doctor turns that into a plain recommendation, the
                Pharmacist points to nearby agro-dealers that might stock it, and Insurance helps the farmer plan how to pay.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Prototype screens ── */}
      <section id="screens" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Tag kind="design" />
          </div>
          <CaseStudySectionHeading label="Prototype Screens" title="Design explorations from the Figma file" accentColor={ORANGE} />
          <ScrollReveal>
            <p className="max-w-3xl text-sm text-muted-foreground mb-12">
              The screens cover onboarding and the Doctor layer most fully. Names, numbers and amounts are sample data.
              This case study does not report usability test results.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {screens.map((sc) => (
              <ScrollReveal key={sc.title}>
                <figure className="flex flex-col items-center">
                  <PhoneFrame src={sc.src} alt={sc.alt} className="w-[200px] sm:w-[220px]" />
                  <figcaption className="mt-6 max-w-xs text-center">
                    <p className="font-bold font-[family-name:var(--font-poppins)] text-foreground">{sc.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{sc.shows}</p>
                    {sc.reflects && (
                      <p className="mt-3 text-xs leading-relaxed" style={{ color: ORANGE }}>
                        <span className="font-bold uppercase tracking-[0.12em]">Reflects · </span>
                        {sc.reflects}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Design System ── */}
      <section id="design-system" className="py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: GREEN }}>
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
                  <CaseStudyColorSwatch color="#2E5C3E" name="Deep Forest Green" hex="#2E5C3E" />
                  <CaseStudyColorSwatch color="#4A8B5E" name="Leaf Green" hex="#4A8B5E" />
                  <CaseStudyColorSwatch color="#ED6C02" name="Burnt Orange" hex="#ED6C02" />
                  <CaseStudyColorSwatch color="#F5923A" name="Harvest Gold" hex="#F5923A" />
                  <CaseStudyColorSwatch color="#FFFFFF" name="White" hex="#FFFFFF" />
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
                      <p className="text-white text-base">Inter Regular — for readable body text, with English and Swahili shown in the prototype</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-6">Design Principles</h3>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Accessibility First",
                        desc: "Voice guidance and local-language options aim to make the app usable for farmers with limited literacy or digital experience",
                      },
                      {
                        title: "Conversational Data",
                        desc: "Sensor readings explained in plain language, with everyday comparisons, instead of raw values",
                      },
                      {
                        title: "Action-Oriented",
                        desc: "Each recommendation comes with an estimated cost, a deadline and step-by-step instructions",
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
            <CaseStudySectionHeading label="Tools & Technology" title="The stack behind the solution" accentColor="#ED6C02" />
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

      {/* ── Reflection ── */}
      <section id="reflection" className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Reflection" title="What this project shows" accentColor={ORANGE} />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <ScrollReveal className="lg:col-span-7">
              <ul className="space-y-6">
                {[
                  ["Data is not a decision.", "The research suggests that even with sensor data available, farmers may still lean on trusted advisers to know what to do. A good dashboard is not the same as a good decision."],
                  ["The last mile matters.", "Access to inputs, cost and clear instructions can stop a recommendation from being acted on. The concept treats those as part of the product, not as someone else’s problem."],
                  ["Research shaped the structure.", "The three layers come from the gap the research pointed to: understanding, access and affordability."],
                ].map(([t, d]) => (
                  <li key={t} className="border-l-4 pl-5" style={{ borderColor: ORANGE }}>
                    <p className="font-bold font-[family-name:var(--font-poppins)] text-foreground">{t}</p>
                    <p className="mt-1 text-foreground/75 leading-relaxed">{d}</p>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-5">
              <div className="rounded-2xl border border-dashed border-foreground/20 p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Leaf className="w-5 h-5" style={{ color: GREEN }} aria-hidden="true" />
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground">Intended benefits</p>
                  <Tag kind="proposed" label="Not measured" />
                </div>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex gap-2.5"><Sprout className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_GREEN }} aria-hidden="true" />Improved yields</li>
                  <li className="flex gap-2.5"><Sprout className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_GREEN }} aria-hidden="true" />Reduced fertilizer waste</li>
                  <li className="flex gap-2.5"><Sprout className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ACCENT_GREEN }} aria-hidden="true" />Better food security</li>
                </ul>
                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  These are goals the concept aims for. This project has no measured outcomes.
                </p>
              </div>

              <div className="mt-6 rounded-2xl bg-secondary/40 border border-foreground/5 p-6">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-foreground mb-3">Next steps</p>
                <ul className="space-y-2.5">
                  {nextSteps.map((n) => (
                    <li key={n} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ORANGE }} aria-hidden="true" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="mt-14 text-center">
              <MagneticHover>
                <a
                  href="https://www.figma.com/deck/lZy1RpGIHIaL2WsBdfbuDT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm text-white transition-opacity duration-300 hover:opacity-90"
                  style={{ backgroundColor: GREEN }}
                >
                  View the Figma deck
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </MagneticHover>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ProjectNavCue currentSlug="shamba-rahisi" />
    </div>
  );
}
