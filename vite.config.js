import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        skillTree: resolve(__dirname, "skill-tree.html"),
        deepLearning: resolve(__dirname, "deep-learning-architecture.html"),
        federatedLearning: resolve(__dirname, "federated-learning.html"),
      },
    },
  },
});
