import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = readFileSync('public/og-default.svg', 'utf-8');

const resvg = new Resvg(svg, {
  background: '#0A0A0A',
  fitTo: { mode: 'width', value: 1200 },
  font: {
    loadSystemFonts: true,
    defaultFontFamily: 'Arial',
    sansSerifFamily: 'Arial',
  },
});

const png = resvg.render();
writeFileSync('public/og-default.png', png.asPng());

console.log(`OG image: ${png.width}x${png.height}, ${(png.asPng().length / 1024).toFixed(1)} KB`);
