export const themeConfig = {
    military: {
        fonts: {
            heading: '"Black Ops One", cursive, system-ui, sans-serif',
            body: '"Courier New", droidsansmono, monospace',
        },
        colors: {
            50: '#f4f6e8',
            100: '#e6ebcd',
            200: '#d1dca0',
            300: '#b4c76b',
            400: '#98af41',
            500: '#7a912a',
            600: '#5e721f',
            700: '#4b591b',
            800: '#3e481a',
            900: '#353d1a',
            950: '#1a200a',
            bgImage: 'repeating-linear-gradient(45deg, #353d1a 0, #353d1a 10px, #3e481a 10px, #3e481a 20px)',
            navBg: '#353d1a',
            sideBg: '#1a200a',
            cardBg: 'rgba(62, 72, 26, 0.9)',
            layoutBg: 'rgba(62, 72, 26, 0.5)',
            boxBg: 'rgba(53, 61, 26, 0.5)',
        }
    },
    redblack: {
        fonts: {
            heading: '"Black Ops One", cursive, system-ui, sans-serif',
            body: '"Courier New", droidsansmono, monospace',
        },
        colors: {
            50: '#ffe5e5',
            100: '#ffcccc',
            200: '#ff9999',
            300: '#ff6666',
            400: '#ff3333',
            500: '#ff0000',
            600: '#cc0000',
            700: '#990000',
            800: '#660000',
            900: '#1a0000',
            950: '#000000',
            bgImage: 'repeating-linear-gradient(45deg, #1a0000 0, #1a0000 10px, #330000 10px, #330000 20px)',
            navBg: '#1a0000',
            sideBg: '#050000',
            cardBg: 'rgba(51, 0, 0, 0.9)',
            layoutBg: 'rgba(51, 0, 0, 0.5)',
            boxBg: 'rgba(26, 0, 0, 0.5)',
        }
    }
};

export const applyTheme = (themeName) => {
    const config = themeConfig[themeName];
    if (!config) return;

    const root = document.documentElement;

    Object.keys(config.colors).forEach(key => {
        root.style.setProperty(`--theme-color-${key}`, config.colors[key]);
    });

    root.style.setProperty('--font-heading', config.fonts.heading);
    root.style.setProperty('--font-body', config.fonts.body);
};
