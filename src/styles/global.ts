import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
    },

    body: {
        backgroundColor: '$gray_900',
        color: '$gray_100',
        '-webkit-font-smoothing': 'antialiased',
    },

    'body, input, textarea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400,
    }
})