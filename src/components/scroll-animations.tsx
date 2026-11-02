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
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.15em"><span style="display:inline-block;transform:translateY(100%)">${word}</span></span>`
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

    // "> *" is not a valid querySelectorAll selector — use el.children instead
    const childElements =
      childSelector === "> *"
        ? el.children
        : el.querySelectorAll(childSelector);
    if (!childElements.length) return;

    const targets = Array.from(childElements);
    gsap.set(targets, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(targets, {
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
  pinOffset = 0,
  indicator = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Distance in px from the top of the viewport where the cards stick (e.g. to clear a fixed nav). */
  pinOffset?: number;
  /** Show a thin progress line and a "Scroll / Swipe" hint under the cards. */
  indicator?: boolean;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const shell = shellRef.current;
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!outer || !shell || !scroller || !track) return;

    // Desktop with motion allowed: vertical scrolling drives the row sideways (CSS sticky).
    // Otherwise (touch, small screens, reduced motion) the row simply scrolls sideways natively.
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

    let trigger: ScrollTrigger | undefined;
    let setX: ((value: number) => void) | undefined;
    let raf = 0;

    const showProgress = (p: number, scrollable: boolean) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (fadeRef.current) fadeRef.current.style.opacity = scrollable && p < 0.97 ? "1" : "0";
      if (indicatorRef.current) indicatorRef.current.style.visibility = scrollable ? "visible" : "hidden";
    };

    // Native mode: progress follows the row's own scroll position.
    const onNativeScroll = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      showProgress(max > 1 ? scroller.scrollLeft / max : 1, max > 1);
    };

    // Sticky mode: the browser must never scroll the (clipped) row itself.
    const lockScroller = () => {
      if (scroller.scrollLeft !== 0) scroller.scrollLeft = 0;
    };

    // A sideways trackpad swipe advances the gallery by scrolling the page,
    // while ordinary vertical wheel/trackpad scrolling is left alone.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      window.scrollBy({ top: e.deltaX, behavior: "instant" as ScrollBehavior });
    };

    // Keyboard: tabbing to an off-screen card scrolls the page just enough to reveal it.
    const onFocusIn = (e: FocusEvent) => {
      if (!trigger) return;
      let item = e.target as HTMLElement | null;
      while (item && item.parentElement !== track) item = item.parentElement;
      if (!item) return;
      const distance = trigger.end - trigger.start;
      const x = -distance * trigger.progress;
      const left = item.offsetLeft + x;
      const right = left + item.offsetWidth;
      if (left >= 0 && right <= scroller.clientWidth) return; // already fully visible
      const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      const wanted = Math.min(distance, Math.max(0, item.offsetLeft - padLeft));
      window.scrollTo({ top: trigger.start + wanted, behavior: "instant" as ScrollBehavior });
    };

    const teardown = () => {
      trigger?.kill();
      trigger = undefined;
      setX = undefined;
      scroller.removeEventListener("scroll", onNativeScroll);
      scroller.removeEventListener("scroll", lockScroller);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("focusin", onFocusIn);
      gsap.set(track, { clearProps: "transform" });
      outer.style.height = "";
      scroller.style.overflowX = "";
    };

    // Sticky, not GSAP pin: nothing is moved or wrapped in the DOM, so the cards always keep
    // their natural height. The outer element is only made taller to create scroll distance.
    const setup = () => {
      teardown();

      if (!mq.matches) {
        scroller.addEventListener("scroll", onNativeScroll, { passive: true });
        onNativeScroll();
        return;
      }

      const distance = Math.max(0, track.scrollWidth - scroller.clientWidth);
      if (distance < 1) {
        showProgress(1, false); // everything fits: nothing to scroll
        return;
      }

      scroller.style.overflowX = "hidden";
      outer.style.height = `${shell.offsetHeight + distance}px`;
      showProgress(0, true);

      setX = gsap.quickTo(track, "x", { duration: 0.6, ease: "power3.out" }) as (value: number) => void;
      trigger = ScrollTrigger.create({
        trigger: outer,
        start: `top ${pinOffset}px`,
        end: `+=${distance}`,
        onUpdate: (self) => {
          setX?.(-distance * self.progress);
          showProgress(self.progress, true);
        },
        onRefresh: (self) => {
          gsap.set(track, { x: -distance * self.progress });
          showProgress(self.progress, true);
        },
      });

      scroller.addEventListener("scroll", lockScroller, { passive: true });
      scroller.addEventListener("wheel", onWheel, { passive: false });
      scroller.addEventListener("focusin", onFocusIn);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(setup);
    };

    setup();
    mq.addEventListener("change", schedule);
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(track);
    document.fonts?.ready.then(schedule).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      teardown();
    };
  }, [pinOffset]);

  return (
    <div ref={outerRef}>
      <div ref={shellRef} style={{ top: pinOffset }} className={`lg:sticky ${className}`}>
        <div className="relative">
          <div
            ref={scrollerRef}
            className="overflow-x-auto overflow-y-hidden overscroll-x-contain max-lg:snap-x max-lg:snap-mandatory max-lg:scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div
              ref={trackRef}
              className="flex gap-5 lg:gap-8 py-2 pl-6 lg:pl-12 pr-6 lg:pr-[22vw] will-change-transform items-stretch"
            >
              {children}
            </div>
          </div>
          {/* Soft edge that hints there is more to the right */}
          <div
            ref={fadeRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 lg:w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent transition-opacity duration-300"
          />
        </div>

        {indicator && (
          <div
            ref={indicatorRef}
            aria-hidden="true"
            className="mt-5 lg:mt-7 px-6 lg:px-12 flex items-center gap-5 text-neutral-500"
          >
            <div className="relative h-px flex-1 bg-neutral-800">
              <div
                ref={barRef}
                className="absolute inset-0 origin-left bg-[#8b4049]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span className="flex items-center gap-2 text-caption font-bold tracking-[0.2em] uppercase">
              <span className="hidden lg:inline">Scroll</span>
              <span className="lg:hidden">Swipe</span>
              <span>→</span>
            </span>
          </div>
        )}
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
