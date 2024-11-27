/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        snow: "url('/background.webp')",
      },
      container: {
        center: true,
        padding: "20px",
      },
    },
  },
  plugins: [],
};
