"use client";

import Image from "next/image";
import { FaTiktok, FaWhatsapp, FaFacebook } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-#efc6cf pt-24 sm:pt-28 md:pt-32">
      <div className="container-custom relative flex min-h-[90vh] flex-col justify-between px-4 sm:px-2">

        {/* TOP FLOATING MINI TEXT — desktop only */}
        <div className="absolute right-2 top-[22%] hidden max-w-[280px] text-right lg:block">
          <p className="font-medium uppercase leading-[1.4] tracking-[-0.03em] text-[var(--accent-red)] text-lg">
            We create safe
            <br />
            and loving experiences
            <br />
            for your pets while
            <br />
            you&apos;re away
          </p>
        </div>

        {/* MAIN TEXT + IMAGE ROW */}
        <div className="relative flex flex-1 flex-col justify-between lg:flex-row lg:items-start">

          {/* LEFT HEADING */}
          <div className="relative z-10 max-w-[600px] mt-10 sm:mt-16 md:mt-20">
            <h1 className="hero-text text-[var(--accent-red)]">
              A tired
              <br />
              PET IS
              <br />
              A
            </h1>
          </div>

          {/* CENTER DOG IMAGE */}
          <div className="absolute left-1/2 top-[48%] z-0 w-[120vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 sm:w-[90vw] md:w-[75vw] lg:top-[50%] lg:w-[85vw]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/Main.png"
                alt="Dog Hero Illustration"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* RIGHT HEADING */}
          <div className="relative z-10 mt-8 self-end text-right lg:mt-0">
            <h1 className="hero-text text-[var(--accent-red)]">
              HAPPY
              <br />
              PET!
            </h1>
          </div>
        </div>

        {/* BOTTOM AREA */}
        <div className="relative z-20 mt-6 flex flex-col items-start justify-between gap-6 pb-8 pt-8 sm:mt-8 sm:flex-row sm:items-end lg:mt-2">

          {/* SOCIALS */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--accent-red)] text-white transition-transform duration-200 hover:scale-105"
            >
              <FaTiktok size={18} />
            </a>
            <a
              href="https://wa.me/639392327922"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--accent-red)] text-white transition-transform duration-200 hover:scale-105"
            >
              <FaWhatsapp size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[var(--accent-red)] text-white transition-transform duration-200 hover:scale-105"
            >
              <FaFacebook size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
