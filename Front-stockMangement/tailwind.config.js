const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {

        fontFamily: {
            // sans: ['Raleway', 'sans-serif'],
            sans: ['Montserrat', 'sans-serif'],
            h1: ['"Special Gothic Expanded One"', 'sans-serif'],
        },
        extend: {},
    },
    plugins: [],
});
