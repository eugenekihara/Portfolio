import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

// GET /api/projects - Return all published projects (public). ?all=true for admin to see unpublished too
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    let where = {};
    if (!showAll) {
      where = { published: true };
    } else {
      // Verify admin access for showing all
      const session = await requireAdmin();
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const projects = await db.project.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.shortDescription || !body.category || !body.technologies || !body.thumbnail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existing = await db.project.findUnique({
      where: { slug: body.slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 409 }
      );
    }

    const project = await db.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        shortDescription: body.shortDescription,
        detailedDescription: body.detailedDescription || null,
        category: body.category,
        categoryTag: body.categoryTag || null,
        technologies: body.technologies,
        thumbnail: body.thumbnail,
        additionalImages: body.additionalImages || null,
        githubUrl: body.githubUrl || null,
        liveDemoUrl: body.liveDemoUrl || null,
        completionDate: body.completionDate ? new Date(body.completionDate) : null,
        featured: body.featured ?? false,
        published: body.published ?? true,
        order: body.order ?? 0,
        impact: body.impact || null,
        caseStudyHref: body.caseStudyHref || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
