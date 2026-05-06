'use client';
import Image from 'next/image';
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from '@/components/ui/progressive-carousel';

const items = [
  {
    img: "/Anger.jpg",
    title: 'Medication administration',
    desc: 'We ensure your pet never misses a dose. Our staff carefully administers prescribed medications on schedule, so your pet stays healthy and comfortable throughout their stay.',
    sliderName: 'bridge',
  },
  {
    img: "/apple.jpg",
    title: 'Vet check-in monitoring',
    desc: 'Your pets health comes first. We monitor each pet daily for any signs of illness or discomfort, and coordinate with a vet immediately if anything seems off.',
    sliderName: 'mountains',
  },
  {
    img: "/Awful.jpg",
    title: 'Behavioral enrichment',
    desc: 'Keeping pets mentally stimulated is just as important as physical care. Dogs enjoy treat puzzles and Kong toys while cats play with feather wands, puzzle feeders, and climbing activities — keeping boredom and anxiety away.',
    sliderName: 'autumn',
  },
  {
    img: "/social.jpg",
    title: 'Socialization with other pets',
    sliderName: 'foggy',
    desc: 'Pets thrive with companionship. Our supervised group play sessions allow friendly pets to interact, play, and bond — helping reduce stress and keep their tails wagging all day.',
  },
];
export default function Demos() {
  return (
    <main className="max-w-7xl px-6 mx-auto">
      <ProgressSlider vertical={false} activeSlider='bridge'>
        <SliderContent>
          {items.map((item, index) => (
            <SliderWrapper key={index} value={item?.sliderName}>
              <Image
                className='rounded-xl h-[600px] 2xl:h-[750px] object-cover'
                src={item.img}
                width={1900}
                height={1080}
                alt={item.desc}
              />
            </SliderWrapper>
          ))}
        </SliderContent>

       <SliderBtnGroup
  className='
    absolute bottom-0 w-full
    dark:text-white text-[var(--accent-red)] 
    dark:bg-black/30 bg-white/30
    backdrop-blur-xl
    overflow-hidden
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
    rounded-b-xl
  '
>
          {items.map((item, index) => (
            <SliderBtn
              key={index}
              value={item?.sliderName}
              className='text-left cursor-pointer p-6 border-r flex flex-col justify-start'
              progressBarClass='dark:bg-black bg-white h-full'
            >
              <h2 className='relative px-6 py-2 rounded-full w-fit dark:bg-white dark:text-black text-[var(--accent-red)] bg-[#efc6cf] mb-3 text-lg md:text-xl font-semibold'>
                {item.title}
              </h2>
              <p className='text-base md:text-lg leading-relaxed font-medium w-full'>{item.desc}</p>
            </SliderBtn>
          ))}
        </SliderBtnGroup>
      </ProgressSlider>
    </main>
  );
}
