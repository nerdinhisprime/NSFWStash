import type { Ref } from 'vue';
import { API_HOSTNAME } from '@/shared';

export const uploadMedia = async (file: Ref<File | undefined>) => {
  if (!file.value) return;

  const formData = new FormData();
  formData.append('file', file.value);
  const res = await fetch(`${API_HOSTNAME}/media/upload-single`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error(`upload failed: ${res.status}`);
  return res.json();
};
