import Navbar from "@/components/Layout/Navbar";
import Services from "@/components/Layout/ServicesPage";
import { LandingAccordionItem } from "@/components/ui/interactive-image-accordion";
import Statement from "@/components/ui/Statement";
import AnimatedHeroDemo from "@/components/ui/AnimatedHeroDemo";
import ProgressSlider  from "@/components/ui/ProgressSlider";
import FoundUsSection from "@/components/ui/FoundUsSection";
import FooterSection from "@/components/ui/FooterSection";

export default function ServicesPage() {
  return (
    <div>
      <Navbar />
      <AnimatedHeroDemo/>
      <Services />
      <LandingAccordionItem/>
      <ProgressSlider/>
      <Statement />
      <FoundUsSection/>
      <FooterSection/>
    </div>
  );
}