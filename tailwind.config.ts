import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        payth: {
          purple: "var(--payth-purple)",
          blue: "var(--payth-blue)",
          indigo: "var(--payth-indigo)",
          navy: "var(--payth-navy)",
          muted: "var(--payth-muted)",
          bg: "var(--payth-bg)",
          border: "var(--payth-border)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
