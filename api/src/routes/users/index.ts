import type { FastifyInstance, FastifyRequest } from 'fastify';

export default async function usersRoute(app: FastifyInstance) {
  app.get('/get/:id', async (req: FastifyRequest, reply) => {
    const { id } = req.params;
    const { rows } = await app.pg.query(`SELECT * FROM users WHERE id = $1;`, [
      id,
    ]);
    return { users: rows[0] };
  });
  app.post('/create', async (req, reply) => {
    const { username, password } = req.body;
    const { rows } = await app.pg.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at;`,
      [username, password],
    );
    return reply.code(201).send({ data: rows });
  });
  app.post('/delete', async (req, reply) => {
    const { username, password } = req.body;
    const { rows } = await app.pg.query(
      `DELETE FROM users WHERE username = $1 AND password = $2 RETURNING id, username, password, created_at`,
      [username, password],
    );
    return reply.code(201).send({ message: rows[0] });
  });
  app.patch('/update', async (req, reply) => {
    const { currentUsername, newUsername, currentPassword, newPassword } =
      req.body;
    const { rows } = await app.pg.query(
      `UPDATE users
      SET
        username = COALESCE($1, username),
        password = COALESCE($2, password)
      WHERE username = $3 AND password = $4
      RETURNING *;
      `,
      [newUsername, newPassword, currentUsername, currentPassword],
    );
    return reply.code(200).send({
      message: rows[0],
    });
  });
}
