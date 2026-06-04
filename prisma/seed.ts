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
      caseStudyHref: "/projects/waveeatz",
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
      caseStudyHref: "/projects/schoolpata",
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
      caseStudyHref: "/projects/shamba-rahisi",
      featured: false,
      published: true,
      order: 2,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.project.findUnique({
      where: { slug: project.slug },
    });
    if (!existing) {
      await prisma.project.create({ data: project });
      console.log("Project created:", project.title);
    } else {
      console.log("Project already exists:", project.title);
    }
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
