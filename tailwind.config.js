/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        weather: {
          night: "#2E2961",
          land: "#423D74",
          border: "#56508B",
          text: "#E7E7E8",
          muted: "#D2D2D2",
          cloud: "#D3E3EC",
          rain: "#4D70D4",
          drizzle: "#65ABE3",
          sun: "#FF8A65",
          amber: "#F4DC85",
          light: "#F8F4F1"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        atmospheric: "0 28px 90px rgba(13, 11, 38, 0.34)",
        bloom: "0 0 42px rgba(255, 138, 101, 0.22), 0 18px 70px rgba(77, 112, 212, 0.2)"
      }
    }
  },
  plugins: []
};
