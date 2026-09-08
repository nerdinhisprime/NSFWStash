<script setup lang="ts">
import { ref } from 'vue';
import { getMediaListImg } from '@/entities/media';
import { ioFn } from '@/entities/lazy-load';

const targetEl = ref<HTMLElement | null>(null);
const list = ref<string[]>([]);
const cursor = ref<any>();

const fn = async () => {
  const res = await getMediaListImg(cursor.value, 6);

  if (res?.path) list.value = [...list.value, ...res.path];
  cursor.value = res.nextCursor;
};
ioFn(targetEl, fn);
</script>

<template>
  <div class="img-container">
    <img v-for="(path, idx) in list" :key="idx" :src="path" class="img-item" />
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
