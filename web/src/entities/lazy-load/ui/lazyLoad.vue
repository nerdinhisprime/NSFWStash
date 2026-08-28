<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const items = ref([1, 2, 3, 4, 5]);
const isLoading = ref(false);
const triggerEl = ref(null);

let observer = null;

const loadMore = () => {
  if (isLoading.value) return;
  isLoading.value = true;
  setTimeout(() => {
    for (let i = 1; i <= 5; i++) {
      items.value.push(items.value.length + i);
    }
    isLoading.value = false;
  }, 800);
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading.value) loadMore();
    },
    { rootMargin: '200px' },
  );

  if (triggerEl.value) observer.observe(triggerEl.value);
});

onUnmounted(() => observer.disconnect());
</script>

<template>
  <div class="feed">
    <div v-for="item in items" :key="item" class="card">
      Элемент #{{ item }}
    </div>
    <div ref="triggerEl" class="trigger"></div>
  </div>
</template>

<style scoped>
.card {
  padding: 30px;
  margin: 15px 0;
  background: #2b2d42;
  color: white;
  border-radius: 8px;
  text-align: center;
}
.trigger {
  padding: 20px;
  margin: 15px 0;
  background: #e63946;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}
</style>
