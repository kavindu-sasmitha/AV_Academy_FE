import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0C0F",       // page background
        surface: "#13161B",    // card background
        surface2: "#1B1F26",   // elevated card / hover
        line: "#262B33",       // hairline borders
        mist: "#9AA1AC",       // muted text
        chalk: "#F4F5F7",      // primary text
        teal: {
          DEFAULT: "#2FE6C9",
          dim: "#1B8F7D",
        },
        ember: {
          DEFAULT: "#FF7A45",
          dim: "#B2502A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "orbit-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        orbit: "orbit 26s linear infinite",
        "orbit-reverse": "orbit-reverse 26s linear infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
