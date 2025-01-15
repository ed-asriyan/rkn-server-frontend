import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        viteSingleFile(),
    ],
    server: {
    proxy: {
        '/config.json': {
          target: 'http://localhost:3001',
          bypass: function (req, res, proxyOptions) {
            const customConfig = { supabaseUrl, supabaseKey };
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(customConfig));
            return false
          }
        }
      },
    }
});
