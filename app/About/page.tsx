import About from "@/components/Layout/AboutPage";
import Navbar from "@/components/Layout/Navbar";
import ServicesSection from "@/components/ui/ServicesSection";
import MediaContentCollection from "@/components/ui/MediaContentCollection";
import FooterSection from "@/components/ui/FooterSection";

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <MediaContentCollection/>
      <About />
      <ServicesSection/>
      <FooterSection/>
    </div>
  );
}

