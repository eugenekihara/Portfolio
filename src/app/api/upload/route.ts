import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";
import { writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

// POST /api/upload - Upload image (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = path.extname(file.name) || ".png";
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(process.cwd(), "public", "uploads", uniqueName);

    // Optimize image with sharp (skip SVG)
    if (file.type !== "image/svg+xml") {
      await sharp(buffer)
        .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(filePath.replace(ext, ".jpg"));

      // Use .jpg extension for optimized images
      return NextResponse.json({
        path: `/uploads/${uniqueName.replace(ext, ".jpg")}`,
      });
    } else {
      // Save SVG as-is
      await writeFile(filePath, buffer);
      return NextResponse.json({
        path: `/uploads/${uniqueName}`,
      });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
