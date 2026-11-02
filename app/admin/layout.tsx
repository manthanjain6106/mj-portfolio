import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Manthan",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className="bg-background min-h-screen">{children}</div>;
}
