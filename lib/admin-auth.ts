import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();
  const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const userEmail = session?.user?.email?.toLowerCase().trim();

  if (!session || !userEmail || !adminEmail || userEmail !== adminEmail) {
    redirect("/admin/login");
  }

  return session;
}

