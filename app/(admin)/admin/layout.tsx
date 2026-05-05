import { Metadata } from "next";
import AdminLayout from "@/app/(admin)/components/AdminLayout";

// Admin pages require authentication and live Supabase data — never prerender.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
