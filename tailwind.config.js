// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}", // Shadcn UI bileşenlerini dahil ettik
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // DaisyUI'yi import ederek ekliyoruz
  ],
};
