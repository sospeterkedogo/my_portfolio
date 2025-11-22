import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header><Navbar /></header>
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </>
  );
}
