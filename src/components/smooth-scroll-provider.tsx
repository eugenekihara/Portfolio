"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger's ticker
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's ticker instead of requestAnimationFrame
    // This keeps both Lenis and ScrollTrigger in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after a short delay to ensure
    // all DOM elements are measured correctly
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Also refresh on window load (images etc.)
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      setTimeout(() => ScrollTrigger.refresh(), 200);
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Expose lenis instance for any external usage
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("load", handleLoad);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
