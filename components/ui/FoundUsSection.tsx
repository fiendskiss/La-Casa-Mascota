"use client";

import Image from "next/image";
import gsap from "gsap";
import type { MouseEvent } from "react";

const galleryImages = [
  "/dog1.jpg",
  "/dodo1.png",
  "/ogog.jpg",
  "/dog6.jpg",
  "/dog5.jpg",
  "/dodo.webp",
  "/pota.jpg",
];

export default function FoundUsSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-[var(--cream)] py-24 sm:py-28 md:py-32 lg:justify-start lg:pt-40">

      {/* TOP BRUSH */}
      <div className="absolute left-0 top-0 h-40 w-full bg-[url('/brush.png')] bg-cover bg-center opacity-80" />

      {/* CENTER CONTENT */}
      <div className="relative z-30 px-4 text-center">
        <p className="mb-3 font-semibold tracking-[0.2em] text-[var(--accent-red)]">
          FIND US HERE
        </p>

        <div className="mx-auto mb-4 h-6 w-6 rounded-full bg-red-500" />

        <p className="mx-auto mb-6 max-w-[500px] font-medium uppercase tracking-[0.1em] text-[var(--accent-red)]">
          Your trusted pet care companion.
        </p>

        {/* UNDERLINE HOVER EFFECT */}
        <h2 className="group inline-block max-w-full cursor-pointer text-[clamp(2.75rem,9vw,6rem)] font-extrabold tracking-tight text-[var(--accent-red)] [overflow-wrap:anywhere]">
          @LACASAMASCOTA
          <span className="mt-2 block h-[3px] origin-left scale-x-0 bg-red-500 transition-transform duration-300 group-hover:scale-x-100"></span>
        </h2>
      </div>

      {/* RESPONSIVE GALLERY */}
      <div className="relative z-10 mt-12 grid w-full max-w-5xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 lg:hidden">
        {galleryImages.map((src) => (
          <ImageCard key={src} src={src} />
        ))}
      </div>

      {/* IMAGE LAYOUT (CLEAN + BALANCED) */}
      <div className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block">

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

function ImageCard({ src }: { src: string }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
      <Image
        src={src}
        alt="Pet at La Casa Mascota"
        fill
        sizes="(min-width: 640px) 33vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}

function Img({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  const handleEnter = (e: MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -12,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
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
        alt="Pet at La Casa Mascota"
        fill
        sizes="340px"
        className="object-cover"
      />
    </div>
  );
}
