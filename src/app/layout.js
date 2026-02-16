
import { Outfit, Inter } from "next/font/google"; // Using generic names, but next/font/google handles downloads
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata = {
  title: " | Real-time Crypto Insights",
  description: "Track cryptocurrency prices, charts, and market trends with precision.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans bg-white text-gray-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
