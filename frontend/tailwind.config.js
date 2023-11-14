/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  theme: {
    screens: {
      'sm': '250px',
      // => @media (min-width: 250px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'hd': '1024px',
      // => @media (min-width: 1024px) { ... }

      'full-hd': '1900px',
      // => @media (min-width: 1024px) { ... }

      '2k': '2500px',
      // => @media (min-width: 2500px) { ... }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  content: [],
  plugins: [],
};
