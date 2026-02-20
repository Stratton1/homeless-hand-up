import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homeless Hand Up — Give directly. Change lives.",
  description:
    "A contactless donation platform that lets you give directly to homeless individuals via QR code. No cash needed. Funds are protected with spending safeguards and built-in savings.",
  openGraph: {
    title: "Homeless Hand Up — Give directly. Change lives.",
    description:
      "Scan. Tap. Give. A new way to help homeless people directly — no cash, no middleman.",
    type: "website",
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
