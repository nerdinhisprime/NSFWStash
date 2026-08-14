import { API_HOSTNAME } from '@/shared';

export const getUserData = async (id: number) => {
  return fetch(`${API_HOSTNAME}/users/get/${id}`).then((res) => {
    if (!res.ok) throw new Error('response is not ok');
    return res.json();
  });
};
