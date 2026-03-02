/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                military: {
                    50: 'var(--theme-color-50)',
                    100: 'var(--theme-color-100)',
                    200: 'var(--theme-color-200)',
                    300: 'var(--theme-color-300)',
                    400: 'var(--theme-color-400)',
                    500: 'var(--theme-color-500)',
                    600: 'var(--theme-color-600)',
                    700: 'var(--theme-color-700)',
                    800: 'var(--theme-color-800)',
                    900: 'var(--theme-color-900)',
                    950: 'var(--theme-color-950)',
                    card: 'var(--theme-color-cardBg)',
                    layout: 'var(--theme-color-layoutBg)',
                    box: 'var(--theme-color-boxBg)',
                },
                camo: {
                    green: '#4b5320',
                    brown: '#82786a',
                    sand: '#dccbba',
                    black: '#1e1e1e',
                }
            },
            fontFamily: {
                stencil: ['var(--font-heading)', 'cursive', 'system-ui', 'sans-serif'],
                mono: ['var(--font-body)', 'monospace'],
            },
            backgroundImage: {
                'camo-pattern': "url('https://www.transparenttextures.com/patterns/camouflage.png')",
            }
        },
    },
    plugins: [],
}
