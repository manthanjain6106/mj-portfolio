import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadImageBuffer } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB per PRD section 10
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

export async function POST(request: Request) {
  try {
    const session = await auth();
    const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
    const userEmail = session?.user?.email?.toLowerCase().trim();

    if (!session || !userEmail || !adminEmail || userEmail !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided for upload" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type: ${file.type}. Allowed formats: JPG, PNG, WebP, GIF, AVIF.`,
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File size exceeds the 5 MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB).`,
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImageBuffer(buffer, "mj-portfolio/projects");

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during image upload",
      },
      { status: 500 }
    );
  }
}
