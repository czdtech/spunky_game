/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/**", "dist/**", "test/**", "**/*.test.ts", "**/*.config.ts"],
    },
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
  },
});
