import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        accent: "#03256c",
        primary: {
          "50": "#eaf7ff",
          "100": "#cfedff",
          "200": "#aae1ff",
          "300": "#70d0ff",
          "400": "#2db4ff",
          "500": "#008bff",
          "600": "#0063ff",
          "700": "#0049ff",
          "800": "#003cdf",
          "900": "#0039ae",
          "950": "#03256c", //main shade
        },
        secondary: {
          "50": "#ecfeff",
          "100": "#cff9fe",
          "200": "#a5f2fc",
          "300": "#67e6f9",
          "400": "#22d0ee",
          "500": "#06bee1", //main shade
          "600": "#088fb2",
          "700": "#0e7290",
          "800": "#155d75",
          "900": "#164d63",
          "950": "#083244",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
