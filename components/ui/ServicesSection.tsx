"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ─── Basketball SVG as a reusable component ────────────────────────────────
function BasketballLines({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* outer circle */}
      <circle cx="200" cy="200" r="198" stroke="white" strokeWidth="6" />
      {/* vertical seam */}
      <path
        d="M200 2 C140 80 140 320 200 398"
        stroke="white"
        strokeWidth="6"
        fill="none"
      />
      {/* vertical seam mirror */}
      <path
        d="M200 2 C260 80 260 320 200 398"
        stroke="white"
        strokeWidth="6"
        fill="none"
      />
      {/* horizontal equator */}
      <line x1="2" y1="200" x2="398" y2="200" stroke="white" strokeWidth="6" />
      {/* upper arc */}
      <path
        d="M2 200 C80 140 320 140 398 200"
        stroke="white"
        strokeWidth="6"
        fill="none"
      />
      {/* lower arc */}
      <path
        d="M2 200 C80 260 320 260 398 200"
        stroke="white"
        strokeWidth="6"
        fill="none"
      />
    </svg>
  );
}

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const bgBallRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bookBtnRef = useRef<HTMLAnchorElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const foundRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Phase 1: ball grows from tiny dot → fills viewport ──────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Hero text stays, ball grows from tiny to fill screen
      tl.fromTo(
        ballRef.current,
        { scale: 0.08, opacity: 1 },
        { scale: 12, opacity: 1, ease: "power2.inOut", duration: 5 }
      )
        // fade out hero text as ball expands
        .to(
          heroTextRef.current,
          { opacity: 0, ease: "power1.in", duration: 2 },
          "<0.5"
        )
        .to(
          subtitleRef.current,
          { opacity: 0, ease: "power1.in", duration: 1.5 },
          "<"
        )
        // reveal section 2 content while ball is huge
        .fromTo(
          section2Ref.current,
          { opacity: 0 },
          { opacity: 1, ease: "power2.out", duration: 2 },
          "-=2"
        )
        // ball shrinks back into background decorative element
        .to(
          ballRef.current,
          { scale: 18, opacity: 0.55, ease: "power2.inOut", duration: 3 },
          "-=1.5"
        );

      // ── Phase 2: heading + book btn animate in ───────────────────────────
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        bookBtnRef.current,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Phase 3: desc + photos stagger ───────────────────────────────────
      gsap.fromTo(
        descRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (photosRef.current) {
        const photos = photosRef.current.querySelectorAll(".photo-card");
        gsap.fromTo(
          photos,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: photosRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      gsap.fromTo(
        foundRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: foundRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/*
       * ── SECTION 1 (pinned hero) ──────────────────────────────────────── *
       * cream/pink background, full-viewport. GSAP pins this while scrolling
       */}
      <div
        ref={containerRef}
        className="services-hero"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#efc6cf",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* HERO TEXT */}
        <div
          ref={heroTextRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 4vw",
            zIndex: 2,
            textAlign: "center",
          }}
        >
         <h2
  style={{
    fontFamily: " 'Oswald' ",
    fontWeight: 200,
    fontSize: "clamp(2rem, 5.5vw, 9rem)",
    lineHeight: 1,
    color: "var(--accent-red)",
    textTransform: "uppercase",
    letterSpacing: "-0.01em",
    margin: 0,
  }}
>
            WHETHER YOU REQUIRE DAILY
            <br />
            VISITS, OVERNIGHT STAYS, EXTENDED
            <br />
            CARE FOR LONG PERIODS
            <br />
            OF TRAVEL, OUR TEAM IS HERE TO  
            <br />
            MAKE YOUR TIME.
          </h2>
        </div>

        {/* SUBTITLE */}
        <p
          ref={subtitleRef}
          style={{
            position: "absolute",
            bottom: "3vh",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(0.7rem, 1.1vw, 1rem)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent-red)",
            whiteSpace: "nowrap",
            zIndex: 3,
          }}
        >
          WE CALL IT A WIN&#8209;WIN (OR A WOOF&#8209;WOOF)
        </p>

         {/* THE BALL — starts small, expands via GSAP */}
<div
  ref={ballRef}
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) scale(0.08)",
    width: "min(55vw, 55vh)",
    height: "min(55vw, 55vh)",
    transformOrigin: "center center",
    zIndex: 4,
    borderRadius: "50%",
    overflow: "hidden",
    pointerEvents: "none",
  }}
>
  <Image
    src="/dog-ball.png"
    alt="basketball"
    fill
    style={{ objectFit: "cover" }}
  />
</div>

        {/* ── SECTION 2 content overlaid (fades in during pin) ─────────── */}
        <div
          ref={section2Ref}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            zIndex: 5,
            background: "linear-gradient(to bottom, #efc6cf 0%)",
            pointerEvents: "none",
          }}
        >
          {/* Heading top-left */}
          <h2
            ref={headingRef}
            style={{
              position: "relative",
              top: "11vh",
              left: "20vw",
              fontFamily: "'Oswald'",
              fontWeight: 800,
              fontSize: "clamp(3.5rem, 10vw, 11rem)",
              lineHeight: 1.0,
              color: "var(--accent-red)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            la casa mascota
          </h2>

          {/* Book Now circular button top-right */}
          <Link
            href="/Booking"
            ref={bookBtnRef}
            style={{
              position: "absolute",
              top: "34%",
              left: "43%",
              width: "clamp(120px, 16vw, 220px)",
              height: "clamp(120px, 16vw, 220px)",
              aspectRatio: "1 / 1",
              flexShrink: 0,
              borderRadius: "50%",
              backgroundColor: "#e8d8d8",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.8rem, 1.5vw, 1.2rem)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent-red)",
              pointerEvents: "all",
              zIndex: 20,
              transition: "background-color 0.25s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--accent-red)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#f0e8e8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#e8d8d8";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-red)";
            }}
          >
            BOOK NOW •
          </Link>
         {/* ── SECTION 3 (normal flow content) ───────────────────────── */}

  <div
    style={{
      position: "relative",
      zIndex: 1,
      width: "100%",
      background:" linear-gradient(to bottom, #efc6cf 40%, var(--cream) 100%)",
      overflow: "hidden",
      paddingBottom: "8vh",
      marginTop: "40vh",
    }}
  >
    {/* Description */}
    <p
      ref={descRef}
      style={{
        maxWidth: "65ch",
        margin: "10vh auto 6vh",
        textAlign: "center",
        fontFamily: "'Oswald'",
        fontWeight: 700,
        fontSize: "clamp(1rem, 2.2vw, 1.7rem)",
        lineHeight: 1.4,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--accent-red)",
        padding: "0 5vw",
      }}
    >
      CONNECTS PET OWNERS WITH A TEAM OF EXPERIENCED AND PASSIONATE ANIMAL
      LOVERS, ENSURING THAT THE HIGHEST LEVEL OF CARE AND ATTENTION IS
      PROVIDED TO YOUR FURRY FAMILY MEMBER.
    </p>

    {/* Label */}
    <p
      ref={foundRef}
      style={{
        textAlign: "center",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 600,
        fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--accent-red)",
        marginBottom: "3vh",
      }}
    >
      woof & meow
    </p>
  </div>
</div>

        {/* Photo grid */}
        <div
          ref={photosRef}
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5vw",
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 5vw",
          }}
        >
          {[
            
          ].map(({ bg, label }) => (
            <div
              key={label}
              className="photo-card"
              style={{
                aspectRatio: "4/3",
                borderRadius: "8px",
                backgroundColor: bg,
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.8rem, 1.4vw, 1.1rem)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#f5f0e8",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&display=swap');
      `}</style>
    </>
  );
}
