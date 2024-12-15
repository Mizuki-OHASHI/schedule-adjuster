/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media", // or 'class'
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   background: "hsl(var(--background))", // 全体的な背景色
      //   foreground: "hsl(var(--foreground))", // 全体的な文字色
      //   background: {
      //     DEFAULT: "hsl(var(--background))", // 全体的な背景色
      //     hover: "hsl(var(--background-hover))", // ホバー時の背景色
      //   },
      //   // サブ要素の背景色、文字色
      //   muted: {
      //     DEFAULT: "hsl(var(--muted))", // 背景色
      //     foreground: "hsl(var(--muted-foreground))", // 文字色
      //   },
      // },
    },
  },
  plugins: [],
};
