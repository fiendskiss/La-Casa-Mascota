"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "About Us", href: "/About" },
  { label: "Pricing", href: "/Pricing" },
  { label: "Services", href: "/Services" },
  { label: "Contacts", href: "/Contacts" },
];

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 20) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-transform duration-500 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container-custom pt-4">
        <div className="flex items-center justify-between px-2 py-2">

          {/* LEFT — logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden">
              <Image
                src="/LOGO2.png"
                alt="Brand Logo"
                fill
                className="object-contain"
                priority 
              />
            </div>
            <div className="leading-none">
              <p className="font-[var(--font-display)] text-[0.8rem] sm:text-[0.85rem] uppercase leading-[0.9] tracking-[-0.04em] text-[var(--accent-red)]">la</p>
              <p className="font-[var(--font-display)] text-[0.8rem] sm:text-[0.85rem] uppercase leading-[0.9] tracking-[-0.04em] text-[var(--accent-red)]">casa</p>
              <p className="font-[var(--font-display)] text-[0.8rem] sm:text-[0.85rem] uppercase leading-[0.9] tracking-[-0.04em] text-[var(--accent-red)]">Mascota</p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative text-sm font-medium uppercase tracking-[-0.02em] text-[var(--accent-red)]"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--accent-red)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden rounded-[1.3rem] bg-[var(--accent-red)] px-5 py-5 text-sm font-semibold uppercase text-white shadow-none transition-transform duration-200 hover:scale-[1.03] hover:bg-[var(--accent-red)] md:inline-flex"
            >
              <Link href="/Booking">Book Now</Link>
            </Button>
            <Button
              asChild
              aria-label="Admin login"
              title="Admin login"
              className="hidden h-11 w-11 rounded-full border border-[var(--accent-red)] bg-transparent p-0 text-[var(--accent-red)] shadow-none transition-all duration-200 hover:scale-[1.03] hover:bg-[var(--accent-red)] hover:text-white md:inline-flex"
            >
              <Link href="/admin/login">
                <LockKeyhole size={18} aria-hidden="true" />
              </Link>
            </Button>

            {/* MOBILE MENU */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--accent-red)] text-[var(--accent-red)] md:hidden">
                  <Menu size={20} />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="border-l-0 bg-[var(--cream)] px-8 pt-16 w-[80vw] sm:w-[60vw]"
              >
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group relative w-fit text-2xl sm:text-3xl uppercase tracking-[-0.04em] text-[var(--accent-red)]"
                    >
                      {link.label}
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--accent-red)] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}

                  <div className="mt-4 flex items-center gap-3">
                    <Button
                      asChild
                      className="rounded-[1.3rem] bg-[var(--accent-red)] px-6 py-5 text-sm font-semibold uppercase text-white hover:bg-[var(--accent-red)]"
                      onClick={() => setOpen(false)}
                    >
                      <Link href="/Booking">Book Now</Link>
                    </Button>
                    <Button
                      asChild
                      aria-label="Admin login"
                      title="Admin login"
                      className="h-11 w-11 rounded-full border border-[var(--accent-red)] bg-transparent p-0 text-[var(--accent-red)] hover:bg-[var(--accent-red)] hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      <Link href="/admin/login">
                        <LockKeyhole size={18} aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
