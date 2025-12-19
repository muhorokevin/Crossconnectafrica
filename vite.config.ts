import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Use a cast to any to fix the "Property 'cwd' does not exist on type 'Process'" error
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Define specific keys rather than the whole object
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ""),
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.browser': true,
    },
    server: {
      port: 3000
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development'
    }
  };
});
