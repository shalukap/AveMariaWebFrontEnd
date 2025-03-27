 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
 
  theme: {
    extend: {
      fontFamily: {
        Amaranth: ["Amaranth", "sans-serif"]
      },
      colors: {
        primary: '#0c0d65',
        secondary: '#ffffff',        
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  }},
  plugins: [require('daisyui')],
}
 