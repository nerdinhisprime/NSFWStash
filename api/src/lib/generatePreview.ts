import sharp from 'sharp';

const PREVIEW_WIDTH = 400;

export async function generagePreview(sourcePath: string, previewPath: string) {
  await sharp(sourcePath)
    .resize({ width: PREVIEW_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(previewPath);
}
