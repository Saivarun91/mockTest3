/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,jsx}",      // Adjust based on your folder structure
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",        // Optional, for app directory in Next.js
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
                dark: {
                    800: '#1e293b',
                    900: '#0f172a',
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
