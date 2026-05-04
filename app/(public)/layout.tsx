import PublicLayout from "@/components/PublicLayout";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Home",
  description: "Sospeter Kedogo — Full-stack software engineer based in Northampton, UK.",
};


export default function PublicRootLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}