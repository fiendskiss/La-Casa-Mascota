"use client";

import Image from "next/image";

export default function Statement() {
  return (
    <section className="py-20 sm:py-28 md:py-36 px-6 py-20 sm:py-28 md:py-36 px-6 text-center flex flex-col items-center justify-center
bg-[linear-gradient(to_bottom,#efc6cf,var(--cream))] text-center flex flex-col items-center justify-center">

      {/* BIG TEXT */}
      <h2
        className="text-[var(--accent-red)] uppercase max-w-[1200px]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 6vw, 7rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.04em",
        }}
      >
        OUR SERVICES ARE GEARED
        <br />
        TOWARDS MEETING YOUR PET&apos;S
        <br />
        UNIQUE NEEDS
      </h2>

      {/* CIRCLE IMAGE */}
      <div
        className="mt-12 mb-10 shrink-0"
        style={{
          width: "clamp(120px, 20vw, 200px)",
          height: "clamp(120px, 20vw, 200px)",
          borderRadius: "50%",
          border: "3px solid var(--accent-red)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image src="/main-dog.png" alt="icon" fill style={{ objectFit: "cover" }} />
      </div>

      {/* DESCRIPTION */}
      <p
        className="text-[var(--accent-red)] uppercase max-w-[600px] leading-relaxed"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
          letterSpacing: "0.05em",
          opacity: 0.85,
        }}
      >
        YOU CAN REST ASSURED KNOWING THAT YOUR PETS ARE RECEIVING THE
        HIGHEST LEVEL OF CARE AND ATTENTION IN THE COMFORT OF THEIR OWN HOME.
      </p>
    </section>
  );
}
