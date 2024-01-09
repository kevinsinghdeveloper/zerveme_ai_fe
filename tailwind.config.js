/** @prettier */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('@tailwindcss').config} */
module.exports = {
    content: [
        "../*/src/**/*.{tsx,html}",
        "../superwind/**/*.{tsx,ts}",
        "../react-utils/*.{tsx,ts}",
        "../app-builder/src/**/*.{tsx,ts}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            animation: {
                pulse: "non-pendo-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
            },
            colors: {
                blue: {
                    "zm-primary": colors.blue[600],
                },
            },
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                "non-pendo-pulse": {
                    "0%, 50%": {opacity: "1"},
                    "50%": {opacity: "0.5"},
                },
            },
            screens: {
                "3.5xl": "1920px",
            },
            spacing: {
                75: "18.75rem",
                100: "25rem",
                128: "32rem",
                150: "37.5rem",
                180: "45rem",
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
};
