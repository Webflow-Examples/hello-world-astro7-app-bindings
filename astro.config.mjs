import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://example.com',
  base: process.env.COSMIC_MOUNT_PATH || process.env.PUBLIC_BASE_PATH || '',
  compressHTML: true,
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  build: {
    inlineStylesheets: 'auto',
    // A non-default, harmless build option. The Webflow Cloud builder must
    // preserve it when it generates astro.config.webflow.ts — it owns only
    // build.assetsPrefix, not the rest of the build block. `format: 'file'`
    // (default is 'directory') makes prerendered routes emit `<route>.html`
    // instead of `<route>/index.html`; the framework-regression harness asserts
    // on build-config-check.html to prove the option survived.
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
});
