"use client";

import { useRef } from "react";
import Link from "next/link";

export default function FooterSection() {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ref} className="w-full bg-[var(--cream)]">
      
      {/* FOOTER CONTENT */}
      <div className="border-t border-red-400 mt-2 pt-16 pb-10">
        
        {/* MAIN GRID */}
        <div className="w-full px-6 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] items-start gap-y-12 gap-x-16">

          {/* Column 1 */}
          <div className="flex items-start gap-4">
            <div>
              <h1 className="text-3xl font-black text-[var(--accent-red)] leading-none">
                LA <br /> CASA <br /> MASCOTA
              </h1>

              <p className="mt-6 text-sm text-[var(--accent-red)]">
                200 N. SPRING STREET, LOS ANGELES CA <br />
                90012 UNITED STATES
              </p>

              <p className="mt-6 text-sm text-[var(--accent-red)]">
                EMALF@GMAIL.COM
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="fade w-[80px] text-[var(--accent-red)] text-boldtext-sm space-y-3">
            <Link href="/About" className="block">
              ABOUT US
            </Link>

            <Link href="/Pricing" className="block">
              PRICING
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

          {/* Column 3 */}
    
        </div>

        {/* Footer bottom */}
        <div className="border-t border-[var(--accent-red)] mt-9"></div>

        <div className="max-w-8xl mx-auto px-6 sm:px-10 md:px-12 mt-6 flex flex-col md:flex-row justify-between gap-4 text-[var(--accent-red)]">
          <p>© 2026 LA CASA MASCOTA. ALL RIGHTS RESERVED</p>
          <p>MADE BY FLAME</p>
        </div>
      </div>
    </div>
  );
}