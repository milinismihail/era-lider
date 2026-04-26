import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://era-lider.ru',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      // Служебные страницы — за пределы sitemap
      filter: (page) => !page.includes('/thanks') && !page.includes('/404'),
      serialize(item) {
        if (item.url === 'https://era-lider.ru/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        }
        return item;
      },
    }),
  ],
  server: {
    port: 8080,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  build: {
    // 'always' — все CSS инлайнятся в <head>, нет render-blocking external CSS chunks
    inlineStylesheets: 'always',
  },
});
