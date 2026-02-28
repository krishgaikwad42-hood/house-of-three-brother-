import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "House of Three Brothers | Minimal Luxury Menswear",
  description: "Direct-to-consumer luxury menswear capturing the essence of minimal, editorial aesthetics.",
};

import { AuthProvider } from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased text-black bg-white min-h-screen flex flex-col`} suppressHydrationWarning>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </AuthProvider>
      </body>
    </html>
  );
}
