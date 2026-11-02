import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteCloudinaryImage } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
    const userEmail = session?.user?.email?.toLowerCase().trim();

    if (!session || !userEmail || !adminEmail || userEmail !== adminEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { publicId } = body;

    if (!publicId || typeof publicId !== "string") {
      return NextResponse.json(
        { error: "A valid publicId string is required" },
        { status: 400 }
      );
    }

    const success = await deleteCloudinaryImage(publicId);

    return NextResponse.json({ success });
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during image deletion",
      },
      { status: 500 }
    );
  }
}
