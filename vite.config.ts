import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as process from 'node:process';

installGlobals();

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  plugins: [remix(), tsconfigPaths()],
  define: {
    'process.env': process.env
  }
});
