import { API_HOSTNAME } from '@/shared';

export const createUser = async (username: string, password: string) => {
  return fetch(`${API_HOSTNAME}/users/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(async (res) => {
    if (!res.ok) throw new Error('res isnt ok');
    return await res.json();
  });
};
