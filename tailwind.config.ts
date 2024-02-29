import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Poppins: ["var(--font-Poppins)"],
        Josefin: ["var(--font-Josefin)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "1000px":"1000px",
        "1100px":"1100px",
        "1200px":"1200px",
        "1300px":"1300px",
        "1500px":"1500px",
        "800px":"800px",
        "400px":"400px",
      },
      colors: {
        'primary-red': 'var(--clr-primary-red)',
        'error-red': 'var(--clr-error-red)',
        'button-black':'var(--clr-button-black)',
        secondary: 'var(--clr-secondary)',
        text: 'var(--clr-text)',
        'text-faded': 'var(--clr-text-faded)',
        'input-background': 'var(--clr-input-background)',
        background: 'var(--clr-background)',
      },
    },
  },
  plugins: [],
};
export default config;
