import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Yanuar Tri Laksono - Android Developer & Software Engineer",
  description: "Portfolio of Yanuar Tri Laksono - Android Developer with 5 years of experience in mobile app development using Flutter, Kotlin, and Java",
  keywords: ["Android Developer", "Flutter Developer", "Mobile App Development", "Software Engineer", "Yanuar Tri Laksono"],
  authors: [{ name: "Yanuar Tri Laksono" }],
  creator: "Yanuar Tri Laksono",
  openGraph: {
    title: "Yanuar Tri Laksono - Android Developer",
    description: "Portfolio of an experienced Android Developer specializing in Flutter and native mobile development",
    url: "https://yanuar.dev",
    siteName: "Yanuar Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
