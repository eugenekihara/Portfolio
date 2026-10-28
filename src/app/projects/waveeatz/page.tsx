"use client";

import { motion } from "framer-motion";
import {
  Users,
  MapPin,
  Clock,
  Wallet,
  Search,
  CheckCircle2,
  Package,
  Lightbulb,
  Timer,
  UserPlus,
  ShoppingBag,
  Smartphone,
  Waves,
  Repeat,
  AlertCircle,
  Bell,
} from "lucide-react";
import { ScrollReveal, ScrollRevealRight } from "@/components/scroll-animations";
import { SiteNav } from "@/components/site-nav";
import { ProjectNavCue } from "@/components/project-nav-cue";
import {
  CaseStudySectionHeading,
  CaseStudyFeatureCard,
  CaseStudyFlowStep,
  PhoneFrame,
  CaseStudyScreenShowcase,
  CaseStudyColorSwatch,
} from "@/components/case-study";

const S = "/waveeatz/screens";
const ORANGE = "#FF4F00";
const SAND = "#C1A9A1";

/* ─── Content (all facts come from the team's own documents) ─── */
const meta = [
  { label: "Type", value: "UX/UI Design · Group Project" },
  { label: "Program", value: "Moringa School Product Design" },
  { label: "Duration", value: "A few weeks" },
  { label: "My Role", value: "UX Research, User Flows, UI Design" },
  { label: "Team", value: "Esther & Collins" },
];

const painPoints = [
  {
    icon: Wallet,
    title: "Higher individual spending",
    text: "The food is affordable, but once delivery is added the total stops feeling worth it.",
  },
  {
    icon: Repeat,
    title: "Fewer orders",
    text: "Students abandon checkout when the delivery fee feels unreasonable next to the meal.",
  },
  {
    icon: Users,
    title: "Missed shared moments",
    text: "Neighbours order the same meal separately and often only find out after it arrives.",
  },
];

const insights = [
  "Students are price-sensitive and tend to abandon an order when delivery feels unreasonable.",
  "Eating together is a social and emotional relief, so shared food moments matter.",
  "Students are open to ordering collaboratively but lack a simple way to coordinate it.",
];

const ideas = [
  {
    name: "Artist & Band Website",
    by: "Eugene",
    text: "A five-page site with music, gallery and a booking form to help artists promote and take bookings.",
    chosen: false,
  },
  {
    name: "UniLink",
    by: "Collins",
    text: "A campus collaboration platform that matches students to projects and teammates by skill.",
    chosen: false,
  },
  {
    name: "Wave Eats",
    by: "Esther",
    text: "Group food ordering for hostels, so neighbours share one delivery fee. This became the team's final idea.",
    chosen: true,
  },
];

const personas = [
  {
    name: "Esther",
    title: "The Budget-Conscious Craver",
    quote: "I love treats… but the delivery fee stresses me more than my course work.",
    profile: "20 · Kenyatta University · Ladies Hostel 2",
    goals: [
      "Enjoy affordable treats without breaking her weekly budget",
      "Avoid paying KES 150–300 delivery alone",
      "Order quickly without coordinating on WhatsApp",
    ],
    pains: [
      "Delivery feels unreasonable compared to the meal",
      "Cancels orders last minute because of the total",
      "Finds out too late that others ordered the same thing",
    ],
  },
  {
    name: "Eugene",
    title: "The Food Plug & Social Connector",
    quote: "If there's a food deal happening on campus, I know about it.",
    profile: "23 · JKUAT · Hostel Block C · part-time micro-rider",
    goals: [
      "Do fewer, larger drop-offs and earn more per trip",
      "Make ordering smoother for students in his block",
      "Become the go-to Wave starter",
    ],
    pains: [
      "Many small, last-minute delivery requests",
      "Multiple runs to the same restaurant",
      "Hard to coordinate 4–7 people through chat groups",
    ],
  },
];

const joinFlow = [
  { icon: Smartphone, title: "Open the app", description: "Land on the Waves happening around your hostel." },
  { icon: Search, title: "Choose a Wave", description: "See the restaurant, who has joined and the shared fee." },
  { icon: UserPlus, title: "Join the Wave", description: "Tap Join Wave and the restaurant menu opens." },
  { icon: ShoppingBag, title: "Add your food", description: "Pick items and place your order; your fee drops." },
  { icon: Clock, title: "Wait together", description: "Track joiners, rider ETA, drop-off and the Wave timer." },
  { icon: Package, title: "Collect", description: "Meet the rider at the entrance and the Wave ends." },
];

const startFlow = [
  { icon: Waves, title: "Start a Wave", description: "No good Waves nearby? Pick a restaurant." },
  { icon: ShoppingBag, title: "Order first", description: "Choose your food and the drop-off point." },
  { icon: Bell, title: "Go live", description: "Nearby students are notified to join." },
  { icon: Users, title: "Others join", description: "The delivery fee gets cheaper as the Wave grows." },
  { icon: Timer, title: "Timer ends", description: "The combined order is sent as one delivery." },
  { icon: Package, title: "Pick up", description: "Everyone collects at the drop-off point." },
];

const screenAreas = [
  { name: "Onboarding", count: 6, items: "Welcome, What is a Wave, How you save, Campus life, Location, Hostel/Block" },
  { name: "Authentication", count: 3, items: "Login, Sign up, Forgot password" },
  { name: "Home", count: 3, items: "Wave feed, Filters, Notifications" },
  { name: "Wave interaction", count: 7, items: "Menu, Add to order, Review, Payment, Live tracking, Drop-off, Savings summary" },
  { name: "Start a Wave", count: 5, items: "Restaurant, First order, Join time limit, Drop-off point, Owner view" },
  { name: "Profile", count: 4, items: "Profile, Saved hostels, Order history, Saved restaurants" },
];

const features = [
  { icon: Waves, title: "Wave Feed", description: "Live Waves near your hostel, with participants, place and time left on each card." },
  { icon: UserPlus, title: "Add Wave Order", description: "Join a group order straight from a meal, with Solo Order kept as a clear second choice." },
  { icon: Wallet, title: "Tiered delivery fee", description: "The fee steps down as more people join: Ksh 180 for 5, Ksh 120 for 10, Ksh 90 for 20." },
  { icon: Timer, title: "Wave timer", description: "The person starting a Wave chooses how long it stays open: 20 mins, 30 mins or custom." },
  { icon: MapPin, title: "Delivery location", description: "A saved campus address sits at the top of every ordering screen and can be changed on a map." },
  { icon: CheckCircle2, title: "Clear order summary", description: "Price, shared delivery fee and total are broken out, with the Wave icon marking Wave-affected amounts." },
];

const gallery = [
  { src: `${S}/01-splash.png`, alt: "Splash screen", label: "Splash" },
  { src: `${S}/03-login.png`, alt: "Login screen", label: "Login" },
  { src: `${S}/04-signup.png`, alt: "Sign up screen", label: "Sign up" },
  { src: `${S}/05-verify-email.png`, alt: "Email verification screen", label: "Verify email" },
  { src: `${S}/06-forgot-password.png`, alt: "Forgot password screen", label: "Forgot password" },
  { src: `${S}/07-account-complete.png`, alt: "Account complete screen", label: "Account created" },
  { src: `${S}/09-stores.png`, alt: "Stores screen", label: "Stores" },
  { src: `${S}/14-location.png`, alt: "Delivery location map screen", label: "Location" },
  { src: `${S}/17-payment-methods.png`, alt: "Payment methods screen", label: "Payment" },
  { src: `${S}/19-your-orders.png`, alt: "Your orders screen", label: "Your orders" },
];

/* ────────────────────────────────────────────
   WAVEEATZ Case Study Page
   ──────────────────────────────────────────── */
export default function WaveeatzPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav variant="case-study" />

      {/* ── Hero ── */}
      <section className="relative bg-[#36170E] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#642714]/30 blur-3xl" />
          <div className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full bg-[#642714]/20 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                <h1 className="text-case-hero font-bold font-[family-name:var(--font-poppins)]">
                  <span className="text-white">WAVE</span>
                  <br />
                  <span style={{ color: ORANGE }}>EATZ</span>
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-6 text-white/80 text-lg lg:text-xl max-w-lg leading-relaxed"
              >
                Making group food ordering easier and more affordable for university students.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {meta.map((m) => (
                  <div key={m.label} className="px-4 py-2 rounded-full border border-white/15 bg-white/5">
                    <span className="text-caption font-bold tracking-[0.2em] uppercase" style={{ color: SAND }}>
                      {m.label}:{" "}
                    </span>
                    <span className="text-sm font-medium text-white/90">{m.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <PhoneFrame src={`${S}/08-home.png`} alt="Wave Eatz home screen" className="w-[46%]" />
              <PhoneFrame src={`${S}/13-wave-settings.png`} alt="Wave Eatz Wave settings screen" className="w-[46%] mt-12" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section id="overview" className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Overview" title="What is Wave Eatz?" accentColor={ORANGE} />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="text-foreground/80 text-base lg:text-lg leading-[1.8]">
                  <span className="font-bold font-[family-name:var(--font-poppins)] text-foreground">Wave Eatz</span> is a
                  university food-ordering app concept that lets students join group orders, called{" "}
                  <span className="font-semibold" style={{ color: ORANGE }}>Waves</span>, so they share delivery costs
                  instead of each paying separately.
                </p>
                <p className="text-foreground/70 text-base lg:text-lg leading-[1.8]">
                  It was a team project at Moringa School. I contributed to the UX research, user flows and UI design,
                  helping turn a campus problem into a proposed digital experience, from first idea to a Figma prototype.
                </p>
                <p className="text-foreground/70 text-base lg:text-lg leading-[1.8] italic">
                  Brand motto: &ldquo;Because hunger is a group assignment.&rdquo;
                </p>
              </div>
            </ScrollReveal>
            <ScrollRevealRight>
              <PhoneFrame src={`${S}/02-onboarding.png`} alt="Wave Eatz onboarding screen with the brand motto" />
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section id="problem" className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="The Problem" title="The delivery fee ruins it" accentColor={ORANGE} />
          <ScrollReveal>
            <p className="max-w-3xl text-foreground/80 text-base lg:text-lg leading-[1.8] mb-12">
              A student starts with &ldquo;just fries and wings&rdquo; and somehow the app says KES 870. Meanwhile other
              students in the same hostel are ordering the exact same thing, and everyone pays a separate delivery fee.
              Eating out ends up more expensive than it needs to be.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {painPoints.map((p) => (
              <ScrollReveal key={p.title}>
                <CaseStudyFeatureCard icon={p.icon} title={p.title} description={p.text} accentColor={ORANGE} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <blockquote className="max-w-3xl border-l-4 pl-6 py-2" style={{ borderColor: ORANGE }}>
              <p className="text-lg lg:text-xl text-foreground leading-relaxed">
                &ldquo;I just wanted wings. But once delivery was added, it didn&apos;t feel worth it anymore. Then my
                roommate ordered the same thing separately and also paid delivery.&rdquo;
              </p>
              <p className="mt-3 text-sm text-muted-foreground">From our informal student interviews</p>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Ideation ── */}
      <section id="ideation" className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Ideation" title="Three ideas, one direction" accentColor={ORANGE} />
          <ScrollReveal>
            <p className="max-w-3xl text-foreground/70 text-base lg:text-lg leading-[1.8] mb-12">
              Each team member brought a concept to the table. The team chose Wave Eats as the final idea.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <ScrollReveal key={idea.name}>
                <div
                  className={`h-full p-6 lg:p-8 rounded-2xl border ${idea.chosen ? "bg-[#36170E] text-white border-transparent" : "bg-secondary/50 border-foreground/5"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Lightbulb className="w-6 h-6" style={{ color: idea.chosen ? ORANGE : undefined }} />
                    {idea.chosen && (
                      <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: ORANGE }}>
                        Chosen
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] mb-1">{idea.name}</h3>
                  <p className={`text-xs mb-3 ${idea.chosen ? "text-white/50" : "text-muted-foreground"}`}>Idea by {idea.by}</p>
                  <p className={`text-sm leading-relaxed ${idea.chosen ? "text-white/75" : "text-muted-foreground"}`}>{idea.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research ── */}
      <section id="research" className="py-20 lg:py-32 bg-[#36170E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Research & Discovery" title="Listening to students" light accentColor={ORANGE} lightAccentColor={ORANGE} />
          <ScrollReveal>
            <p className="max-w-3xl text-white/75 text-base lg:text-lg leading-[1.8] mb-4">
              The team ran informal interviews with about 4–6 students and observed how they order food on campus, to
              understand where delivery costs and coordination get in the way.
            </p>
            <p className="max-w-3xl text-white/50 text-sm leading-relaxed mb-12">
              This was a small, informal sample, so the findings point to opportunities rather than prove how all
              students behave.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {insights.map((t, i) => (
              <ScrollReveal key={t}>
                <div className="h-full p-6 lg:p-8 rounded-2xl bg-white/[0.04] border border-white/10">
                  <p className="text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4" style={{ color: ORANGE }}>
                    0{i + 1}
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed">{t}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personas ── */}
      <section id="personas" className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Personas" title="Who we designed for" accentColor={ORANGE} />
          <div className="grid lg:grid-cols-2 gap-8">
            {personas.map((p) => (
              <ScrollReveal key={p.name}>
                <div className="h-full p-6 lg:p-8 rounded-2xl bg-secondary/40 border border-foreground/5">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: ORANGE }}>Persona</p>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground">{p.name}</h3>
                  <p className="text-foreground/70 mb-1">{p.title}</p>
                  <p className="text-xs text-muted-foreground mb-5">{p.profile}</p>
                  <p className="italic text-foreground/80 mb-6">&ldquo;{p.quote}&rdquo;</p>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-foreground mb-2">Goals</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-5">
                    {p.goals.map((g) => <li key={g}>{g}</li>)}
                  </ul>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase text-foreground mb-2">Frustrations</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {p.pains.map((g) => <li key={g}>{g}</li>)}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution + flows ── */}
      <section id="flows" className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="User Flows" title="Join a Wave or start one" accentColor={ORANGE} />
          <ScrollReveal>
            <p className="max-w-3xl text-foreground/70 text-base lg:text-lg leading-[1.8] mb-14">
              Everything in the app branches from two paths: joining a Wave someone already started, or starting your
              own. I mapped both, plus what happens when someone tries to order alone or something goes wrong.
            </p>
          </ScrollReveal>

          {[
            { heading: "Flow 1: Discover and join a Wave", steps: joinFlow },
            { heading: "Flow 2: Start a Wave", steps: startFlow },
          ].map((flow) => (
            <div key={flow.heading} className="mb-16">
              <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-8">{flow.heading}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {flow.steps.map((s, i) => (
                  <ScrollReveal key={s.title}>
                    <CaseStudyFlowStep
                      number={i + 1}
                      icon={s.icon}
                      title={s.title}
                      description={s.description}
                      accentColor="#fff"
                      stepBgColor="#36170E"
                      stepBorderColor={ORANGE}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal>
              <CaseStudyFeatureCard
                icon={Repeat}
                title="Flow 3: Ordering alone"
                description="If a Wave from the same restaurant is already running in your block, the app suggests joining it and shows how much you would save. If not, you can start your own Wave or continue solo."
                accentColor={ORANGE}
              />
            </ScrollReveal>
            <ScrollReveal>
              <CaseStudyFeatureCard
                icon={AlertCircle}
                title="Flow 4: When things go wrong"
                description="If payment fails, students can retry, pick another method or save the order for later. If a Wave becomes full, the app suggests starting a new one."
                accentColor={ORANGE}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Scope ── */}
      <section id="scope" className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Structure" title="Mapping the app" accentColor={ORANGE} />
          <ScrollReveal>
            <p className="max-w-3xl text-foreground/70 text-base lg:text-lg leading-[1.8] mb-12">
              Before designing, the team listed the full planned app across six areas and split the wireframes: I took
              Start a Wave, Esther took Wave Interaction, and Collins took Home and Profile.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenAreas.map((a) => (
              <ScrollReveal key={a.name}>
                <div className="h-full p-6 rounded-2xl bg-secondary/40 border border-foreground/5">
                  <p className="text-3xl font-bold font-[family-name:var(--font-poppins)]" style={{ color: ORANGE }}>{a.count}</p>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-foreground mt-1 mb-2">{a.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.items}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key screens ── */}
      <section id="screens" className="py-20 lg:py-32 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="UI Design" title="Key screens" accentColor={ORANGE} />
          <div className="space-y-24 lg:space-y-32">
            <CaseStudyScreenShowcase
              src={`${S}/08-home.png`}
              alt="Wave Eatz home screen"
              title="Home"
              purpose="Show the student where they are delivering to and which Waves are open right now."
              rationale="A featured Wave card shows participants, place and time left up front, so the group-ordering idea is visible the moment the app opens. Top of the Week sits below for regular browsing."
              accentColor={ORANGE}
            />
            <CaseStudyScreenShowcase
              src={`${S}/10-waves-feed.png`}
              alt="Wave feed screen"
              title="Wave Feed"
              purpose="Let students browse open Waves and join one, or start their own."
              rationale="Each card carries only what a decision needs: the food, how many people joined, the hostel or place, and the minutes left. A single Start a Wave button covers the case where nothing suits."
              reversed
              accentColor={ORANGE}
            />
            <CaseStudyScreenShowcase
              src={`${S}/11-start-a-wave.png`}
              alt="Start a Wave screen"
              title="Start a Wave"
              purpose="Pick a restaurant or meal to begin a new Wave."
              rationale="Popular restaurants, popular meals and a student's favourites keep the first choice quick, with the delivery location shown above so the drop-off is never in doubt."
              accentColor={ORANGE}
            />
            <CaseStudyScreenShowcase
              src={`${S}/12-wave-order.png`}
              alt="Meal order screen with Add Wave Order and Solo Order"
              title="Add to a Wave"
              purpose="Review a meal bundle and choose how to order it."
              rationale="Add Wave Order is the filled primary button and Solo Order is the outlined secondary one. That nudges students toward group ordering while still respecting the choice to order alone."
              reversed
              accentColor={ORANGE}
            />
            <CaseStudyScreenShowcase
              src={`${S}/13-wave-settings.png`}
              alt="Wave settings screen with timer and delivery fee tiers"
              title="Set the Wave"
              purpose="Let the Wave starter choose how long the Wave stays open and see how the fee changes."
              rationale="The fee tiers (Ksh 180 for 5 people, Ksh 120 for 10, Ksh 90 for 20) make the saving concrete, which gives the starter a reason to invite neighbours."
              accentColor={ORANGE}
            />
            <CaseStudyScreenShowcase
              src={`${S}/15-confirm-order.png`}
              alt="Confirm order screen"
              title="Confirm Order"
              purpose="Show exactly what the student will pay before they commit."
              rationale="Price, delivery fee and total are separated, and the small Wave icon marks the amounts that depend on the group. Payment defaults to Cash on Delivery."
              reversed
              accentColor={ORANGE}
            />
            <CaseStudyScreenShowcase
              src={`${S}/18-order-received.png`}
              alt="Order received screen"
              title="Order Received"
              purpose="Confirm the order and set expectations for delivery."
              rationale="The order number, expected delivery window and a Cancel Order link are all on one screen, so students know the status without hunting for it."
              accentColor={ORANGE}
            />
          </div>

          <ScrollReveal>
            <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] text-foreground mt-24 mb-8">More screens</h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {gallery.map((g) => (
              <ScrollReveal key={g.label}>
                <PhoneFrame src={g.src} alt={g.alt} />
                <p className="text-center text-sm text-muted-foreground mt-3">{g.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 lg:py-32 bg-[#36170E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Features" title="What the design includes" light accentColor={ORANGE} lightAccentColor={ORANGE} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <ScrollReveal key={f.title}>
                <CaseStudyFeatureCard icon={f.icon} title={f.title} description={f.description} accentColor={ORANGE} variant="dark" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual identity ── */}
      <section id="design-system" className="py-20 lg:py-32 bg-[#36170E] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Visual Identity" title="Warm, appetising, energetic" light accentColor={ORANGE} lightAccentColor={ORANGE} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <CaseStudyColorSwatch color="#36170E" name="Deep Coffee" hex="#36170E" />
            <CaseStudyColorSwatch color="#642714" name="Burnt Sienna (cards)" hex="#642714" />
            <CaseStudyColorSwatch color="#FF4F00" name="Wave Orange (accent)" hex="#FF4F00" />
            <CaseStudyColorSwatch color="#86746E" name="Muted Taupe (secondary text)" hex="#86746E" />
          </div>
          <ScrollReveal>
            <p className="max-w-3xl text-white/70 text-base leading-[1.8]">
              A dark coffee-brown base with a single bright orange accent keeps food photography and the orange calls to
              action in focus. Rounded cards, black pill buttons and the wave icon repeat across screens so the app
              feels consistent.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Reflection ── */}
      <section id="reflection" className="py-20 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <CaseStudySectionHeading label="Outcome & Reflection" title="What I took from it" accentColor={ORANGE} />
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="space-y-5 text-foreground/75 text-base lg:text-lg leading-[1.8]">
                <p>
                  Wave Eatz let me apply UX research, user-flow mapping, wireframing and UI design in a collaborative
                  product-design project, taking one student problem from research through to a Figma prototype.
                </p>
                <p>
                  It reinforced that understanding users comes before designing an interface, and that the key action
                  (joining a Wave) has to be obvious and easy to find.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="p-6 lg:p-8 rounded-2xl bg-secondary/40 border border-foreground/5">
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ORANGE }}>Next steps</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <li>Test the prototype with students to check whether the Wave flow is clear.</li>
                  <li>Design the live drop-off tracking and rider view from the original flows.</li>
                  <li>Complete the Profile, order history and saved places screens.</li>
                  <li>Check the delivery fee tiers against what real vendors and riders could offer.</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <p className="mt-12 text-sm text-muted-foreground">
              Credits: developed with teammates Esther and Collins as part of the Moringa School Product Design program.
              This is a design concept; it has not been launched.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ProjectNavCue currentSlug="waveeatz" />
    </div>
  );
}
