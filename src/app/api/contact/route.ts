import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Simple in-memory rate limiter for spam prevention
const submissionTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per minute per IP

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
    .replace(/&/g, "&amp;")  // Encode ampersands
    .replace(/</g, "&lt;")   // Encode less-than
    .replace(/>/g, "&gt;")   // Encode greater-than
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
      console.warn(`[Contact] Rate limited request from IP: ${ip}`);
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    // Parse request body safely
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      console.error("[Contact] Failed to parse request body");
      return NextResponse.json(
        { error: "Invalid request. Please try again." },
        { status: 400 }
      );
    }

    // Validate and sanitize fields
    const fullName = typeof (body as Record<string, unknown>)?.fullName === "string"
      ? sanitize((body as Record<string, unknown>).fullName as string)
      : "";
    const email = typeof (body as Record<string, unknown>)?.email === "string"
      ? sanitize((body as Record<string, unknown>).email as string)
      : "";
    const message = typeof (body as Record<string, unknown>)?.message === "string"
      ? sanitize((body as Record<string, unknown>).message as string)
      : "";

    // Validation with specific error messages
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (fullName.length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Please enter your email address." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address (e.g., name@example.com)." },
        { status: 400 }
      );
    }

    if (email.length > 200) {
      return NextResponse.json(
        { error: "Email must be 200 characters or fewer." },
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { error: "Please enter a message (at least 5 characters)." },
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
    try {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const duplicate = await db.contactMessage.findFirst({
        where: {
          email,
          message,
          createdAt: { gte: fiveMinutesAgo },
        },
      });

      if (duplicate) {
        console.warn(`[Contact] Duplicate submission from: ${email}`);
        return NextResponse.json(
          { error: "You've already sent this message recently." },
          { status: 409 }
        );
      }
    } catch (dbError) {
      console.error("[Contact] Database read error during duplicate check:", dbError);
      // Continue with submission even if duplicate check fails
    }

    // Save the message
    try {
      const contactMessage = await db.contactMessage.create({
        data: {
          fullName,
          email,
          message,
        },
      });

      console.log(`[Contact] Message saved successfully: ${contactMessage.id} from ${email}`);

      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully!",
          id: contactMessage.id,
        },
        { status: 201 }
      );
    } catch (dbWriteError) {
      console.error("[Contact] Database write error:", dbWriteError);
      return NextResponse.json(
        { error: "Unable to save your message right now. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[Contact] Unexpected error processing contact form:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again later." },
      { status: 500 }
    );
  }
}
