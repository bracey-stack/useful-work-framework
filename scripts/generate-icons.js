import sharp from 'sharp';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const svgPath = join(projectRoot, 'public', 'favicon.svg');
const outputDir = join(projectRoot, 'public');

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  const svgBuffer = readFileSync(svgPath);

  console.log('Generating PWA icons...');

  for (const size of sizes) {
    const outputPath = join(outputDir, `icon-${size}x${size}.png`);

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`  Created: icon-${size}x${size}.png`);
  }

  // Generate apple-touch-icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(join(outputDir, 'apple-touch-icon.png'));
  console.log('  Created: apple-touch-icon.png');

  // Generate maskable icon with padding (512x512 with 10% safe zone)
  const maskableSize = 512;
  const padding = Math.floor(maskableSize * 0.1);
  const innerSize = maskableSize - (padding * 2);

  const innerIcon = await sharp(svgBuffer)
    .resize(innerSize, innerSize)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: maskableSize,
      height: maskableSize,
      channels: 4,
      background: { r: 41, g: 37, b: 36, alpha: 1 } // #292524 - dark background
    }
  })
    .composite([{
      input: innerIcon,
      left: padding,
      top: padding
    }])
    .png()
    .toFile(join(outputDir, 'maskable-icon-512x512.png'));
  console.log('  Created: maskable-icon-512x512.png');

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
