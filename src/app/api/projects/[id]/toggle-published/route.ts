import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

// PATCH /api/projects/[id]/toggle-published - Toggle published status (admin only)
export async function PATCH(
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

    const project = await db.project.update({
      where: { id },
      data: { published: !existing.published },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error toggling published:", error);
    return NextResponse.json(
      { error: "Failed to toggle published status" },
      { status: 500 }
    );
  }
}
