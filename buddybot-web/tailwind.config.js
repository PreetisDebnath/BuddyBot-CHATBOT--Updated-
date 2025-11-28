/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'buddy-green': '#8FBC8F', // DarkSeaGreen
                'buddy-teal': '#20B2AA', // LightSeaGreen
                'buddy-dark': '#2F4F4F', // DarkSlateGray
                'buddy-light': '#F0FFF0', // Honeydew
            },
        },
    },
    plugins: [],
}
