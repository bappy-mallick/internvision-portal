import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ── Fonts ─────────────────────────────────────────────────────
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ── Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "InternVision Portal",
    template: "%s | InternVision Portal",
  },
  description:
    "Register for courses, complete online payments, and apply for internships at InternVision Tech.",
  keywords: [
    "internship",
    "course registration",
    "InternVision",
    "online learning",
    "Java",
    "Spring Boot",
  ],
  authors: [{ name: "InternVision Tech" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://internvision-portal.onrender.com"
  ),
  openGraph: {
    type: "website",
    title: "InternVision Portal",
    description:
      "Register for courses, complete online payments, and apply for internships at InternVision Tech.",
    siteName: "InternVision Portal",
  },
};

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
