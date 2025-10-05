import "./globals.css";
import { ReactNode } from 'react';
import Navbar from '../components/NavBar';
import { Inter, Montserrat, Bebas_Neue } from "next/font/google";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My Portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} ${bebas.variable} flex flex-col min-h-screen bg-[#1c1c1c] antialiased max-w-full overflow-x-hidden`}>

        <header>
          <Navbar />
        </header>
        <main className="flex-1 w-full">{children}</main>
        <Footer />

      </body>
    </html>
  );
}
