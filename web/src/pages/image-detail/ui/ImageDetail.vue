<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMediaId } from '@/entities/media';

const { id } = useRoute().params;
const previewUrl = ref('');
const originalUrl = ref('');

onMounted(async () => {
  if (history.state.previewUrl && history.state.originalUrl) {
    previewUrl.value = history.state.previewUrl;
    originalUrl.value = history.state.originalUrl;
  } else {
    const res = await getMediaId(Number(id));
    console.log(res)
    if (res) {
      previewUrl.value = res.previewUrl;
      originalUrl.value = res.originalUrl;
    }
    console.log(previewUrl.value)
  }
});
</script>
<template>
  <div>
    <img :src="`${previewUrl}`" class="image" />
    <img :src="`${originalUrl}`" class="image" />
  </div>
</template>

<style scoped>
.image {
  height: 90vh;
}
</style>
