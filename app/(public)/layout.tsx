import PublicLayout from "@/components/PublicLayout";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Portfolio",
  description: "My Portfolio",
};


export default function PublicRootLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}