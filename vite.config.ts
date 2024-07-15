import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "codemirror",
      "codemirror/lib/codemirror.css",
      "codemirror/theme/material.css",
      "codemirror/addon/hint/show-hint.css",
    ],
  },
});
