import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Step({
  number,
  title,
  children,
  image,
  alt,
}: {
  number: number;
  title: string;
  children?: JSX.Element;
  image: string;
  alt: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-5">
        <Avatar className="size-5">
          <AvatarFallback className="bg-accent/20 text-accent font-bold text-sm ">
            {number}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-sm lg:text-base font-bold capitalize text-accent">
          {title}
        </h2>
      </div>
      <div className="border-l border-accent/10 ml-2 pl-5 h-full flex flex-col gap-2">
        <img
          src={image}
          alt={alt}
          width={400}
          height={400}
          className="w-full h-auto rounded-xl"
        />
        {children}
      </div>
    </div>
  );
}
