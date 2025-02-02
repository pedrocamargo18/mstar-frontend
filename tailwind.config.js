/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js, jsx}"],
  theme: {
    extend: {
      colors:{
        "bg-primary":"#2a2a2a",
        "bg-secundary":"#d9d9d9",
        "accent-details":"#A8DADC",
        "accent-coral":"#E63946",
        "accent-success":"#00D85A",
        "content-body": "#fdfdfd",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}