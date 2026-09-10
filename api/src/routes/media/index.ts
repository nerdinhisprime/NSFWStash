import { FastifyInstance } from 'fastify';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';

interface ImageQuery {
  cursor?: string;
  limit?: string;
}

interface IdParams {
  id: string;
}
type MediaType = 'image' | 'video';

const PREVIEW_WIDTH = 400;

async function generatePreview(sourcePath: string, previewPath: string) {
  await sharp(sourcePath)
    .resize({ width: PREVIEW_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(previewPath);
}

const checkMediaType = (mimetype: string): MediaType => {
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('video/')) return 'video';
  throw new Error(`Херовый тип ${mimetype}`);
};

export default async function mediaRoute(app: FastifyInstance) {
  app.post('/upload-single', async (req, reply) => {
    const data = await req.file();
    if (!data) return reply.code(400).send({ error: 'No file uploaded' });
    const ALLOWED_MIME = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/webm',
    ];

    if (!ALLOWED_MIME.includes(data.mimetype)) {
      data.file.resume();
      return reply.code(415).send({ error: 'Unsopported file type' });
    }

    const ext = path.extname(data.filename);
    const fileName = `${randomUUID()}${ext}`;
    const filePath = path.join(
      process.env.IMG_PATH || '/var/www/uploads/images',
      fileName,
    );
    let previewPath: string;
    const fileType = checkMediaType(data.mimetype);
    await pipeline(data.file, createWriteStream(filePath));

    if (data.file.truncated) {
      return reply.code(413).send({ error: 'File too large' });
    }

    if (fileType === 'image') {
      const previewFileName = `${randomUUID()}-preview.webp`;
      previewPath = path.join(
        process.env.PREVIEW_PATH || '/var/www/uploads/preview',
        previewFileName,
      );
      await generatePreview(filePath, previewPath);
    } else {
      previewPath = filePath;
    }
    await app.pg.query(
      `INSERT INTO media (user_id, file_path, preview_path, mimetype, media_type, size) VALUES ($1, $2, $3, $4, $5, $6);`,
      [1, filePath, previewPath, data.mimetype, fileType, 1024],
    );
    return reply.send({ filename: fileName });
  });
  app.get('/get-list', async (_, reply) => {
    const { rows } = await app.pg.query(
      `SELECT id, file_path, preview_path, mimetype, created_at FROM media ORDER BY created_at DESC;`,
    );
    const files = rows.map(
      (i: { file_path: string; preview_path: string }) => ({
        originalFilePath: `${process.env.VITE_MEDIA_HOSTNAME}/original/${path.basename(i.file_path)}`,
        previewFilePath: `${process.env.VITE_MEDIA_HOSTNAME}/preview/${path.basename(i.preview_path)}`,
      }),
    );
    return reply.send({ urls: files });
  });
  app.get<{ Querystring: ImageQuery }>('/get-list-img', async (req) => {
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor ? Number(req.query.cursor) : null;

    const { rows } = await app.pg.query(
      `SELECT id, file_path, preview_path FROM media WHERE ($1::int IS NULL OR id < $1) ORDER BY id DESC LIMIT $2`,
      [cursor, limit],
    );
    const items = rows.map(
      (i: { id: number; file_path: string; preview_path: string }) => ({
        id: i.id,
        originalUrl: `${process.env.VITE_MEDIA_HOSTNAME}/original/${path.basename(i.file_path)}`,
        previewUrl: `${process.env.VITE_MEDIA_HOSTNAME}/preview/${path.basename(i.preview_path)}`,
      }),
    );
    return {
      items,
      nextCursor: rows.length === limit ? (rows.at(-1)?.id ?? null) : null,
    };
  });
  app.get<{ Params: IdParams }>('/get-img/:id', async (req, reply) => {
    const { id } = req.params;
    const { rows } = await app.pg.query(
      `SELECT file_path, preview_path FROM media WHERE id = $1`,
      [id],
    );
    return reply.send({
      previewUrl: `${process.env.VITE_MEDIA_HOSTNAME}/preview/${path.basename(rows[0].preview_path)}`,
      originalUrl: `${process.env.VITE_MEDIA_HOSTNAME}/original/${path.basename(rows[0].file_path)}`,
    });
  });
}
