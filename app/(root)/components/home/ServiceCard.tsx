interface ServiceCardProps {
  imgSrc: string;
  alt: string;
  title: string;
  className?: string;
}

export default function ServiceCard({
  imgSrc,
  alt,
  title,
  className,
}: ServiceCardProps) {
  return (
    <div className="w-full h-[300px] lg:h-full rounded-lg flex items-center justify-center gap-2 relative group">
      <img
        src={`/assets/images/${imgSrc}`}
        alt={alt}
        width={100}
        height={100}
        className="rounded-lg w-full absolute top-0 left-0 h-[250px] lg:h-[450px] object-cover"
      />
      <div className="absolute w-full h-full lg:h-[450px] hidden lg:flex items-center justify-center top-0 left-0 rounded-lg opacity-0 group-hover:opacity-100 bg-primary-800 bg-opacity-50 transition-all ease-in duration-300 z-30">
        <h1
          className={`${
            className ? className : "text-xl lg:text-3xl"
          } italic font-bold uppercase`}
        >
          {title}
        </h1>
      </div>
      <h1
        className={`flex lg:hidden text-center ${
          className ? className : "text-xl lg:text-3xl"
        } italic font-bold uppercase absolute bottom-2`}
      >
        {title}
      </h1>
    </div>
  );
}
