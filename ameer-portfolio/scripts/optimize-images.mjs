import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const stats = [];

async function optimize() {
  console.log('Optimizing images...');

  // 1. Projects images
  const projectsDir = path.join(publicDir, 'projects');
  const projectFiles = fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith('.webp') && !f.endsWith('-card.webp'));

  for (const file of projectFiles) {
    const inputPath = path.join(projectsDir, file);
    const originalBuffer = fs.readFileSync(inputPath);
    const originalSize = originalBuffer.length;
    const meta = await sharp(originalBuffer).metadata();

    const baseName = path.basename(file, '.webp');
    const cardPath = path.join(projectsDir, `${baseName}-card.webp`);

    // Card image: 820px wide, quality 75, keeping aspect ratio
    const cardWidth = Math.min(meta.width, 820);
    const cardBuffer = await sharp(originalBuffer)
      .resize({ width: cardWidth, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    fs.writeFileSync(cardPath, cardBuffer);

    // Lightbox / full version: cap at 1280px wide, quality 78, overwrite original
    const fullWidth = Math.min(meta.width, 1280);
    const fullBuffer = await sharp(originalBuffer)
      .resize({ width: fullWidth, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toBuffer();
    fs.writeFileSync(inputPath, fullBuffer);

    stats.push({
      file: `projects/${file} (full)`,
      oldKB: (originalSize / 1024).toFixed(1) + ' KB',
      newKB: (fullBuffer.length / 1024).toFixed(1) + ' KB',
      ratio: ((fullBuffer.length / originalSize) * 100).toFixed(0) + '%',
      dims: `${meta.width}x${meta.height} -> ${fullWidth}w`,
    });
    stats.push({
      file: `projects/${baseName}-card.webp`,
      oldKB: (originalSize / 1024).toFixed(1) + ' KB',
      newKB: (cardBuffer.length / 1024).toFixed(1) + ' KB',
      ratio: ((cardBuffer.length / originalSize) * 100).toFixed(0) + '%',
      dims: `${meta.width}x${meta.height} -> ${cardWidth}w`,
    });
  }

  // 2. Hero portrait: ameer-cutout.png -> ameer-cutout.webp
  const heroPngPath = path.join(publicDir, 'images', 'ameer-cutout.png');
  const heroWebpPath = path.join(publicDir, 'images', 'ameer-cutout.webp');
  if (fs.existsSync(heroPngPath)) {
    const heroBuffer = fs.readFileSync(heroPngPath);
    const heroMeta = await sharp(heroBuffer).metadata();
    const heroWidth = Math.min(heroMeta.width, 816);
    const heroOptimized = await sharp(heroBuffer)
      .resize({ width: heroWidth, withoutEnlargement: true })
      .webp({ quality: 85, alphaQuality: 90 })
      .toBuffer();
    fs.writeFileSync(heroWebpPath, heroOptimized);
    stats.push({
      file: 'images/ameer-cutout (png -> webp)',
      oldKB: (heroBuffer.length / 1024).toFixed(1) + ' KB',
      newKB: (heroOptimized.length / 1024).toFixed(1) + ' KB',
      ratio: ((heroOptimized.length / heroBuffer.length) * 100).toFixed(0) + '%',
      dims: `${heroMeta.width}x${heroMeta.height} -> ${heroWidth}w`,
    });
    fs.unlinkSync(heroPngPath);
  }

  // 3. Compare slider: compare/final.webp
  const comparePath = path.join(publicDir, 'compare', 'final.webp');
  if (fs.existsSync(comparePath)) {
    const compareBuffer = fs.readFileSync(comparePath);
    const compareMeta = await sharp(compareBuffer).metadata();
    const compareWidth = Math.min(compareMeta.width, 1472);
    const compareOptimized = await sharp(compareBuffer)
      .resize({ width: compareWidth, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toBuffer();
    fs.writeFileSync(comparePath, compareOptimized);
    stats.push({
      file: 'compare/final.webp',
      oldKB: (compareBuffer.length / 1024).toFixed(1) + ' KB',
      newKB: (compareOptimized.length / 1024).toFixed(1) + ' KB',
      ratio: ((compareOptimized.length / compareBuffer.length) * 100).toFixed(0) + '%',
      dims: `${compareMeta.width}x${compareMeta.height} -> ${compareWidth}w`,
    });
  }

  console.table(stats);
}

optimize().catch(console.error);
