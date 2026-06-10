import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Jed Blankson, Product Designer",
  description: "Product designer with 5+ years across B2B SaaS, data tools and consumer apps. I design for iOS and Android, build design systems, and prototype in real code. MSc in HCI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-[#0a0a0a] font-[var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
