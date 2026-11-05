import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Explicit, SAFE seed — run manually with `npm run db:seed`.
 * It is never invoked by the build or install process.
 *
 * Safety rules:
 *   - Admin credentials come from ADMIN_EMAIL / ADMIN_PASSWORD env vars —
 *     no hardcoded passwords in the repo.
 *   - Existing rows are never modified or deleted (upsert with empty `update`):
 *     the seed only fills in what is missing on a fresh database.
 */

const PROJECTS = [
  {
    title: "WAVEEATZ",
    slug: "waveeatz",
    shortDescription:
      "A group food-ordering app concept that lets university students join Waves and share delivery fees.",
    detailedDescription:
      "A team project at Moringa School Product Design. Students join group orders called Waves to split delivery costs instead of paying separately. I contributed UX research, user flows and UI design, from informal student interviews through to a Figma prototype.",
    category: "UI/UX Design",
    categoryTag: "Product Design",
    technologies: "Figma,Prototyping,UX Research,User Flows,UI Design",
    thumbnail: "/waveeatz.png",
    impact: "Concept & Figma prototype",
    caseStudyHref: "/projects/waveeatz",
    featured: true,
    published: true,
    order: 1,
  },
  {
    title: "SchooPata",
    slug: "schoolpata",
    shortDescription:
      "A mobile platform helping parents find the perfect school for their child.",
    detailedDescription:
      "Centralizes school information, ratings, and comparison tools to simplify a complex decision-making process. The app streamlines school search with intuitive filters and detailed school profiles.",
    category: "Product Design",
    categoryTag: "App Design",
    technologies: "Figma,Prototyping,UX Research,UI Design",
    thumbnail: "/schoolpata.png",
    impact: "Streamlined school search",
    caseStudyHref: "https://www.figma.com/design/SZE5vqXtIOX3bYFNrARVW7/Eugene%7C-SchoolPata-%7C-FINAL--Copy-?node-id=1506-226&t=V4tfu9CevRCsSz4N-1",
    featured: false,
    published: true,
    order: 2,
  },
  {
    title: "Shamba Rahisi",
    slug: "shamba-rahisi",
    shortDescription:
      "A digital ecosystem bridging high-tech soil data and farm execution for African cooperatives.",
    detailedDescription:
      "Translates IoT sensor data into localized voice-based tasks and cost blueprints. Empowers farmers with actionable insights derived from advanced agricultural technology.",
    category: "Product Design",
    categoryTag: "AgriTech",
    technologies: "Figma,Adobe XD,Wireframing,UX Audit",
    thumbnail: "/shamba-rahisi.png",
    impact: "IoT-to-action for farmers",
    caseStudyHref: "https://www.figma.com/deck/lZy1RpGIHIaL2WsBdfbuDT",
    featured: false,
    published: true,
    order: 0,
  },
  {
    title: "Portfolio Website",
    slug: "portfolio",
    shortDescription:
      "My personal portfolio — a case study in itself. Designed and developed from scratch with Next.js, GSAP animations, and a dark editorial aesthetic.",
    detailedDescription:
      "A self-designed, self-developed portfolio website built with Next.js 16, TypeScript, Tailwind CSS, GSAP scroll animations, and Prisma. Features horizontal-scroll project showcases, a dark editorial design language, and a custom CMS admin panel for managing projects and contact messages.",
    category: "Web Development",
    categoryTag: "Fullstack",
    technologies: "Next.js,TypeScript,Tailwind CSS,GSAP,Prisma",
    thumbnail: "/portfolio/portfolio-thumbnail.png",
    impact: "Live & Shipped",
    caseStudyHref: "/projects/portfolio",
    githubUrl: "https://github.com/eugenekihara/Portfolio",
    liveDemoUrl: "https://eugenekihara.dev",
    featured: true,
    published: true,
    order: 3,
  },
  {
    title: "Trendz",
    slug: "trendz",
    shortDescription:
      "A full-featured business management system — POS, inventory tracking, credit management, sales analytics, and reporting, built for small businesses.",
    detailedDescription:
      "Trendz is a comprehensive ERP/POS system designed for small businesses. Built with Next.js, Prisma, and shadcn/ui, it features a real-time sales POS with inventory deduction, credit order management with payment tracking, supplier management, staff approval workflows, role-based access control, and exportable reports (CSV/XLSX/PDF). The system includes JWT-based authentication, a setup wizard, and a dark/light theme.",
    category: "Full Stack",
    categoryTag: "ERP/POS",
    technologies: "Next.js,TypeScript,Prisma,shadcn/ui,Tailwind CSS,Zustand,Recharts",
    thumbnail: "/trendz/trendz-thumbnail.png",
    impact: "End-to-End Business Tool",
    caseStudyHref: "/projects/trendz",
    githubUrl: "https://github.com/eugenekihara/trendz",
    featured: true,
    published: true,
    order: 4,
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Admin";

  if (!email || !password) {
    console.error(
      "Seed requires ADMIN_EMAIL and ADMIN_PASSWORD environment variables (no hardcoded credentials)."
    );
    console.error(
      'Example: ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="a-strong-password" npm run db:seed'
    );
    process.exit(1);
  }

  // Create-if-missing only: an existing admin is never overwritten.
  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name },
  });
  console.log("Admin user ready:", admin.email);

  // Create-if-missing only: CMS-managed project data is never overwritten.
  for (const project of PROJECTS) {
    const result = await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
    console.log("Project present:", result.title);
  }

  console.log("Seed completed — existing data was not modified.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
