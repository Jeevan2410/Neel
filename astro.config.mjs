// Astro Configuration for NEEL ENTERPRISES
// https://docs.astro.build/en/reference/configuration-reference/

import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL || 'https://neel-enterprises.com',
  base: process.env.BASE_PATH || '/',
  
  // Output mode: static by default, hybrid for dynamic routes
  output: 'hybrid',
  
  // Cloudflare adapter for SSR/hybrid mode
  adapter: cloudflare({
    mode: 'advanced',
    platformProxy: {
      configPath: 'wrangler.toml',
      environment: undefined,
      persist: true
    }
  }),
  
  // i18n configuration for multilingual support
  i18n: {
    locales: ['en', 'kn', 'hi'],
    defaultLocale: 'en',
    prefix: 'locales'
  },
  
  // Vite plugins
  vite: {
    plugins: [
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@pages': '/src/pages',
        '@styles': '/src/styles',
        '@config': '/src/config',
        '@lib': '/src/lib',
        '@hooks': '/src/hooks',
        '@types': '/src/types'
      }
    },
    optimizeDeps: {
      include: ['three', 'gsap', 'lenis']
    }
  },
  
  // Markdown processing
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  },
  
  // Image optimization
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  },
  
  // Build options
  build: {
    inlineStylesheets: 'auto'
  },
  
  // Server options for SSR
  server: {
    port: 3000,
    host: true
  },
  
  // Security headers
  compressHTML: true,
  
  // Experimental features
  experimental: {
    contentCollectionCache: true
  }
});
