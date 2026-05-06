"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);


// ─── MAIN ─────────────────────────────────────────
export default function Services() {
  const [activeIndex, setActiveIndex] = useState(3);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subLeft = useRef<HTMLSpanElement>(null);
  const subRight = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        subLeft.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1 },
        "-=0.5"
      )
      .fromTo(
        subRight.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1 },
        "<"
      );
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        body { background: #efc6cf; margin:0; }
      `}</style>

      {/* HERO */}
      <section
        style={{
          padding: "60px 40px",
        }}
      >
        <h1
          ref={titleRef}
          style={{
            textAlign: "center",
            fontFamily: "Oswald",
            fontSize: "clamp(60px, 14vw, 200px)",
            color: "var(--accent-red)",
            margin: 0,
            lineHeight: 2,
          }}
        >
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            fontFamily: "Anton",
            fontSize: 12,
            color: "var(--accent-red)",
            letterSpacing: 2,
          }}
        >
          <span ref={subLeft}>FROM PLAYTIME TO REST TIME</span>
          <span ref={subRight}>WE’VE GOT THEM COVERED</span>
        </div>

  
</section>

    </>
  );
}