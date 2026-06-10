import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

// GET /api/messages/[id] - Get a single message (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const message = await db.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("[Messages API] Error fetching message:", error);
    return NextResponse.json(
      { error: "Failed to fetch message." },
      { status: 500 }
    );
  }
}

// PATCH /api/messages/[id] - Update message status (admin only)
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

    // Parse body safely
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    // Verify message exists
    const existing = await db.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    // Build update data based on provided fields
    const updateData: Record<string, unknown> = {};

    if (typeof (body as Record<string, unknown>)?.isRead === "boolean") {
      updateData.isRead = (body as Record<string, unknown>).isRead;
    }
    if (typeof (body as Record<string, unknown>)?.isArchived === "boolean") {
      updateData.isArchived = (body as Record<string, unknown>).isArchived;
    }
    if (typeof (body as Record<string, unknown>)?.isReplied === "boolean") {
      updateData.isReplied = (body as Record<string, unknown>).isReplied;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updated = await db.contactMessage.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[Messages API] Error updating message:", error);
    return NextResponse.json(
      { error: "Failed to update message." },
      { status: 500 }
    );
  }
}

// DELETE /api/messages/[id] - Delete a message (admin only)
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

    // Verify message exists
    const existing = await db.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    await db.contactMessage.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("[Messages API] Error deleting message:", error);
    return NextResponse.json(
      { error: "Failed to delete message." },
      { status: 500 }
    );
  }
}
