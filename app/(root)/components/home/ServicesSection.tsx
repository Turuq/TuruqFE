import { serviceCards } from "@/utils/links";
import AnimatedSection from "./AnimatedSection";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <AnimatedSection id="services">
      <div className="flex flex-col items-center gap-10 p-5 lg:p-10">
        <h1 className="text-4xl lg:text-6xl font-bold italic uppercase">
          services
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 items-center lg:justify-center w-full h-[650px] lg:h-[450px]">
          {serviceCards.map((card) => (
            <ServiceCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
