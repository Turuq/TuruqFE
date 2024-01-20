import LandingCarousel from "../LandingCarousel";
import AnimatedSection from "./AnimatedSection";

export default function AboutSection() {
  return (
    <AnimatedSection id="about">
      <div className="flex flex-col items-center gap-10 p-5 lg:p-10">
        <h1 className="text-4xl lg:text-6xl font-bold italic uppercase">
          know us more
        </h1>
        <LandingCarousel />
      </div>
    </AnimatedSection>
  );
}
