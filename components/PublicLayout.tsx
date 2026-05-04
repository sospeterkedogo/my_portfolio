import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Skip-to-content link — hidden until focused (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:font-bold focus:rounded focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
