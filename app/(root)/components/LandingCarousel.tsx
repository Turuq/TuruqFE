"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import ServiceCard from "./home/ServiceCard";
import { aboutCards } from "@/utils/links";

export default function LandingCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function handleJump(e: any, i: number) {
    e.preventDefault();
    api?.scrollTo(i);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Carousel
        setApi={setApi}
        // plugins={[
        //   Autoplay({
        //     delay: 5000,
        //   }),
        // ]}
        className="w-full"
      >
        <CarouselContent>
          {aboutCards.map((about) => (
            <CarouselItem key={about.title} className="rounded-lg">
              <div className="flex items-center rounded-lg justify-center w-full h-auto lg:h-[450px]">
                <ServiceCard {...about} className="text-3xl lg:text-6xl" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:block" />
        <CarouselNext className="hidden lg:block" />
      </Carousel>
      <div className="py-2 flex items-center gap-2">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`${
                current === i + 1
                  ? "bg-secondary-500 w-5"
                  : "bg-secondary-100 w-2"
              } h-2 rounded-full cursor-pointer transition-all ease-in duration-300`}
              onClick={(e) => handleJump(e, i)}
            ></div>
          ))}
      </div>
    </div>
  );
}
