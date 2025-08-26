/* eslint-disable @next/next/no-img-element */
"use client";

import { DotScreenShader } from "@/components/ui/dot-shader-background";
import { HeroSection } from "@/components/hero-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DotScreenShader />
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-grow min-h-0">
          <HeroSection />
        </div>
        <div className="shrink-0">
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}

export const runtime = "edge";
export const maxDuration = 45;