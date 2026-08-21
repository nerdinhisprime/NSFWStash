import type { FastifyInstance } from 'fastify';

export default async function pingRoute(app: FastifyInstance) {
  app.get('/', async () => ({ message: true }));
  app.get('/auth_check', (_, reply) => {
    const code = 200
    return reply.code(code).send({ msg: `ok ${code}` });
  });
}
