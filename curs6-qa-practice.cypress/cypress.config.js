const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
  supportFile: "curs6-qa-practice.cypress\cypress\support",
  baseUrl: "https://qa-practice.netlify.app"
  }
})