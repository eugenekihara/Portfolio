"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Scroll Reveal: Fade + Slide Up ─── */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 60,
  duration = 1,
  start = "top 85%",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, y, duration, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Scroll Reveal from Left ─── */
export function ScrollRevealLeft({
  children,
  className = "",
  delay = 0,
  x = -80,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  x?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, x });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, x]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Scroll Reveal from Right ─── */
export function ScrollRevealRight({
  children,
  className = "",
  delay = 0,
  x = 80,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  x?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, x });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, x]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Scale In from Small ─── */
export function ScaleIn({
  children,
  className = "",
  delay = 0,
  from = 0.85,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, scale: from });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Parallax: Moves element at different scroll speed ─── */
export function Parallax({
  children,
  className = "",
  speed = 0.5,
  direction = "vertical",
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "vertical" | "horizontal";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prop = direction === "vertical" ? "y" : "x";

    const tween = gsap.to(el, {
      [prop]: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Text Split & Reveal: Splits text into words and reveals on scroll ─── */
export function SplitTextReveal({
  text,
  className = "",
  tag: Tag = "h2",
  staggerDelay = 0.03,
}: {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  staggerDelay?: number;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = text.split(" ");
    container.innerHTML = words
      .map(
        (word) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span style="display:inline-block;transform:translateY(100%)">${word}</span></span>`
      )
      .join(" ");

    const innerSpans = container.querySelectorAll("span > span");

    gsap.set(innerSpans, { y: "100%" });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      onEnter: () => {
        gsap.to(innerSpans, {
          y: "0%",
          duration: 0.8,
          stagger: staggerDelay,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [text, staggerDelay]);

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={className}>
      {text}
    </Tag>
  );
}

/* ─── Staggered Children: Reveals children with stagger ─── */
export function StaggerReveal({
  children,
  className = "",
  stagger = 0.1,
  y = 40,
  childSelector = "> *",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  childSelector?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [stagger, y, childSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Horizontal Scroll Section ─── */
export function HorizontalScroll({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex gap-6 will-change-transform">
        {children}
      </div>
    </div>
  );
}

/* ─── Draw Line: Animates a line width/height on scroll ─── */
export function DrawLine({
  direction = "horizontal",
  className = "",
  color = "var(--accent)",
  thickness = "1px",
}: {
  direction?: "horizontal" | "vertical";
  className?: string;
  color?: string;
  thickness?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prop = direction === "horizontal" ? "scaleX" : "scaleY";
    gsap.set(el, { [prop]: 0, transformOrigin: "left center" });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        gsap.to(el, {
          [prop]: 1,
          duration: 1.2,
          ease: "power3.inOut",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [direction]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        [direction === "horizontal" ? "height" : "width"]: thickness,
        background: color,
      }}
    />
  );
}

/* ─── Clip Reveal: Reveals with clip-path animation ─── */
export function ClipReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, {
      clipPath: "inset(100% 0% 0% 0%)",
      opacity: 0,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          delay,
          ease: "power3.inOut",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─── Hero Parallax: For hero section — elements move at different speeds ─── */
export function useHeroParallax() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const blobs = hero.querySelectorAll(".hero-blob");
    const content = hero.querySelector(".hero-content");

    if (blobs.length) {
      gsap.to(blobs, {
        y: (i: number) => 150 * (i + 1) * 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (content) {
      gsap.to(content, {
        y: 100,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === hero) t.kill();
      });
    };
  }, []);

  return heroRef;
}

/* ─── Magnetic Hover: For buttons and interactive elements ─── */
export function MagneticHover({
  children,
  className = "",
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

/* ─── Scroll Progress Bar ─── */
export function ScrollProgress({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        gsap.to(el, { scaleX: self.progress, duration: 0.1 });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 right-0 h-[2px] bg-accent z-[100] ${className}`}
    />
  );
}
