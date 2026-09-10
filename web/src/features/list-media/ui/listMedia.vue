<script setup lang="ts">
import { ref } from 'vue';
import { getMediaListImg } from '@/entities/media';
import { ioFn } from '@/entities/lazy-load';

interface MediaList {
  id: number;
  originalUrl: string;
  previewUrl: string;
}

const targetEl = ref<HTMLElement | null>(null);
const list = ref<MediaList[]>([]);
const cursor = ref<any>();

const fn = async () => {
  const res = await getMediaListImg(cursor.value, 6);
  if (!res) return;

  if (res?.items) list.value = [...list.value, ...res.items];
  cursor.value = res.nextCursor;

  return res.nextCursor != null;
};
ioFn(targetEl, fn);
</script>

<template>
  <div class="img-container">
    <RouterLink
      v-for="item in list"
      :key="item.id"
      :to="{
        name: 'image-detail',
        params: { id: item.id },
        state: {
          previewUrl: item.previewUrl,
          originalUrl: item.originalUrl,
        },
      }"
    >
      <img :src="item.previewUrl" class="img-item" />
    </RouterLink>
  </div>
  <div ref="targetEl"></div>
</template>

<style scoped>
.img-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  width: 100%;
}
.img-item {
  display: block;
  width: 100%;
  --height: 100%;
  aspect-ratio: 1;
  object-fit: contain;
}
</style>
