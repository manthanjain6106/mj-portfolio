import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "AI chat assistant is reserved for a future release." },
    { status: 501 }
  );
}

export async function GET() {
  return NextResponse.json(
    { message: "AI chat assistant is reserved for a future release." },
    { status: 501 }
  );
}
