"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#2F5D73] pt-10 pb-10 bg-[var(--cream)]">
      
      <div className="w-full px-6 grid md:grid-cols-[1fr_auto_auto] items-start gap-x-16">

        {/* LEFT COLUMN */}
        <div className="flex items-start gap-4">

          <div>
            <h1 className="text-3xl font-black text-[#2F5D73] leading-none">
              LA <br /> CASA <br /> MASCOTA
            </h1>

            <p className="mt-6 text-sm text-[#2F5D73]">
              200 N. SPRING STREET LOS ANGELES <br />
              CA 90012 UNITED STATES
            </p>

            <p className="mt-6 text-sm text-[#2F5D73]">
              EMALF@GMAIL.COM
            </p>
          </div>

        </div>

        {/* MIDDLE COLUMN */}
        <div className="fade text-[#2F5D73] text-boldtext-sm space-y-3">
          <Link href="/Pricing" className="block">
              PRICING
            </Link>

            <Link href="/About" className="block">
              ABOUT US
            </Link>

            <Link href="/Services" className="block">
              SERVICES
            </Link>

            <Link href="/blog" className="block">
              BLOG
            </Link>

            <Link href="/Contacts" className="block">
              CONTACTS
            </Link>
        </div>


      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#2F5D73] mt-9" />

      <div className="max-w-8xl mx-auto px-12 mt-6 flex justify-between text-[#2F5D73] text-sm">
        <p>© 2026 LA CASA MASCOTA. ALL RIGHTS RESERVED</p>
        <p>MADE BY FLAME</p>
      </div>

    </footer>
  );
}