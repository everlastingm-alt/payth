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
          cyan: "var(--payth-cyan)",
          indigo: "var(--payth-indigo)",
          navy: "var(--payth-navy)",
          ink: "var(--payth-ink)",
          muted: "var(--payth-muted)",
          border: "var(--payth-border)",
          surface: "var(--payth-surface)",
          bg: "var(--payth-bg)",
          opportunity: "var(--payth-opportunity)",
          opportunityBg: "var(--payth-opportunity-bg)",
          risk: "var(--payth-risk)",
          riskBg: "var(--payth-risk-bg)",
          critical: "var(--payth-critical)",
          criticalBg: "var(--payth-critical-bg)",
          blueSoft: "var(--payth-blue-soft)",
          mintSoft: "var(--payth-mint-soft)",
          amberSoft: "var(--payth-amber-soft)",
          redSoft: "var(--payth-red-soft)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "payth-display": ["56px", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "payth-display-mobile": ["40px", { lineHeight: "1.08", letterSpacing: "-0.035em" }],
        "payth-page": ["40px", { lineHeight: "1.12", letterSpacing: "-0.035em" }],
        "payth-page-mobile": ["32px", { lineHeight: "1.15", letterSpacing: "-0.03em" }],
        "payth-section": ["24px", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "payth-card": ["18px", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "payth-body-lg": ["18px", { lineHeight: "1.55" }],
        "payth-body": ["16px", { lineHeight: "1.55" }],
        "payth-body-sm": ["14px", { lineHeight: "1.45" }],
        "payth-label": ["12px", { lineHeight: "1.2", letterSpacing: "0.08em" }],
      },
      boxShadow: {
        "payth-card": "0 12px 30px rgba(15, 23, 42, 0.06)",
        "payth-primary": "0 12px 30px rgba(37, 99, 235, 0.18)",
      },
      borderRadius: {
        "payth-card": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
