import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Same token names as before — values flipped to a clean white theme.
        void: "#FFFFFF",       // page background (was near-black)
        surface: "#F6F7F9",    // card background
        surface2: "#EDEFF3",   // elevated card / hover
        line: "#E4E7EC",       // hairline borders
        mist: "#6B7280",       // muted text
        chalk: "#111318",      // primary text (was near-white, now near-black)
        teal: {
          DEFAULT: "#0D9488",  // deeper teal — accessible contrast on white
          dim: "#0F766E",
        },
        ember: {
          DEFAULT: "#EA580C",
          dim: "#C2410C",
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
