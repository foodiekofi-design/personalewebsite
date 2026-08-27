import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import MusicPlayer from "./components/MusicPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteDescription =
  "Product designer and co-founder of a film-discovery app, with 5+ years across consumer and enterprise products. I design for iOS and Android and ship in real code. Open to senior and staff product design roles at ambitious teams.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jedblankson.com"),
  title: "Jed Blankson, Product Designer",
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jed Blankson, Product Designer",
    description: siteDescription,
    url: "https://jedblankson.com",
    siteName: "Jed Blankson",
    type: "website",
    locale: "en_GB",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Jed Blankson, Product Designer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jed Blankson, Product Designer",
    description: siteDescription,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-[#0a0a0a] font-[var(--font-inter)] antialiased">
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
