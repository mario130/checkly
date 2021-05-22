module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#023047",
        "pr-medium": "#219EBC",
        "pr-light": "#8ECAE6",

        secondary: "#FFB703",
        "sec-orange": "#FB8500",
      },
      fontFamily: {
        logo: "Courgette",
        two: "Merriweather",
        one: "Noto Sans",
        three: "Roboto",
        four: "Josefin Sans",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
