import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const passwordHash = await bcrypt.hash("Eugene@2025", 12);
  const admin = await prisma.adminUser.upsert({
    where: { email: "kiharaeugene@gmail.com" },
    update: {},
    create: {
      email: "kiharaeugene@gmail.com",
      passwordHash,
      name: "Eugene Kihara",
    },
  });

  console.log("Admin user created:", admin.email);

  // Seed the 3 existing projects
  const projects = [
    {
      title: "WAVEEATZ",
      slug: "waveeatz",
      shortDescription:
        "A food delivery mobile app reimagining the ordering experience with bold visuals and frictionless flows.",
      detailedDescription:
        "Designed to increase user retention by 40% through intuitive navigation and reduced checkout steps. The app features bold visuals, simplified ordering flows, and personalized recommendations.",
      category: "UI/UX Design",
      categoryTag: "Product Design",
      technologies: "Figma,Prototyping,UX Research,UI Design",
      thumbnail: "/waveeatz.png",
      impact: "40% retention increase",
      caseStudyHref: "https://www.figma.com/design/5duOZT25VFKNPc55oOt7Gf/Wave-Eats-App-Group-7--Copy-?node-id=25-6&t=5gIRe96krBqAaNAt-1",
      featured: true,
      published: true,
      order: 0,
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
      order: 1,
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
      order: 2,
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

  for (const project of projects) {
    // Use upsert so seed updates existing projects (e.g. thumbnail path changes)
    // instead of skipping them. This ensures production deploys pick up seed changes.
    const result = await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
    console.log("Project synced:", result.title);
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
