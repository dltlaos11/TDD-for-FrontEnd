import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "j75f1p",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
});
