import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        btn: "32px",
        corner: "24px",
        content: "12px",
        curved: "8px",
        sharp: "0px",
      },
      colors: {
        dark: {
          primary: {
            DEFAULT: "#006258",
            1: "#8ab7b2",
          },
          active: "#8ab7b2",
          secondary: {
            DEFAULT: "#ffffff",
            50: "rgba(255, 255, 255, 0.05)",
            100: "rgba(255, 255, 255, 0.1)",
          },
          "custom-green": "rgba(0, 98, 83, 0.13)",
          "custom-yellow": "rgba(207, 233, 0, 0.0832)",
          elevation: {
            DEFAULT: "#080a0b",
            1: "#0c0e10",
            2: "#111315",
            3: "#16181a",
          },
          success: {
            DEFAULT: "#27d17f",
            1: "rgba(39, 209, 127, 0.1)",
            2: "rgba(39, 209, 127, 0.5)",
          },
          error: "#f44336",
          warning: "#ffc107",
        },
        light: {
          primary: {
            DEFAULT: "#006258",
            hover: "#3e8f77",
          },
        },
      },
      textColor: {
        dark: {
          primary: "#f7f7f8",
          secondary: "#abafb4",
          disabled: "#abafb4",
          button: "#ffffff",
        },
      },
      fontSize: {
        sm: "16px",
        xs: "14px",
        xxs: "12px",
      },
      screens: {
        md: "1000px",
      },
    },
  },
  plugins: [],
  important: true,
};
export default config;
