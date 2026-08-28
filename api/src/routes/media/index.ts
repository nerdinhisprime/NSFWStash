import { FastifyInstance } from 'fastify';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

interface ImageQuery {
  cursor?: string;
  limit?: string;
}

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
    const { rows } = app.pg.query(
      `INSERT INTO media (user_id, file_path, mimetype, size) VALUES ($1, $2, $3, $4);`,
      [1, filePath, data.mimetype, 1024],
    );
    await pipeline(data.file, createWriteStream(filePath));

    if (data.file.truncated)
      return reply.code(413).send({ error: 'File too large' });

    return reply.send({ filename: fileName });
  });
  app.get('/get-list', async (req, reply) => {
    const { rows } = await app.pg.query(
      `SELECT id, file_path, mimetype, created_at FROM media ORDER BY created_at DESC;`,
    );
    const files = rows.map(
      (i) =>
        `${process.env.VITE_API_HOSTNAME}/static/${path.basename(i.file_path)}`,
    );
    return reply.send({
      url: files,
    });
  });
  app.get<{ Querystring: ImageQuery }>('/get-list-img', async (req, reply) => {
    const limit = Number(req.query.limit) || 10;
    const cursor = req.query.cursor ? Number(req.query.cursor) : null;

    const { rows } = await app.pg.query(
      `SELECT file_path FROM media WHERE ($1::int IS NULL OR id < $1) ORDER BY id DESC LIMIT $2`,
      [cursor, limit],
    );
    return {
      items: rows,
      nextCursor: rows.length === limit ? rows.at(-1).id : null,
    };
  });
}
