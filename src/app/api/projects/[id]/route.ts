import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

// GET /api/projects/[id] - Get single project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await db.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // If unpublished, only admin can view
    if (!project.published) {
      const session = await requireAdmin();
      if (!session) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update project (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Check if project exists
    const existing = await db.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Check for slug conflict if slug is being changed
    if (body.slug && body.slug !== existing.slug) {
      const slugConflict = await db.project.findUnique({
        where: { slug: body.slug },
      });
      if (slugConflict) {
        return NextResponse.json(
          { error: "A project with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const project = await db.project.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.shortDescription !== undefined && { shortDescription: body.shortDescription }),
        ...(body.detailedDescription !== undefined && { detailedDescription: body.detailedDescription || null }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.categoryTag !== undefined && { categoryTag: body.categoryTag || null }),
        ...(body.technologies !== undefined && { technologies: body.technologies }),
        ...(body.thumbnail !== undefined && { thumbnail: body.thumbnail }),
        ...(body.additionalImages !== undefined && { additionalImages: body.additionalImages || null }),
        ...(body.githubUrl !== undefined && { githubUrl: body.githubUrl || null }),
        ...(body.liveDemoUrl !== undefined && { liveDemoUrl: body.liveDemoUrl || null }),
        ...(body.completionDate !== undefined && { completionDate: body.completionDate ? new Date(body.completionDate) : null }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.published !== undefined && { published: body.published }),
        ...(body.order !== undefined && { order: body.order }),
        ...(body.impact !== undefined && { impact: body.impact || null }),
        ...(body.caseStudyHref !== undefined && { caseStudyHref: body.caseStudyHref || null }),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete project (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await db.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    await db.project.delete({ where: { id } });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
