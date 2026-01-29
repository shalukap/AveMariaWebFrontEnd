 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
 
  theme: {
    extend: {
      fontFamily: {
        Amaranth: ["Amaranth", "sans-serif"],
        LoveLight: ["Love Light"],
      },
      colors: {
        primary: '#151b54',
        secondary: '#ffffff',
        menu: '#151b54',        
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
 