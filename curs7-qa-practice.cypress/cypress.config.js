const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "e8az66",
  e2e: {
    baseUrl: "https://qa-practice.netlify.app",
    defaultCommandTimeout: 20000,
    requestTimeout: 20000,
    pageLoadTimeout: 20000,
    // video: true,
    setupNodeEvents(on, config) {
    },
  },
});