import { FastifyInstance } from 'fastify';

export default async function apiRoute(app: FastifyInstance) {
  app.get('/check-uploads', (_, reply) => {
    return reply.code(200).send({ msg: "ok ''" });
  });
}
