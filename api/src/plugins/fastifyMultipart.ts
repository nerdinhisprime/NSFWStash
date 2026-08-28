import fp from 'fastify-plugin';
import fastifyMultipart from '@fastify/multipart';

export default fp(async (app) => {
  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 1000 * 1024 * 1024,
      files: 10,
    },
  });
});
