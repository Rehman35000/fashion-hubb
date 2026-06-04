/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cinnamon: {
          primary: "#5C2B14", // Deep Brown
          secondary: "#2B2B2B", // Charcoal
          accent: "#FDF6F5", // Cream Background
          text: "#1A1A1A",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", 'serif'],
        sans: ["'Outfit'", 'sans-serif'],
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
    },
  },
  plugins: [],
};
