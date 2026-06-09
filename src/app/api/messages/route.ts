import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

// GET /api/messages - Admin endpoint to list all messages with filters
export async function GET(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter") || "all"; // all, unread, read, archived
    const search = searchParams.get("search") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Record<string, unknown> = {};

    switch (filter) {
      case "unread":
        where.isRead = false;
        where.isArchived = false;
        break;
      case "read":
        where.isRead = true;
        where.isArchived = false;
        break;
      case "archived":
        where.isArchived = true;
        break;
      case "all":
      default:
        where.isArchived = false; // By default, exclude archived
        break;
    }

    // Add search filter
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const [messages, total] = await Promise.all([
      db.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          fullName: true,
          email: true,
          message: true,
          isRead: true,
          isArchived: true,
          isReplied: true,
          createdAt: true,
        },
      }),
      db.contactMessage.count({ where }),
    ]);

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
