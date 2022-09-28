import { createStitches } from '@stitches/react';

export const { config, css, styled, globalCss, keyframes, getCssText, theme, createTheme } =
    createStitches({
        theme: {
            colors: {
                green_500: '#00875F',
                green_300: '#00B37E',
                gray_900: '#121214',
                gray_800: '#202024',
                gray_700: '#C4C4CC',
                gray_600: '#E1E1E6',
                white: '#FFFFFF',
            },
            fontSizes: {
                md: '1.125rem',
                lg: '1.25rem',
                xl: '1.5rem',
                '2xl': '2rem',
            },
        },
    });
