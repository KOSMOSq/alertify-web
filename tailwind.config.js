/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#2F64E6"
      },
      keyframes: {
        bounce: {
          "50%, 70%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" }
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          "33%": {
            transform: "translate(50px, -60px) scale(1,1)"
          },
          "66%": {
            transform: "translate(-50px, 100px) scale(0.9)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)"
          }
        }
      },
      animation: {
        bounce: "bounce 2s ease-in infinite",
        blob: "blob 15s infinite"
      }
    }
  },
  plugins: []
};
