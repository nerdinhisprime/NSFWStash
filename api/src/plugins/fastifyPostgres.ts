import fp from 'fastify-plugin';
import fastifyPostgres from '@fastify/postgres';

export default fp(async (app) => {
  const {
    DB_USR,
    DB_PSWD,
    DB_HOST = 'postgres',
    DB_PORT = 5432,
    DB_NAME,
  } = process.env;

  await app.register(fastifyPostgres, {
    connectionString: `postgres://${DB_USR}:${DB_PSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  });
});
