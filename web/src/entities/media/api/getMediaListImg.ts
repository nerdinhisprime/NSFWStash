import { API_HOSTNAME } from '@/shared';

export const getMediaListImg = async (
  cursor: string = "",
  limit: number = 2,
) => {
  return fetch(
    `${API_HOSTNAME}/media/get-list-img?limit=${limit}&cursor=${cursor}`,
  ).then((res) => {
    if (!res.ok) return;
    return res.json();
  });
};
