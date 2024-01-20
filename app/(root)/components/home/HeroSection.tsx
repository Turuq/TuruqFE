import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function HeroSection() {
  return (
    <div
      id={"home"}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center overflow-x-hidden"
    >
      <AnimatedSection id="home-text">
        <div className="flex flex-col items-start pl-5 lg:pl-10 gap-5">
          {/* Tagline */}
          <div className="flex flex-col gap-0">
            <h1
              className={`uppercase text-white font-thin italic text-5xl lg:text-8xl ml-3`}
            >
              Handling
            </h1>
            <h1
              className={`uppercase text-white font-bold italic text-5xl lg:text-8xl`}
            >
              Made Easy.
            </h1>
          </div>
          {/* Description */}
          <div className="flex flex-col gap-2">
            <p className="text-pretty text-white text-sm lg:text-base">
              {
                "Welcome to Turuq, your premier destination for all your shipping, storage, and packaging needs. With our comprehensive range of services, unwavering commitment to customer satisfaction, and innovative solutions, we are proud to be at the forefront of the industry."
              }
            </p>
            <p className="text-pretty text-white text-sm lg:text-base">
              {
                "At Turuq, we understand the importance of a seamless and efficient logistics process for businesses and individuals alike. Whether you are shipping products to customers, storing valuable goods, or seeking reliable packaging solutions, we have got you covered."
              }
            </p>
            <p className="text-pretty text-white text-sm lg:text-base">
              {
                "Our team of experienced professionals combines expertise with state-of-the-art technology to deliver unparalleled services that meet your unique requirements."
              }
            </p>
          </div>
          {/* Contact Us */}
          <Link
            href={"/#contact"}
            className="w-44 flex items-center justify-center px-5 h-10 rounded-lg hover:scale-105 font-bold uppercase border border-white bg-white text-accent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          >
            get in touch
          </Link>
        </div>
      </AnimatedSection>
      {/* Hero Image */}
      <AnimatedSection id="home-img" variant={"rl"}>
        <div className="hidden lg:flex justify-end items-center w-full rounded-xl relative pr-10">
          <img
            src={"/assets/images/landing-img-2.jpg"}
            alt="warehouse image"
            width={100}
            height={100}
            className="rounded-xl aspect-square w-[450px] h-[450px] object-cover"
          />
        </div>
      </AnimatedSection>
      {/* <div className="absolute -bottom-7 -left-3 size-40 rounded-tr-3xl bg-gradient-to-b from-[#022a7e] to-[#022b81]">
            <Link
              href={"/#contact"}
              className="w-44 mt-[30%] -ml-[25%] flex self-end items-center justify-center px-5 h-10 rounded-lg hover:scale-105 font-bold uppercase border border-white bg-white text-accent focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            >
              get in touch
            </Link>
          </div> */}
    </div>
  );
}
