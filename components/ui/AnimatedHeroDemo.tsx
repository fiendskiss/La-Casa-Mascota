"use client";

import { AnimatedMarqueeHero } from "@/components/ui/hero-3";

// A list of sample image URLs for the demo
const DEMO_IMAGES = [
  "/beds.jpg",
  "/toys.webp",
  "/bedss.jpg",
  "/one.jpg",
  "/activities.jpg",
  "/two.jpg",
  "/three.jpg",
  "/four.jpg",
  "/five.jpg",
  "/six.jpg",
  "/seven.jpg",
  "/eight.jpg",
  "/nine.jpg",
  "/ten.jpg",
  "/eleven.jpg",
  "/twelve.jpg",
];

const AnimatedHeroDemo = () => {
  return (
    <AnimatedMarqueeHero
      tagline="Pet boarding and care"
      title={
        <div
          style={{
            fontSize: "clamp(80px, 10vw, 180px)",
            color: "var(--accent-red)",
            fontWeight: 500,
            lineHeight: 1,
            transform: "translateY(-60px)",
          }}
        >
          A CALM PLACE
          <br />
          FOR HAPPY TAILS
        </div>
      }
      description="Comfortable stays, playful days, and gentle care for every pet."
      ctaText="Explore services"
      images={DEMO_IMAGES}
    />
  );
};

export default AnimatedHeroDemo;
