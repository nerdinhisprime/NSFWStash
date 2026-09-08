<script setup lang="ts">
import { UploadMedia } from '@/features/upload-media';
import { GetMedia } from '@/features/get-media';
import { LazyLoad } from '@/entities/lazy-load';
import { ListMedia } from '@/features/list-media';
</script>
<template>
  <UploadMedia />
  <GetMedia />
  <!-- <LazyLoad /> -->
  <ListMedia />
</template>
