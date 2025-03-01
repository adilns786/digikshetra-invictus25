import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // <-- Change this line
import tailwindcss from '@tailwindcss/vite';
import path from "path";

export default defineConfig({
  plugins: [
    react(), // <-- Now using Babel instead of SWC
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});