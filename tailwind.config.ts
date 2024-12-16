import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark:{
          50: "#1A1A1A",
          100: "#04151f",
          200: "#0A0903",
        },
        primary:{
          100: "#9FB8AD"
        },
        text:{
          50: "#E6E8E6",
          100: "#CED0CE",
        },
        accent: {
          50:"#FFEAAE",
          100:"#CADF9E",
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
