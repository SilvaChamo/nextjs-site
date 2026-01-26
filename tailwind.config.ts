import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                "primary-foreground": "var(--primary-foreground)",
                secondary: "var(--secondary)",
                "secondary-foreground": "var(--secondary-foreground)",
                muted: "var(--muted)",
                "muted-foreground": "var(--muted-foreground)",
                accent: "var(--accent)",
                "accent-foreground": "var(--accent-foreground)",
                destructive: "var(--destructive)",
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                card: "var(--card)",
                "card-foreground": "var(--card-foreground)",
                popover: "var(--popover)",
                "popover-foreground": "var(--popover-foreground)",
            },
            fontFamily: {
                sans: ["var(--font-maven-pro)", "sans-serif"],
                heading: ["var(--font-montserrat)", "sans-serif"],
            },
            borderRadius: {
                'agro': '10px',      // CARD STANDARD
                'agro-lg': '15px',   // SECTION/MODAL STANDARD
                'agro-btn': '7px',   // BUTTON STANDARD
            },
            spacing: {
                'agro': '20px',      // SPACER STANDARD (gap-agro, p-agro, m-agro)
            },
            boxShadow: {
                'agro': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'agro-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
        },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
