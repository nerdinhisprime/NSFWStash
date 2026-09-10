import { API_HOSTNAME } from '@/shared';

export const getMediaListImg = async (
  cursor: string | null | undefined,
  limit: number = 2,
) => {
  const params = new URLSearchParams({ limit: String(limit) });
  if ( cursor != undefined) {
    params.set('cursor', String(cursor));
  }
  return fetch(`${API_HOSTNAME}/media/get-list-img?limit=${params}`).then(
    (res) => {
      if (!res.ok) return null;
      return res.json();
    },
  );
};
