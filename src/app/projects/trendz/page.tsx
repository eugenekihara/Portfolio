"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Monitor,
  Layers,
  Zap,
  Github,
  CheckCircle2,
  BarChart3,
  Database,
  ShoppingCart,
  Package,
  Users,
  CreditCard,
  FileText,
  Shield,
  Settings,
  Bell,
} from "lucide-react";
import Link from "next/link";
import {
  ScrollReveal,
  ScrollRevealLeft,
  ScrollRevealRight,
  SplitTextReveal,
  StaggerReveal,
  DrawLine,
  ClipReveal,
} from "@/components/scroll-animations";

/* ─── Theme Constants ─── */
const DARK = "#1d140d"; // Rich espresso — dark backgrounds
const ACCENT = "#966543"; // Warm amber brown — primary accent
const ACCENT_LIGHT = "#faf8f5"; // Cream — light backgrounds & highlights
const ACCENT_MID = "#6c6158"; // Warm stone — muted text & borders
const ACCENT_DARK = "#774826"; // Deep saddle brown — secondary accent

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
          className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
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
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="p-6 lg:p-8 rounded-2xl bg-secondary/50 border border-foreground/5">
      <Icon className="w-6 h-6 mb-4" style={{ color: ACCENT }} />
      <p className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-2 text-foreground">
        {value}
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">{label}</p>
    </div>
  );
}

/* ─── Feature Card ─── */
/* Reads against the dark espresso (DARK) section background.
   Colors tuned for WCAG AA contrast: white titles, white/75 body,
   and a lightened amber icon so the glyph stays legible on espresso. */
function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-6 lg:p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#966543] transition-all duration-500">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${ACCENT}26` }}
      >
        <Icon className="w-6 h-6" style={{ color: "#c89766" }} />
      </div>
      <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-3">
        {title}
      </h4>
      <p className="text-sm text-white/75 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/* ─── Color Swatch ─── */
function ColorSwatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
      <div className="w-14 h-14 rounded-xl border border-white/10 flex-shrink-0" style={{ backgroundColor: color }} />
      <div>
        <p className="text-white font-medium text-sm">{name}</p>
        <p className="text-white/50 text-xs font-mono">{hex}</p>
      </div>
    </div>
  );
}

/* ─── Tech Tag ─── */
function TechTag({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#966543]/10 border border-[#966543]/25 text-[#1d140d] text-sm font-medium">
      <Code2 size={14} style={{ color: ACCENT }} />
      {name}
    </span>
  );
}

/* ────────────────────────────────────────────
   TRENDZ Case Study Page
   ──────────────────────────────────────────── */
export default function TrendzPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── 1. Navigation ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="text-xl font-bold tracking-tight font-[family-name:var(--font-poppins)]">
              Eugene<span className="text-accent">.</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {["Home", "Projects", "About", "Contact"].map((item) => (
                <Link key={item} href={`/#${item.toLowerCase()}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
            <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full bg-foreground/5 hover:bg-foreground/10 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300">
              <ArrowLeft size={16} />
              All Projects
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── 2. Hero Section ── */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: `radial-gradient(ellipse at 30% 50%, ${ACCENT}, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <ClipReveal>
                <p
                  className="text-xs font-bold tracking-[0.3em] uppercase mb-6"
                  style={{ color: ACCENT }}
                >
                  Full Stack Application
                </p>
              </ClipReveal>
              <SplitTextReveal
                text="Trendz"
                className="text-6xl sm:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-poppins)] leading-[0.85] tracking-tighter text-foreground"
              />
              <ScrollReveal>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                  A full-featured business management system — POS, inventory tracking,
                  credit management, sales analytics, and reporting. Designed and built
                  end-to-end for small businesses that need enterprise-grade tools
                  without the enterprise price tag.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link
                    href="https://github.com/eugenekihara/trendz"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-300"
                    style={{ backgroundColor: ACCENT, color: "#fff" }}
                  >
                    <Github size={16} />
                    View Source
                  </Link>
                  <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-wider uppercase border-2 border-foreground/20 text-foreground hover:border-foreground/40 transition-all duration-300"
                  >
                    Back to Projects
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            <ScrollRevealRight>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl" style={{ backgroundColor: ACCENT }} />
                <div className="relative rounded-2xl overflow-hidden border-2 border-foreground/10 shadow-2xl">
                  <img
                    src="/trendz/screen-dashboard.png"
                    alt="Trendz Dashboard"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      <DrawLine color={ACCENT} />

      {/* ── 3. Overview Stats ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading label="Overview" title="By the Numbers" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Layers} value="10+" label="Core modules from POS to reporting" />
            <StatCard icon={Code2} value="35+" label="API endpoints handling all business logic" />
            <StatCard icon={Database} value="14" label="Prisma models with full relational integrity" />
            <StatCard icon={Shield} value="JWT" label="Secure cookie-based authentication" />
          </div>
        </div>
      </section>

      <DrawLine color={ACCENT} />

      {/* ── 4. Problem & Design Challenge ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <SectionHeading label="The Problem" title="Small businesses, big operational gaps" />
              <ScrollReveal>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Small retail businesses in Africa and emerging markets often rely on
                    pen-and-paper systems or fragmented spreadsheets to manage sales,
                    inventory, and customer credit. These manual processes lead to
                    stock discrepancies, lost revenue from untracked credit sales, and
                    no visibility into business performance.
                  </p>
                  <p>
                    Existing solutions are either too expensive, too complex, or require
                    internet connectivity that isn&apos;t always available. Business owners need
                    a tool that works locally, handles the full transaction lifecycle, and
                    provides actionable insights without requiring a finance degree to
                    interpret.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <div>
              <SectionHeading label="Design Challenge" title="Enterprise power, small-business simplicity" />
              <ScrollReveal>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    How do you pack POS sales, inventory management, credit tracking,
                    supplier management, staff workflows, and comprehensive reporting
                    into a single application without overwhelming the user? The answer
                    was progressive disclosure: a clean dashboard that surfaces what
                    matters now, with deeper tools just a click away.
                  </p>
                  <p>
                    Every module needed to work together seamlessly — a sale at the POS
                    instantly deducts inventory, creates a sales entry, and updates the
                    dashboard. A credit order reduces stock and creates a payment
                    schedule. Data flows between modules without manual re-entry or
                    reconciliation.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <DrawLine color={ACCENT} />

      {/* ── 4b. App Screenshots ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading label="Screens" title="Trendz in action" />
          <ScrollReveal>
            <p className="text-muted-foreground leading-relaxed mb-12 max-w-2xl">
              From login to sale completion — every screen is designed for speed and clarity.
              The interface prioritizes data density without sacrificing readability, so business
              owners can find what they need at a glance.
            </p>
          </ScrollReveal>

          {/* Screenshot grid: Login + Dashboard side by side */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ScrollRevealLeft>
              <div className="group relative rounded-2xl overflow-hidden border border-foreground/10 hover:border-[var(--accent-color)] transition-all duration-500">
                <img
                  src="/trendz/screen-login.png"
                  alt="Trendz Login Screen"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-bold font-[family-name:var(--font-poppins)]">Secure Login</p>
                  <p className="text-white/60 text-sm">Email & password authentication with JWT session tokens</p>
                </div>
              </div>
            </ScrollRevealLeft>
            <ScrollRevealRight>
              <div className="group relative rounded-2xl overflow-hidden border border-foreground/10 hover:border-[var(--accent-color)] transition-all duration-500">
                <img
                  src="/trendz/screen-dashboard.png"
                  alt="Trendz Dashboard"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-bold font-[family-name:var(--font-poppins)]">Dashboard Overview</p>
                  <p className="text-white/60 text-sm">Revenue, sales, products & category metrics at a glance</p>
                </div>
              </div>
            </ScrollRevealRight>
          </div>

          {/* Screenshot grid: Dashboard Detail + Analytics */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ScrollRevealLeft>
              <div className="group relative rounded-2xl overflow-hidden border border-foreground/10 hover:border-[var(--accent-color)] transition-all duration-500">
                <img
                  src="/trendz/screen-dashboard-detail.png"
                  alt="Trendz Dashboard Detail"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-bold font-[family-name:var(--font-poppins)]">Sales Analytics</p>
                  <p className="text-white/60 text-sm">Daily sales charts, top products & recent transactions</p>
                </div>
              </div>
            </ScrollRevealLeft>
            <ScrollRevealRight>
              <div className="group relative rounded-2xl overflow-hidden border border-foreground/10 hover:border-[var(--accent-color)] transition-all duration-500">
                <img
                  src="/trendz/screen-dashboard-analytics.png"
                  alt="Trendz Analytics"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-bold font-[family-name:var(--font-poppins)]">Revenue Breakdown</p>
                  <p className="text-white/60 text-sm">Outstanding credit, paid collections & overdue tracking</p>
                </div>
              </div>
            </ScrollRevealRight>
          </div>

          {/* Screenshot grid: Inventory + POS */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ScrollRevealLeft>
              <div className="group relative rounded-2xl overflow-hidden border border-foreground/10 hover:border-[var(--accent-color)] transition-all duration-500">
                <img
                  src="/trendz/screen-inventory.png"
                  alt="Trendz Inventory Management"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-bold font-[family-name:var(--font-poppins)]">Inventory Management</p>
                  <p className="text-white/60 text-sm">Products, SKUs, pricing, stock levels & category filters</p>
                </div>
              </div>
            </ScrollRevealLeft>
            <ScrollRevealRight>
              <div className="group relative rounded-2xl overflow-hidden border border-foreground/10 hover:border-[var(--accent-color)] transition-all duration-500">
                <img
                  src="/trendz/screen-pos.png"
                  alt="Trendz POS"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-bold font-[family-name:var(--font-poppins)]">Point of Sale</p>
                  <p className="text-white/60 text-sm">Product selection, cart, discounts & customer details</p>
                </div>
              </div>
            </ScrollRevealRight>
          </div>

          {/* Screenshot grid: POS Sale + Sales Tracking */}
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollRevealLeft>
              <div className="group relative rounded-2xl overflow-hidden border border-foreground/10 hover:border-[var(--accent-color)] transition-all duration-500">
                <img
                  src="/trendz/screen-pos-sale.png"
                  alt="Trendz POS Sale in Progress"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-bold font-[family-name:var(--font-poppins)]">Sale Completion</p>
                  <p className="text-white/60 text-sm">Cart review, quantity adjustment & payment processing</p>
                </div>
              </div>
            </ScrollRevealLeft>
            <ScrollRevealRight>
              <div className="group relative rounded-2xl overflow-hidden border border-foreground/10 hover:border-[var(--accent-color)] transition-all duration-500">
                <img
                  src="/trendz/screen-sales-tracking.png"
                  alt="Trendz Sales Tracking"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white font-bold font-[family-name:var(--font-poppins)]">Sales Tracking</p>
                  <p className="text-white/60 text-sm">POS sales, credit sales, manual entries & date filtering</p>
                </div>
              </div>
            </ScrollRevealRight>
          </div>
        </div>
      </section>

      <DrawLine color={ACCENT} />

      {/* ── 5. Core Features ── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading label="Core Features" title="Built for real business" light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={ShoppingCart}
              title="Point of Sale"
              description="Fast, intuitive POS with real-time stock validation, automatic inventory deduction, and instant invoice generation. Handles discounts, multiple payment methods, and partial payments."
            />
            <FeatureCard
              icon={Package}
              title="Inventory Management"
              description="Full product lifecycle: create, categorize, update stock levels, soft-delete with restore. Category management with icons. Low-stock alerts and stock movement tracking."
            />
            <FeatureCard
              icon={CreditCard}
              title="Credit & Deposits"
              description="Customer credit orders with deposit tracking, partial payments, and automatic status progression (deposit → partial → paid). Payment history and balance calculation built in."
            />
            <FeatureCard
              icon={Users}
              title="Staff & Access Control"
              description="Role-based access with admin and staff roles. Staff approval workflows, profile management, and password security with bcrypt hashing. New staff default to limited permissions."
            />
            <FeatureCard
              icon={BarChart3}
              title="Reports & Analytics"
              description="Period-filtered reports with daily sales trends, top products, category breakdowns, payment method analysis, and credit analytics. Export to CSV, XLSX, or PDF."
            />
            <FeatureCard
              icon={Bell}
              title="Notifications & Audit"
              description="In-app notifications for sales, inventory, and tasks. Complete audit log tracking all user actions for accountability and compliance. Real-time data change events."
            />
            <FeatureCard
              icon={FileText}
              title="Sales Tracking"
              description="Comprehensive sales entry system distinguishing POS, credit, and manual entries. Search, filter, and reconcile across all sales sources with source-specific badges."
            />
            <FeatureCard
              icon={Settings}
              title="Setup Wizard"
              description="Guided first-time setup: create admin account, configure business name and currency, seed initial categories. Get running in under 2 minutes without technical knowledge."
            />
            <FeatureCard
              icon={Shield}
              title="Secure by Default"
              description="JWT session tokens stored in httpOnly cookies. bcrypt password hashing with automatic plain-text upgrade. API route protection and role verification on every request."
            />
          </div>
        </div>
      </section>

      <DrawLine color={ACCENT} />

      {/* ── 6. Process ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading label="Process" title="How it came together" />
          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Research & Schema Design",
                description: "Mapped the full data model — 14 Prisma models with relationships covering products, categories, suppliers, sales, sale items, stock moves, purchase orders, credit orders, credit payments, notifications, settings, audit logs, and users. Designed for referential integrity with cascade deletes and soft deletes."
              },
              {
                step: "02",
                title: "API-First Development",
                description: "Built 35+ API endpoints before any UI, ensuring every data operation works independently. Each route includes authentication verification, input validation, and proper error handling. This approach meant the UI could be swapped without touching business logic."
              },
              {
                step: "03",
                title: "Component Architecture",
                description: "Used shadcn/ui with the New York style variant for consistent, professional UI components. Zustand for lightweight state management. Each module (Dashboard, POS, Inventory, Credits, Reports) is a self-contained component with its own data fetching and event handling."
              },
              {
                step: "04",
                title: "Cross-Module Integration",
                description: "The most challenging phase: connecting every module so data flows automatically. A POS sale deducts inventory, creates a sales entry, updates the dashboard, and triggers a notification. A credit order reduces stock, creates payment schedules, and appears in reports. Tested every cross-module interaction."
              },
              {
                step: "05",
                title: "Security Hardening",
                description: "Replaced plain-text passwords with bcrypt hashing and JWT cookie sessions. Added role-based access control on every API route. Protected sensitive settings like JWT secrets from exposure in API responses and backup exports. Added input validation on all mutation endpoints."
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step}>
                <div className="flex gap-6 lg:gap-12">
                  <div className="flex-shrink-0">
                    <span
                      className="text-5xl lg:text-7xl font-bold font-[family-name:var(--font-poppins)] leading-none"
                      style={{ color: `${ACCENT}30` }}
                    >
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-3">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <DrawLine color={ACCENT} />

      {/* ── 7. Design System ── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading label="Design System" title="Visual language" light />
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-white/70 leading-relaxed mb-8">
                Trendz uses a warm, earthy palette inspired by the textures of fashion
                and beauty — rich browns, natural cream, and muted stone tones. The design
                prioritizes clarity and density — business users need to see numbers and
                actions quickly, not admire whitespace. Dark and light themes are both
                supported with next-themes, and the color system adapts automatically.
              </p>
              <div className="space-y-3">
                <ColorSwatch color={ACCENT} name="Warm Amber" hex={ACCENT} />
                <ColorSwatch color={ACCENT_DARK} name="Saddle Brown" hex={ACCENT_DARK} />
                <ColorSwatch color={ACCENT_LIGHT} name="Cream" hex={ACCENT_LIGHT} />
                <ColorSwatch color={ACCENT_MID} name="Warm Stone" hex={ACCENT_MID} />
                <ColorSwatch color={DARK} name="Espresso" hex={DARK} />
                <ColorSwatch color="#10B981" name="Success Green" hex="#10B981" />
                <ColorSwatch color="#EF4444" name="Error Red" hex="#EF4444" />
              </div>
            </div>
            <div>
              <p className="text-white/70 leading-relaxed mb-8">
                The component library leverages Radix UI primitives for accessibility,
                with Tailwind CSS for styling. Data-dense views use TanStack Table for
                sortable, filterable data grids, and Recharts for interactive charts
                and analytics visualizations on the dashboard and reports pages.
              </p>
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
                  Typography
                </h4>
                <div className="space-y-2">
                  <p className="text-white text-2xl font-bold">Heading — Inter Bold</p>
                  <p className="text-white/70 text-base">Body — Inter Regular, optimized for data-heavy layouts</p>
                  <p className="text-white/50 text-sm font-mono">Code — JetBrains Mono for IDs and monospace data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DrawLine color={ACCENT} />

      {/* ── 8. Tech Stack ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading label="Tech Stack" title="What powers Trendz" />
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {[
                "Next.js 16",
                "TypeScript",
                "Prisma ORM",
                "SQLite",
                "shadcn/ui",
                "Radix UI",
                "Tailwind CSS",
                "Zustand",
                "TanStack Table",
                "Recharts",
                "React Hook Form",
                "Zod",
                "Framer Motion",
                "bcryptjs",
                "JWT (jose)",
                "next-themes",
                "next-intl",
                "jsPDF",
                "xlsx",
              ].map((tech) => (
                <TechTag key={tech} name={tech} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <DrawLine color={ACCENT} />

      {/* ── 9. Outcomes ── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: DARK }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading label="Outcomes" title="What Trendz delivers" light />
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: CheckCircle2,
                title: "Real-time Inventory Sync",
                text: "Every sale, credit order, and stock adjustment updates inventory instantly. No more end-of-day stock counts or discrepancies between what the system says and what's on the shelf.",
              },
              {
                icon: CheckCircle2,
                title: "Credit Visibility",
                text: "Outstanding credits, overdue payments, and deposit tracking are always visible. Business owners know exactly who owes what, when it's due, and how much has been paid.",
              },
              {
                icon: CheckCircle2,
                title: "Actionable Reports",
                text: "Period-filtered reports with daily sales trends, top products, and category breakdowns give business owners the data they need to make decisions — exportable as CSV, XLSX, or PDF.",
              },
              {
                icon: CheckCircle2,
                title: "Role-Based Security",
                text: "Staff see only what they need. Admins control approvals, supplier management, and system settings. JWT sessions with bcrypt hashing keep the system secure without adding complexity.",
              },
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div className="p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10">
                  <item.icon className="w-6 h-6 mb-4" style={{ color: ACCENT }} />
                  <h4 className="text-lg font-bold font-[family-name:var(--font-poppins)] text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <DrawLine color={ACCENT} />

      {/* ── 10. Next Project ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-4"
              style={{ color: ACCENT }}
            >
              Next Project
            </p>
          </ScrollReveal>
          <Link href="/projects/portfolio" className="group inline-block">
            <SplitTextReveal
              text="Portfolio Website"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-poppins)] leading-[0.85] tracking-tighter text-foreground group-hover:text-accent transition-colors duration-500"
            />
            <div className="mt-6 inline-flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              <span className="text-sm font-bold tracking-[0.2em] uppercase">
                View Case Study
              </span>
              <ArrowUpRight
                size={20}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* ── 11. Footer ── */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Designed & Developed by Eugene Kihara
          </p>
          <Link
            href="https://github.com/eugenekihara/trendz"
            target="_blank"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={14} />
            View on GitHub
          </Link>
        </div>
      </footer>
    </div>
  );
}
