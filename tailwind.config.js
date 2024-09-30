/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
      screens: {
        xs: "550px",
        xxs: "430px",
        xxxs: "350px",
      },
    },
  },
  plugins: [],
};

// sm (Small) - min-width: 640px
// md (Medium) - min-width: 768px
// lg (Large) - min-width: 1024px
// xl (Extra Large) - min-width: 1280px
// 2xl (Extra Extra Large) - min-width: 1536px
