import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { GridOverlay } from "@/components/dev/GridOverlay";
import { Trackers } from "@/components/analytics/Trackers";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Channel Partners", template: "%s | Channel Partners" },
  description: "Where brand meets belief.",
  verification: {
    google: "2agM_22QaHEmX1uFQsekb2oxD1okImMdVzyE0DMPdjE",
    other: {
      "facebook-domain-verification": "ro2m96wbr9abxy71w5cj8boqxit18h",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kws1oyy.css" />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Trackers />

        <main className="flex-1">{children}</main>
        <Footer />
        <GridOverlay />
      </body>
    </html>
  );
}
