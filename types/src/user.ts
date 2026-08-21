export interface User {
  id: number;
  username: string;
  password: string;
  created_at: string;
}

export interface GetUserRoute {
  Params: { id: string };
}

export interface CreateUserRoute {
  Body: { username: string; password: string };
}

export interface DeleteUserRoute {
  Body: { username: string; password: string };
}

export interface UpdateUserRoute {
  Body: {
    currentUsername: string;
    newUsername?: string;
    currentPassword: string;
    newPassword: string;
  };
}
