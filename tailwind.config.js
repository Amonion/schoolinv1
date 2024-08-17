/** @type {import('tailwindcss').Config} */
// import typography from "@tailwindcss/typography";
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],

  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          white: "var(--color-text-white)",
          muted: "var(--color-text-muted)",
          smoke: "var(--color-bg-smoke)",
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          red: "var(--color-text-red)",
          purple: "var(--color-text-purple)",
          blood: "var(--color-text-blood)",
          pink: "var(--color-text-pink)",

          homeDark: "var(--text-home-dark)",
          homeNavy: "var(--text-home-navy)",
          homeGold: "var(--text-home-gold)",
          homeMuted: "var(--text-home-muted)",
          homeSmoke: "var(--text-home-smoke)",
        },
      },

      letterSpacing: {
        "1px": "1px",
        "5px": "5px",
      },

      borderColor: {
        skin: {
          gold: "var(--bg-home-gold)",
          smoke: "var(--bg-home-light-gold)",
        },
      },

      // typography: ({ theme }) => ({
      //   default: {
      //     css: {
      //       "--tw-prose-headings": theme("colors.pink.500"),
      //       li: {
      //         p: { margin: 0 },
      //       },
      //     },
      //   },
      // }),

      backgroundColor: {
        skin: {
          dark: "var(--color-bg-dark)",
          secondary: "var(--bg-secondary)",
          primary: "var(--color-bg-primary)",
          ash: "var(--color-bg-ash)",
          smoke: "var(--color-bg-smoke)",
          white: "var(--color-bg-white)",
          red: "var(--color-bg-red)",
          primaryFade: "var(--color-bg-primary-fade)",
          purple: "var(--color-bg-purple)",
          purpleFade: "var(--color-bg-purple-fade)",
          blood: "var(--color-bg-blood)",
          bloodFade: "var(--color-bg-blood-fade)",
          pink: "var(--color-bg-pink)",
          pinkFade: "var(--color-bg-pink-fade)",

          gold: "var(--bg-home-gold)",
          lightGold: "var(--bg-home-light-gold)",
          navy: "var(--bg-home-navy)",
          navyTransparent: "var(--bg-home-navy-transparent)",
          body: "var(--bg-home-body)",
        },
      },

      width: {
        xs: "320px",
        sm: "480px",
        md: "640px",
        lg: "744px",
        xl: "1280px",
        xxl: "1440px",
        xxxl: "1512px",
      },

      screens: {
        xs: "320px",
        sm: "480px",
        md: "640px",
        lg: "992px",
        xl: "1280px",
        xxl: "1440px",
        xxxl: "1512px",
      },
    },
  },

  // plugins: [require("@tailwindcss/forms")],
  // plugins: [typography],
};
