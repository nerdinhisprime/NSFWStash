import { API_HOSTNAME } from '@/shared';

export const updateUserData = async (
  newUsrname: string,
  currUsrname: string,
  newPswd: string,
  currPswd: string,
) => {
  return fetch(`${API_HOSTNAME}/users/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentUsername: currUsrname,
      newUsername: newUsrname,
      currentPassword: currPswd,
      newPassword: newPswd,
    }),
  }).then(async (res) => {
    if (!res.ok) throw new Error('not ok');
    return await res.json();
  });
};
