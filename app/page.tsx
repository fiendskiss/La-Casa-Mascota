"use client";

import { useEffect } from "react";
import Navbar from "@/components/Layout/Navbar";
import Hero from "@/components/ui/Hero";
import FoundUsSection from "@/components/ui/FoundUsSection";
import FooterSection from "@/components/ui/FooterSection";

export default function Home() {

  useEffect(() => {
    console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  }, []);

  return (
    <main className="relative overflow-x-hidden bg-[var(--cream)] text-[var(--ink-black)]">
      <Navbar />
      <Hero />
      <FoundUsSection />
      <FooterSection />
    </main>
  );
}