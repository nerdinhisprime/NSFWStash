<script setup lang="ts">
import { UploadMedia } from '@/features/upload-media';
import { GetMedia } from '@/features/get-media';
import { LazyLoad } from '@/entities/lazy-load';
</script>
<template>
  <UploadMedia />
  <GetMedia />
  <LazyLoad />
</template>
