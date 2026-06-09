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

// Basic email format validation (no HTML sanitization for email - preserve @ and .)
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize text input - strip HTML tags and trim whitespace
function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .trim();
}

// POST /api/contact - Public endpoint for contact form submissions
export async function POST(request: NextRequest) {
  console.log("[Contact API] Received POST request");
  console.log("[Contact API] Content-Type:", request.headers.get("content-type"));

  try {
    // Rate limiting by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    console.log("[Contact API] Client IP:", ip);

    if (isRateLimited(ip)) {
      console.warn(`[Contact API] Rate limited request from IP: ${ip}`);
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    // Parse request body safely
    let body: unknown;
    try {
      body = await request.json();
      console.log("[Contact API] Parsed body keys:", Object.keys(body as Record<string, unknown>));
    } catch (parseErr) {
      console.error("[Contact API] Failed to parse request body:", parseErr);
      return NextResponse.json(
        { error: "Invalid request. Please try again." },
        { status: 400 }
      );
    }

    // Extract fields - validate types before sanitization
    const rawFullName = (body as Record<string, unknown>)?.fullName;
    const rawEmail = (body as Record<string, unknown>)?.email;
    const rawMessage = (body as Record<string, unknown>)?.message;

    console.log("[Contact API] Raw fields - fullName:", typeof rawFullName, "email:", typeof rawEmail, "message:", typeof rawMessage);

    // Sanitize: text fields get HTML stripped, email is just trimmed (preserve @ and .)
    const fullName = typeof rawFullName === "string" ? sanitizeText(rawFullName) : "";
    const email = typeof rawEmail === "string" ? rawEmail.trim() : "";
    const message = typeof rawMessage === "string" ? sanitizeText(rawMessage) : "";

    console.log("[Contact API] Sanitized - fullName:", `"${fullName}"`, "email:", `"${email}"`, "message length:", message.length);

    // Validation with specific error messages
    if (!fullName || fullName.length < 2) {
      console.warn("[Contact API] Validation failed: fullName too short or empty");
      return NextResponse.json(
        { error: "Please enter your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (fullName.length > 100) {
      console.warn("[Contact API] Validation failed: fullName too long");
      return NextResponse.json(
        { error: "Name must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    if (!email) {
      console.warn("[Contact API] Validation failed: email empty");
      return NextResponse.json(
        { error: "Please enter your email address." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      console.warn("[Contact API] Validation failed: invalid email format:", email);
      return NextResponse.json(
        { error: "Please enter a valid email address (e.g., name@example.com)." },
        { status: 400 }
      );
    }

    if (email.length > 200) {
      console.warn("[Contact API] Validation failed: email too long");
      return NextResponse.json(
        { error: "Email must be 200 characters or fewer." },
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      console.warn("[Contact API] Validation failed: message too short or empty");
      return NextResponse.json(
        { error: "Please enter a message (at least 5 characters)." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      console.warn("[Contact API] Validation failed: message too long");
      return NextResponse.json(
        { error: "Message must be 5000 characters or fewer." },
        { status: 400 }
      );
    }

    console.log("[Contact API] All validations passed. Checking for duplicates...");

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
        console.warn(`[Contact API] Duplicate submission from: ${email}`);
        return NextResponse.json(
          { error: "You've already sent this message recently." },
          { status: 409 }
        );
      }
    } catch (dbError) {
      console.error("[Contact API] Database read error during duplicate check:", dbError);
      // Continue with submission even if duplicate check fails
    }

    // Save the message
    console.log("[Contact API] Saving message to database...");
    try {
      const contactMessage = await db.contactMessage.create({
        data: {
          fullName,
          email,
          message,
        },
      });

      console.log(`[Contact API] Message saved successfully: ${contactMessage.id} from ${email}`);

      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully!",
          id: contactMessage.id,
        },
        { status: 201 }
      );
    } catch (dbWriteError) {
      console.error("[Contact API] Database write error:", dbWriteError);
      return NextResponse.json(
        { error: "Unable to save your message right now. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[Contact API] Unexpected error processing contact form:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again later." },
      { status: 500 }
    );
  }
}
