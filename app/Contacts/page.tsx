import Contacts from "@/components/Layout/ContactsPage";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/ui/Footer";
import { PrismaHero, WordsPullUp } from "@/components/ui/prisma-hero";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <PrismaHero/>
        <Contacts />
        <Footer/>
    </div>
  );
}   