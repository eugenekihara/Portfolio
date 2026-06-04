import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

// PATCH /api/projects/reorder - Reorder projects (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { orders } = body as { orders: { id: string; order: number }[] };

    if (!orders || !Array.isArray(orders)) {
      return NextResponse.json(
        { error: "Invalid orders format" },
        { status: 400 }
      );
    }

    // Update each project's order in a transaction
    await db.$transaction(
      orders.map(({ id, order }) =>
        db.project.update({
          where: { id },
          data: { order },
        })
      )
    );

    return NextResponse.json({ message: "Projects reordered successfully" });
  } catch (error) {
    console.error("Error reordering projects:", error);
    return NextResponse.json(
      { error: "Failed to reorder projects" },
      { status: 500 }
    );
  }
}
