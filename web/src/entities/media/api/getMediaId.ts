import { API_HOSTNAME } from '@/shared';

export const getMediaId = async (id: number | string) => {
  const res = await fetch(`${API_HOSTNAME}/media/get-img/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return {
    previewUrl: data.previewUrl ?? data.preview_url,
    originalUrl: data.originalUrl ?? data.original_url,
  };
};
