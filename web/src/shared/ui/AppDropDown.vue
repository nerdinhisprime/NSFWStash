<script setup lang="ts">
import { AppButton } from '@/shared';

defineProps<{ buttonText?: string }>();
</script>

<template>
  <div class="dropdown">
    <AppButton>{{ buttonText || 'undefined' }}</AppButton>
    <article>
      <section class="dropdown-menu">
        <slot />
      </section>
    </article>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  position: absolute;
  margin-top: 10px;
  min-width: 100px;
  background-color: #111;
  padding: 4px;
  z-index: 50;

  visibility: hidden;
}

.dropdown:hover .dropdown-menu {
  visibility: visible;
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -10px;
  width: 100%;
  height: 10px;
}
</style>
