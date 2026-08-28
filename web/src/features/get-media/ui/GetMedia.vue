<script setup lang="ts">
import { AppButton } from '@/shared';
import { ref } from 'vue';
import { getMediaList } from '@/entities/media';

const filePathArr = ref<String[]>([]);
const handleLoad = async () => (filePathArr.value = await getMediaList());
</script>

<template>
  <img
    v-for="(i, _) in filePathArr"
    :key="_"
    :src="`${i}`"
    class="media-list__item"
  />
  <AppButton @click="handleLoad">load new</AppButton>
</template>

<style scoped>
.media-list__item {
  display: inline;
  width: 200px;
}
</style>
