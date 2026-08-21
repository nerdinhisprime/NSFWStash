import type { FastifyInstance } from 'fastify';

interface User {
  id: number;
  username: string;
  password: string;
  created_at: string;
}

interface GetUserRoute {
  Params: { id: string };
}

interface CreateUserRoute {
  Body: { username: string; password: string };
}

interface DeleteUserRoute {
  Body: { username: string; password: string };
}

interface UpdateUserRoute {
  Body: {
    currentUsername: string;
    newUsername?: string;
    currentPassword: string;
    newPassword: string;
  };
}

export default async function usersRoute(app: FastifyInstance) {
  app.get<GetUserRoute>('/get/:id', async (req) => {
    const { id } = req.params;
    const { rows } = await app.pg.query<User>(
      `SELECT * FROM users WHERE id = $1;`,
      [id],
    );
    return { users: rows[0] };
  });
  app.post<CreateUserRoute>('/create', async (req, reply) => {
    const { username, password } = req.body;
    const { rows } = await app.pg.query<
      Pick<User, 'id' | 'username' | 'created_at'>
    >(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at;`,
      [username, password],
    );
    return reply.code(201).send({ data: rows });
  });
  app.post<DeleteUserRoute>('/delete', async (req, reply) => {
    const { username, password } = req.body;
    const { rows } = await app.pg.query<User>(
      `DELETE FROM users WHERE username = $1 AND password = $2 RETURNING id, username, password, created_at`,
      [username, password],
    );
    return reply.code(201).send({ message: rows[0] });
  });
  app.patch<UpdateUserRoute>('/update', async (req, reply) => {
    const { currentUsername, newUsername, currentPassword, newPassword } =
      req.body;
    const { rows } = await app.pg.query<User>(
      `UPDATE users
      SET
        username = COALESCE($1, username),
        password = COALESCE($2, password)
      WHERE username = $3 AND password = $4
      RETURNING *;`,
      [newUsername, newPassword, currentUsername, currentPassword],
    );
    return reply.code(200).send({
      message: rows[0],
    });
  });
}
