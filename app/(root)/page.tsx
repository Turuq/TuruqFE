import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
  style: ["italic", "normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
import HeroSection from "./components/home/HeroSection";
import ServicesSection from "./components/home/ServicesSection";
import AboutSection from "./components/home/AboutSection";
import ContactSection from "./components/home/ContactSection";

export default function Page() {
  return (
    <div
      className={`${montserrat.className} flex flex-col gap-5 h-full w-full justify-evenly`}
    >
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      {/* //TODO: Link to email */}
      <ContactSection />
    </div>
  );
}
