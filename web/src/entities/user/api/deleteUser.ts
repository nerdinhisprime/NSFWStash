import { API_HOSTNAME } from '@/shared';

export const deleteUser = async (username: string, password: string) => {
  return fetch(`${API_HOSTNAME}/users/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(async (res) => {
    if (!res.ok) throw new Error('its not ok');
    return await res.json();
  });
};
