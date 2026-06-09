import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Simple in-memory rate limiter for spam prevention
const submissionTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 2; // max 2 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissionTimestamps.get(ip) || [];

  // Clean up old timestamps
  const recentTimestamps = timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW
  );

  if (recentTimestamps.length >= RATE_LIMIT_MAX) {
    return true;
  }

  recentTimestamps.push(now);
  submissionTimestamps.set(ip, recentTimestamps);
  return false;
}

// Sanitize string input - strip HTML tags and trim whitespace
function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .trim();
}

// Basic email format validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST /api/contact - Public endpoint for contact form submissions
export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const fullName = typeof body.fullName === "string" ? sanitize(body.fullName) : "";
    const email = typeof body.email === "string" ? sanitize(body.email) : "";
    const message = typeof body.message === "string" ? sanitize(body.message) : "";

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Full name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { error: "Message is required (minimum 5 characters)." },
        { status: 400 }
      );
    }

    // Enforce max lengths
    if (fullName.length > 100) {
      return NextResponse.json(
        { error: "Full name must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    if (email.length > 200) {
      return NextResponse.json(
        { error: "Email must be 200 characters or fewer." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be 5000 characters or fewer." },
        { status: 400 }
      );
    }

    // Check for duplicate submissions (same email + same message within 5 minutes)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const duplicate = await db.contactMessage.findFirst({
      where: {
        email,
        message,
        createdAt: { gte: fiveMinutesAgo },
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "You've already sent this message recently." },
        { status: 409 }
      );
    }

    // Save the message
    const contactMessage = await db.contactMessage.create({
      data: {
        fullName,
        email,
        message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
        id: contactMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
