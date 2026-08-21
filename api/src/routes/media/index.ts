import { FastifyInstance } from 'fastify';

export default async function mediaRoute(app: FastifyInstance) {
  app.get('/uploads/authorize', async (req, reply) => {
    const originalUri = req.headers['x-original-uri'];
    const originalMethod = req.headers['x-original-method'];

    console.log({ originalUri, originalMethod });

    if (originalMethod !== 'PUT') {
      return reply.code(403).send();
    }

    return reply.code(200).send();
  });
}
