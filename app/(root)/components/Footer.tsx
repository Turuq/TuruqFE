import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bottom-0 w-full h-full lg:h-24 bg-secondary-500 grid grid-cols-3 gap-5 lg:flex items-center justify-between p-2 lg:px-10">
      <Image
        src={"/assets/images/dark blue logo.png"}
        alt="Turuq.co"
        width={80}
        height={80}
        priority
        aria-label="Turuq"
        className="w-24 h-auto col-span-3"
      />
      <div className="flex lg:flex-col lg:gap-1 col-span-3 items-center lg:items-start gap-5">
        <Link
          href={"/policies/tos"}
          className="text-accent text-xs lg:text-base font-semibold hover:underline"
        >
          Terms and Conditions
        </Link>
        <Link
          href={"/policies/privacy"}
          className="text-accent text-xs lg:text-base font-semibold hover:underline"
        >
          Privacy Policy
        </Link>
        <Link
          href={"/#contact"}
          className="text-accent text-xs lg:text-base font-semibold hover:underline"
        >
          Contact Us
        </Link>
      </div>
      <div className="col-span-2 flex flex-col items-start gap-1">
        <h3 className="uppercase text-accent text-xs lg:text-base font-bold">
          mobile app - coming soon
        </h3>
        <img
          src={"/assets/images/Group 33.png"}
          alt="Turuq.co"
          width={80}
          height={80}
          aria-label="Turuq"
          className="w-40 lg:w-full h-10 object-contain"
        />
      </div>
      <div className="col-span-1 flex flex-col gap-1">
        <h3 className="text-accent text-xs lg:text-base font-semibold">
          Get Connected
        </h3>
        <div className="flex items-center gap-2">
          <Link
            href="https://www.instagram.com/turuq.co?igsh=ZDE1MWVjZGVmZQ=="
            className="text-accent"
          >
            <FaInstagram className="size-5" />
          </Link>
          <Link
            href="https://www.facebook.com/turuq.co?mibextid=ZbWKwL"
            className="text-accent"
          >
            <FaFacebook className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
