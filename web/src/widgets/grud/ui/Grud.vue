<script setup lang="ts">
import { GetUser } from '@/features/get-user';
import { CreateUser } from '@/features/create-user';
import { DeleteUser } from '@/features/delete-user';
import { UpdateUserData } from '@/features/update-user-data';
</script>

<template>
  <GetUser />
  <CreateUser />
  <DeleteUser />
  <UpdateUserData />
</template>
