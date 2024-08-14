import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["pyodide"], // Exclude pyodide from pre-bundling
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          pyodide: ["pyodide"],
        },
      },
    },
  },
});
