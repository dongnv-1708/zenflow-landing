import { Hero } from "@/components/landing/Hero";
import { Architecture } from "@/components/landing/Architecture";
import { AICore } from "@/components/landing/AICore";
import { MotionGrid } from "@/components/landing/MotionGrid";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-deep-black">
      <Hero />
      <Architecture />
      <AICore />
      <MotionGrid />
      <FinalCTA />
    </main>
  );
}
