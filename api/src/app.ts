import fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';

const app = fastify({ logger: true });

await app.register(AutoLoad, {
  dir: join(import.meta.dirname, 'plugins'),
});

await app.register(AutoLoad, {
  dir: join(import.meta.dirname, 'routes'),
});

export { app };
