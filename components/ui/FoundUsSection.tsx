"use client";

import Image from "next/image";
import gsap from "gsap";

export default function FoundUsSection() {
  return (
    <section className="relative w-screen min-h-screen bg-[var(--cream)] overflow-hidden flex items-start justify-center pt-32 md:pt-40">

      {/* TOP BRUSH */}
      <div className="absolute top-0 left-0 w-full h-40 bg-[url('/brush.png')] bg-cover bg-center opacity-80" />

      {/* CENTER CONTENT */}
      <div className="relative z-20 text-center">
        <p className="text-[var(--accent-red)] font-semibold tracking-[0.2em] mb-3">
          FIND US HERE
        </p>

        <div className="w-6 h-6 rounded-full bg-red-500 mx-auto mb-6" />

        {/* UNDERLINE HOVER EFFECT */}
        <h2 className="group inline-block text-5xl sm:text-6xl md:text-8xl font-extrabold text-[var(--accent-red)] tracking-tight cursor-pointer">
          @LACASAMASCOTA
          <span className="block h-[3px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-2"></span>
        </h2>
      </div>
      {/* TOP FLOATING MINI TEXT */}
        <div className="absolute bottom-0 top-[40%] hidden max-w-[500px] text- md:block">
          <p className="font-medium uppercase text-[var(--accent-red)] tracking-[0.1em] [writing-mode:horizontal-rl] [text-orientation:upright]">
            Your trusted pet care companion.
          </p>
        </div>

      {/* IMAGE LAYOUT (CLEAN + BALANCED) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">

        {/* LEFT COLUMN */}
        <Img src="/dog1.jpg" className="top-24 left-10 w-32 h-32 md:w-40 md:h-40" />
        <Img src="/dodo1.png" className="top-60 left-24 w-[220px] h-[220px] md:w-[280px] md:h-[280px]" />
        <Img src="/ogog.jpg" className="bottom-24 left-16 w-[260px] h-[260px] md:w-[320px] md:h-[320px]" />

        {/* RIGHT COLUMN */}
        <Img src="/dog6.jpg" className="top-24 right-10 w-32 h-32 md:w-40 md:h-40" />
        <Img src="/dog5.jpg" className="top-60 right-24 w-[220px] h-[220px] md:w-[280px] md:h-[280px]" />
        <Img src="/dodo.webp" className="bottom-24 right-16 w-[260px] h-[200px] md:w-[340px] md:h-[260px]" />

        {/* CENTER FEATURE IMAGE */}
        <Img src="/pota.jpg" className="bottom-10 left-1/2 -translate-x-1/2 w-[240px] h-[280px] md:w-[320px] md:h-[380px]" />

      </div>
    </section>
  );
}

function Img({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  const handleEnter = (e: any) => {
    gsap.to(e.currentTarget, {
      y: -12,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = (e: any) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`absolute pointer-events-auto ${className} rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15)]`}
    >
      <Image
        src={src}
        alt="dog"
        fill
        className="object-cover"
      />
    </div>
  );
}
