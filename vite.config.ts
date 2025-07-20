import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import path from 'path';

const enforceFileSizeLimitPlugin = function (limitInKb = 16) {
  return {
    name: 'enforce-file-size-limit',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const files = fs.readdirSync(distDir);

      for (const file of files) {
        if (['.js', '.css', '.html'].find(ext => file.endsWith(ext))) {
            const filePath = path.join(distDir, file);
            const stats = fs.statSync(filePath);
            if (stats.size > limitInKb * 1024) {
                throw new Error(`Build failed: ${file} is ${stats.size} bytes (> ${limitInKb}KB)`);
            }
        }
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        enforceFileSizeLimitPlugin(16),
    ],
    build: {
        chunkSizeWarningLimit: 16, // Warn if over
        cssCodeSplit: true, // Ensures CSS is split too
        rollupOptions: {
        output: {
            manualChunks(id) {
            if (id.includes('node_modules')) {
                // Split each package into separate chunks
                const parts = id.split('node_modules/');
                const pkg = parts[1].split('/')[0];
                return `vendor-${pkg}`;
            }

            // Aggressively split any file
            if (id.includes('/src/')) {
                const name = path.relative('src', id).replace(/[^a-zA-Z0-9]/g, '_');
                return `chunk-${name}`;
            }
            },
            inlineDynamicImports: false
        }
        }
    },
    publicDir: './src/static',
});
