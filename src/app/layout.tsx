import type { Metadata } from "next";
import "./globals.css";
import { APP_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Homeless Hand Up — Give directly. Change lives.",
  description:
    "A contactless donation platform that lets you give directly to homeless individuals via QR code. No cash needed. Funds are protected with spending safeguards and built-in savings.",
  metadataBase: new URL(APP_CONFIG.appUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Homeless Hand Up — Give directly. Change lives.",
    description:
      "Scan. Tap. Give. A new way to help homeless people directly — no cash, no middleman.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Homeless Hand Up",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="bg-brand-cream text-brand-dark antialiased">
        {children}
      </body>
    </html>
  );
}
