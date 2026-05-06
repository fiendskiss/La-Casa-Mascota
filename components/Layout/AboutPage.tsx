"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import Img from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const rotatingTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroTextRef.current) return;

      gsap.from(heroTextRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });

      const circles = gsap.utils.toArray<HTMLElement>(".floating-circle");

      circles.forEach((circle) => {
        gsap.to(circle, {
          y: gsap.utils.random(-20, 20),
          x: gsap.utils.random(-20, 20),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      if (rotatingTextRef.current && circleRef.current) {
        gsap.to(rotatingTextRef.current, {
          rotate: 360,
          transformOrigin: "50% 50%",
          ease: "none",
          scrollTrigger: {
            trigger: circleRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      gsap.from(".mission-text span", {
        opacity: 0.2,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden bg-[#efc6cf]">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 overflow-hidden bg-[#efc6cf]">

        <div className="absolute inset-0 -z-10 flex flex-wrap justify-center items-center opacity-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="floating-circle w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-brand-red/10 m-4"
            />
          ))}
        </div>

        <span className="text-lg sm:text-xl font-bold text-[var(--accent-red)] tracking-widest uppercase mb-6 sm:mb-10">
          Built with love
        </span>

        <h1
          ref={heroTextRef}
          className="font-display text-[clamp(40px,10vw,140px)] leading-[0.9] text-[var(--accent-red)] uppercase tracking-tighter"
        >
          A home-inspired space 
          <br />
          for your pets
        </h1>

        <div className="mt-10 sm:mt-12 animate-bounce">
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        {/* CIRCLE IMAGE */}
        <div className="mt-10 flex justify-center">
          <div className="relative w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] rounded-full border-[5px] border-brand-red overflow-hidden">
            <Img
              src="/pets.png"
              alt="dog"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative py-24 sm:py-40 px-4 text-center overflow-hidden bg-[#efc6cf] mission-section">

        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[600px] sm:w-[1200px] h-[300px] sm:h-[500px] bg-white/30 rounded-[50%] top-[-150px] sm:top-[-200px] left-1/2 -translate-x-1/2 blur-3xl" />
          <div className="absolute w-[600px] sm:w-[1200px] h-[300px] sm:h-[500px] bg-white/30 rounded-[50%] bottom-[-150px] sm:bottom-[-200px] left-1/2 -translate-x-1/2 blur-3xl" />
        </div>

        <p className="text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-[var(--accent-red)] mb-8 sm:mb-10">
          OUR MISSION
        </p>

        <h2 className="mission-text font-display font-bold text-[clamp(32px,6vw,110px)] leading-[1.1] text-[var(--accent-red)] uppercase max-w-[1200px] mx-auto px-2">
          <span>WE SPECIALIZE IN PROVIDING </span>
          <span>RELIABLE, COMPASSIONATE, AND </span>
          <span>PERSONALIZED PET CARE </span>
          <span>SERVICES TAILORED TO MEET THE </span>
          <span>UNIQUE NEEDS OF YOUR FURRY </span>
        </h2>
      </section>

      {/* CIRCULAR SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#efc6cf] py-24 overflow-hidden">

        <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <span className="text-xl font-bold tracking-widest uppercase vertical-text text-[var(--accent-red)]">
            The Love Your
          </span>
        </div>

        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <span className="text-xl font-bold tracking-widest uppercase vertical-text text-[var(--accent-red)]">
            PET Deserves
          </span>
        </div>

        <div
          ref={circleRef}
          className="relative w-[85vw] max-w-[600px] aspect-square flex items-center justify-center"
        >
          {/* ROTATING TEXT */}
          <div ref={rotatingTextRef} className="absolute inset-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="font-display text-[8px] uppercase fill-brand-red tracking-[0.2em]">
                <textPath href="#circlePath">
                  Make your cat happy! • Make your dog happy! • Make your cat happy! •
                </textPath>
              </text>
            </svg>
          </div>

          {/* CENTER VIDEO */}
          <div className="w-[70%] aspect-square rounded-full overflow-hidden border-4 border-brand-red relative group cursor-pointer">
            <video
              src="/pets.mp4"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="absolute inset-0 flex items-center justify-center bg-brand-red/20 group-hover:bg-transparent transition-colors" />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-white bg-brand-red px-2 py-1 rounded">
              My Childhood Video
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}