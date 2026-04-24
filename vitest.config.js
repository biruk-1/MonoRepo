import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/utils/**/*.test.js"],
    environment: "node",
  },
});
