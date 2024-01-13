import { CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";

export default function ClientsCarouselItem({
  src,
  alt,
  color,
  name,
  href,
}: {
  src?: string;
  alt: string;
  color: string;
  name: string;
  href: string;
}) {
  return (
    <CarouselItem className="basis-1/2 lg:basis-1/6 flex flex-col items-center justify-center">
      <Link
        href={href}
        className={`${color} p-1 w-full h-20 rounded-xl flex items-center justify-center`}
      >
        <div>
          {src ? (
            <img
              src={src}
              alt={alt}
              width={40}
              height={40}
              className="w-20 h-auto"
            />
          ) : (
            <h3 className="uppercase text-accent/50 font-bold">{name}</h3>
          )}
        </div>
      </Link>
    </CarouselItem>
  );
}
