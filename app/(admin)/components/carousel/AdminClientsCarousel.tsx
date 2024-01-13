"use client";

import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from "@/components/ui/carousel";
import ClientsCarouselItem from "./ClientsCarouselItem";
import { ClientType } from "@/types/client";
import { useEffect, useState } from "react";

export default function AdminClientsCarousel({
  clients,
}: {
  clients: ClientType[];
}) {
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
    <div className="col-span-12">
      <Carousel setApi={setApi} className="">
        <CarouselContent className="">
          {clients.map((client) => (
            <ClientsCarouselItem
              key={client._id.toString()}
              src={""}
              alt={client.companyName}
              color="bg-white"
              name={client.companyName}
              href={`/admin/clients/${client._id.toString()}`}
            />
          ))}
          {/* <ClientsCarouselItem
          src="https://zammit.s3-eu-west-1.amazonaws.com/website_assets/images/000/085/323/medium/image.png?1687266828"
          alt="untitled"
          color="bg-black"
          name="untitled"
        />
        <ClientsCarouselItem
          src="https://21stitches.co/cdn/shop/files/black-3d-logo.gif?v=1670084882&width=90"
          alt="21stitches"
          color="bg-pink-300"
          name="21stitches"
        />
        <ClientsCarouselItem
          src="https://pristineeg.myshopify.com/cdn/shop/files/LOHGO-removebg-preview.png?v=1699271103&width=500"
          alt="pristine"
          color="bg-[#2e2e2e]"
          name="pristine"
        />
        <ClientsCarouselItem
          src="https://joudstoreee.myshopify.com/cdn/shop/files/42A09F72-0C73-47CB-9A16-A72F48E31769.jpg?v=1700729366&width=135"
          alt="joud"
          color="bg-black"
          name="joud"
        />
        <ClientsCarouselItem
          src="https://mistegy.com/cdn/shop/files/ezgif.com-optimize.gif?v=1704469822&width=500"
          alt="mist"
          color="bg-[#0e0e0e]"
          name="mist"
        />
        <ClientsCarouselItem
          src="https://coddiwmple.com/cdn/shop/files/LGO67S89.png?v=1686709748&width=720"
          alt="coddiwomple"
          color="bg-black"
          name="coddiwomple"
        />
        <ClientsCarouselItem
          src="https://doublefaced.online/cdn/shop/files/logo-ai-brush-removebg-gqs7n5q_-_Copy_39a4961b-7bcd-4bbc-9136-1391cb306a9f.png?v=1702864440&width=330"
          alt="doubledfaced"
          color="bg-white"
          name="doubled faced"
        /> */}
        </CarouselContent>
        {/* <CarouselPrevious className="size-5 bg-white" />
      <CarouselNext className="size-5 bg-white" /> */}
      </Carousel>
      <div className="py-2 flex items-center justify-center gap-2 mt-5">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`${
                current === i + 1 ? "bg-accent w-5" : "bg-white w-2"
              } h-2 rounded-full cursor-pointer transition-all ease-in duration-300`}
              onClick={(e) => handleJump(e, i)}
            ></div>
          ))}
      </div>
    </div>
  );
}
