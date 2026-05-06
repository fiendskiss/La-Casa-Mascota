"use client";

import { useState } from "react";

export default function ContactsPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#9DBBD3] to-[var(--cream)] flex flex-col items-center py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">

      {/* IMAGE */}
      <div className="flex justify-center -mt-4 sm:-mt-10 md:-mt-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/CD.png" className="max-w-[160px] sm:max-w-[220px] md:max-w-[320px]" />
      </div>

      {/* ADDRESS */}
      <p className="text-[#2F5D73] mt-3 sm:mt-4 text-center tracking-wide px-4 text-sm sm:text-base">
        200 N. SPRING STREET LOS ANGELES CA 90012 UNITED STATES
      </p>

      <div className="mt-8 sm:mt-10 flex w-full flex-col items-center">
        <h2
          className="text-center font-extrabold tracking-tight text-[#2f6f8e] uppercase px-4"
          style={{ fontSize: "clamp(2rem, 7vw, 6rem)" }}
        >
          GOT A QUESTION?
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 w-full max-w-[600px] space-y-3 px-2 sm:px-0">
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="w-full rounded-full border border-[#2f6f8e] bg-[#f7f3e8] px-5 sm:px-6 py-3 sm:py-4 text-[#2f6f8e] outline-none font-semibold placeholder:text-[#7fb0c6] text-sm sm:text-base"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-full border border-[#2f6f8e] bg-[#f7f3e8] px-5 sm:px-6 py-3 sm:py-4 text-[#2f6f8e] outline-none font-semibold placeholder:text-[#7fb0c6] text-sm sm:text-base"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            className="w-full rounded-full border border-[#2f6f8e] bg-[#f7f3e8] px-5 sm:px-6 py-3 sm:py-4 text-[#2f6f8e] outline-none font-semibold placeholder:text-[#7fb0c6] text-sm sm:text-base"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={6}
            className="w-full rounded-[28px] border border-[#2f6f8e] bg-[#f7f3e8] px-5 sm:px-6 py-3 sm:py-4 text-[#2f6f8e] outline-none font-semibold resize-none placeholder:text-[#7fb0c6] text-sm sm:text-base"
          />
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="w-full rounded-full py-3 sm:py-4 text-white text-lg sm:text-2xl font-extrabold uppercase tracking-wide shadow-md transition-all duration-300 hover:bg-[#24556b] hover:-translate-y-1 active:translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed bg-[#2f6f8e]"
          >
            {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Send •"}
          </button>
          {status === "error" && (
            <p className="text-center text-red-600 text-sm mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
