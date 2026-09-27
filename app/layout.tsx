import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anushka Singh | Economics & Data Analyst",
  description: "JARVIS-style HUD portfolio of Anushka Singh — Economics Postgraduate & Analyst. Specializing in Econometrics, Data Analytics, and Financial Research.",
  keywords: [
    "Anushka Singh", "Economics", "Analyst", "Data Analytics", "Econometrics", 
    "GIPE", "Python", "SQL", "Power BI", "Delhi University", "Portfolio"
  ],
  openGraph: {
    title: "Anushka Singh | Economics & Data Analyst",
    description: "Data analysis, econometrics, and financial research. Explore my live cyber portfolio.",
    url: "https://hud-portfolio.vercel.app",
    siteName: "Anushka Singh Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anushka Singh | Economics & Data Analyst",
    description: "Data analysis, econometrics, and financial research. Explore my live cyber portfolio.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
