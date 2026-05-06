'use client';

import React, { useState } from 'react';

// ✅ Types (fixes TypeScript errors)
type AccordionItemType = {
  id: number;
  title: string;
  imageUrl: string;
};

type AccordionItemProps = {
  item: AccordionItemType;
  isActive: boolean;
  onClick: () => void;
};

// ✅ Data
const accordionItems: AccordionItemType[] = [
  {
    id: 1,
    title: ' Grooming',
    imageUrl: '/Groom.jpg',
  },
  {
    id: 2,
    title: 'Bathing & blow dry',
    imageUrl: '/Bath.jpg',
  },
  {
    id: 3,
    title: 'Nail trimming',
    imageUrl: '/Nail.jpg',
  },
  {
    id: 4,
    title: 'Brushing',
    imageUrl: '/teef.jpg',
  },
  {
    id: 5,
    title: 'Feeding',
    imageUrl: '/feed.jpg',
  },
];

// ✅ Accordion Item
const AccordionItem = ({ item, isActive, onClick }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      onClick={onClick}
    >
      {/* Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0'
              : 'bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// ✅ Main Component
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-#efc6cf py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
        
        {/* LEFT TEXT */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-9xl font-bold text-[var(--accent-red)]">
            Here when you need us
          </h2>

         <p
  className="mt-6 text-xl text-[var(--accent-red)]"
  style={{ textAlign: "justify" }}
>

  Our team comprises experienced and passionate individuals who not only meet
  the standards but go above and beyond. We love dogs and cats, and this passion
  reflects in the quality of care and attention we provide. Trust your pet with 
  professionals who treat them with the love and care that they deserve.
</p>

        </div>

        {/* RIGHT ACCORDION */}
        <div className="w-full md:w-1/2">
          <div className="flex gap-4 overflow-x-auto p-4">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}