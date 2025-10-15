import type { Config } from "tailwindcss"

export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            // REGISTRANDO NOSSAS CORES PERSONALIZADAS AQUI
            colors: {
                cream: 'hsl(var(--cream))',
                burgundy: 'hsl(var(--burgundy))',
                wine: 'hsl(var(--wine))',
                'wine-light': 'hsl(var(--wine-light))',
            },
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 1s ease-out forwards",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config