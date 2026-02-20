"use client";

import { useEffect, useState } from "react";

interface QRCodeDisplayProps {
  url: string;
}

/**
 * Client component that generates and displays a QR code.
 * Uses the qrcode library to generate a data URL on mount.
 */
export default function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    async function generateQR() {
      // Dynamic import to avoid SSR issues with the canvas-dependent library
      const QRCode = await import("qrcode");
      const dataUrl = await QRCode.toDataURL(url, {
        width: 200,
        margin: 2,
        color: {
          dark: "#1A1A2E",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "M",
      });
      setQrDataUrl(dataUrl);
    }

    generateQR();
  }, [url]);

  if (!qrDataUrl) {
    return (
      <div className="w-[200px] h-[200px] bg-gray-100 rounded-lg animate-pulse mx-auto" />
    );
  }

  return (
    <img
      src={qrDataUrl}
      alt={`QR code linking to ${url}`}
      width={200}
      height={200}
      className="mx-auto rounded-lg"
    />
  );
}
