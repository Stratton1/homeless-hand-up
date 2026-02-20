"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AutoRefreshProps {
  intervalMs?: number;
}

export default function AutoRefresh({ intervalMs = 30000 }: AutoRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    const handle = window.setInterval(() => {
      router.refresh();
    }, intervalMs);

    return () => {
      window.clearInterval(handle);
    };
  }, [intervalMs, router]);

  return null;
}
