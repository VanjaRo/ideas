module.exports = {
  content: ["./views/**/*.hbs", "./views/*.hbs"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        gemunu: "'Gemunu Libre', sans-serif",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
