import { API_HOSTNAME } from '@/shared';

export const getMediaList = async () => {
  return await fetch(`${API_HOSTNAME}/media/get-list`)
    .then((res) => {
      if (!res.ok) return;
      return res.json();
    })
    .then((res) => res.url);
};
