import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

// GET /api/messages/stats - Admin message statistics
export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, unread, thisMonth, archived] = await Promise.all([
      db.contactMessage.count(),
      db.contactMessage.count({ where: { isRead: false, isArchived: false } }),
      db.contactMessage.count({ where: { createdAt: { gte: startOfMonth } } }),
      db.contactMessage.count({ where: { isArchived: true } }),
    ]);

    return NextResponse.json({
      total,
      unread,
      thisMonth,
      archived,
    });
  } catch (error) {
    console.error("[Messages Stats API] Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch message stats." },
      { status: 500 }
    );
  }
}
