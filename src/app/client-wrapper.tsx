"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMusic } from "./musicprovider";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { stopMusic, playMusic } = useMusic();

  useEffect(() => {
    if (!pathname) return;

    // ✅ kalau masuk halaman game -> matiin global music
    if (pathname.startsWith("/game/level/")) {
      stopMusic();
    } else {
      // ✅ kalau di luar game -> hidupkan lagi
      playMusic();
    }
  }, [pathname, stopMusic, playMusic]);

  return <>{children}</>;
}
