import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        updated: "2s ease-in-out updated",
      },
      keyframes: {
        updated: {
          "0%": {
            opacity: "0",
            transform: "translateY(-50px)",
          },
          "30%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "70%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(50px)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;
