import type { FastifyInstance } from 'fastify';

export default async function pingRoute(app: FastifyInstance) {
  app.get('/', async () => ({ message: true }));
}
