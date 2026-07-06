"use client";
import { ScrollRevealLeft, ScrollRevealRight } from "@/components/scroll-animations";
import { PhoneFrame } from "./PhoneFrame";
import { BrowserFrame } from "./BrowserFrame";
import { CaseStudyScreenText } from "./ScreenTextContent";

interface ScreenShowcaseProps {
  src: string;
  alt: string;
  title: string;
  purpose: string;
  rationale: string;
  reversed?: boolean;
  frameType?: "phone" | "browser";
  accentColor?: string;
}

export function CaseStudyScreenShowcase({ src, alt, title, purpose, rationale, reversed = false, frameType = "phone", accentColor }: ScreenShowcaseProps) {
  const FrameComponent = frameType === "browser" ? BrowserFrame : PhoneFrame;
  const content = <CaseStudyScreenText title={title} purpose={purpose} rationale={rationale} accentColor={accentColor} />;
  const frame = <FrameComponent src={src} alt={alt} />;

  if (reversed) {
    return (
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ScrollRevealRight>{content}</ScrollRevealRight>
        <ScrollRevealLeft>{frame}</ScrollRevealLeft>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <ScrollRevealLeft>{frame}</ScrollRevealLeft>
      <ScrollRevealRight>{content}</ScrollRevealRight>
    </div>
  );
}