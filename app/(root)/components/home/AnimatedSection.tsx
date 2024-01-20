"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export default function AnimatedSection({
  children,
  id,
  variant = "lr",
}: {
  children: React.ReactNode;
  id: string | undefined;
  variant?: "lr" | "rl";
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section ref={ref} id={id} className="my-5">
      <div
        style={{
          transform: isInView
            ? "none"
            : variant === "lr"
              ? "translateX(-200px)"
              : "translateX(200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </div>
    </section>
  );
}
