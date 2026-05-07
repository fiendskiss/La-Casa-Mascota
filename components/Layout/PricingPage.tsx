"use client";

import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="w-full flex flex-col">

      {/* HERO + CARDS */}
      <section className="min-h-screen bg-[#9DBBD3] flex flex-col items-center py-20 px-4 sm:px-6">

        {/* HEADER */}
        <div className="text-center mb-12 sm:mb-16 pt-16 sm:pt-20 px-4">
          <h1
            className="font-extrabold text-[#2F5D73] leading-[0.9] uppercase"
            style={{ fontSize: "clamp(2.5rem, 10vw, 12rem)" }}
          >
            MAKE YOUR PETS <br /> FEEL SAFE
          </h1>
          <p className="text-sm sm:text-base md:text-lg mt-4 sm:mt-6 text-[#2F5D73] tracking-wide">
            THE LONGER THE STAY <br /> THE MORE THE PRICE DROPS!
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-[1600px] px-2">

          {/* CARD 1 */}
          <div className="bg-[#EDEBE4] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-[#2F5D73] font-bold text-base sm:text-lg">OVERNIGHT CARE</h3>
              <p className="mt-8 sm:mt-10 text-sm text-[#2F5D73]">PRICE</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2F5D73]">₱800</h2>
              <p className="mt-4 sm:mt-6 text-xs text-[#2F5D73]">JUST TO TEST THE SERVICE</p>
            </div>
            <Link href="/Booking" className="mt-8 block bg-[#2F5D73] text-white py-3 rounded-full text-center text-sm font-semibold hover:bg-[#254c5e] transition-colors">
              TRY IT •
            </Link>
          </div>

          {/* CARD 2 */}
          <div className="bg-[#EDEBE4] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-[#2F5D73] font-bold text-base sm:text-lg">THREE DAYS</h3>
              <p className="mt-8 sm:mt-10 text-sm text-[#2F5D73]">PRICE</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2F5D73]">₱2, 200</h2>
              <p className="mt-4 sm:mt-6 text-xs text-[#2F5D73]">SHORT-TERM BOARDING PACKAGE</p>
            </div>
            <Link href="/Booking" className="mt-8 block bg-[#2F5D73] text-white py-3 rounded-full text-center text-sm font-semibold hover:bg-[#254c5e] transition-colors">
              TRY IT •
            </Link>
          </div>

          {/* CARD 3 — most popular */}
          <div className="relative bg-[#EDEBE4] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="absolute -top-3 right-4 bg-[#2F5D73] text-white text-xs px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <div>
              <h3 className="text-[#2F5D73] font-bold text-base sm:text-lg">ONE WEEK</h3>
              <p className="mt-8 sm:mt-10 text-sm text-[#2F5D73]">PRICE</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#2F5D73]">₱5, 000</h2>
              <p className="mt-4 sm:mt-6 text-xs text-[#2F5D73]">BEST VALUE FOR REGULAR CARE</p>
            </div>
            <Link href="/Booking" className="mt-8 block bg-[#2F5D73] text-white py-3 rounded-full text-center text-sm font-semibold hover:bg-[#254c5e] transition-colors">
              TRY IT •
            </Link>
          </div>

          {/* CARD 4 */}
          <div className="bg-[#EDEBE4] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-[#2F5D73] font-bold text-base sm:text-lg">ONE MONTH</h3>
              <p className="mt-8 sm:mt-10 text-sm text-[#2F5D73]">FROM</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2F5D73]">₱24, 000</h2>
              <p className="mt-4 sm:mt-6 text-xs text-[#2F5D73]">LONG-TERM CARE DISCOUNT PACKAGE</p>
            </div>
            <Link href="/Booking" className="mt-8 block bg-[#2F5D73] text-white py-3 rounded-full text-center text-sm font-semibold hover:bg-[#254c5e] transition-colors">
              TRY IT •
            </Link>
          </div>
        </div>
      </section>

      {/* EXTRA SERVICES */}
      <section className="w-full bg-[#EDEBE4] pt-16 sm:pt-20 pb-14 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#2F5D73] py-6 sm:py-8 gap-2">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#2F5D73]">ADDITIONAL FOOD</h2>
            <span className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#2F5D73]">+₱300</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#2F5D73] py-6 sm:py-8 gap-2">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#2F5D73]">ADDITIONAL TOYS</h2>
            <span className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#2F5D73]">+₱150</span>
          </div>
        </div>
      </section>

    </main>
  );
}
