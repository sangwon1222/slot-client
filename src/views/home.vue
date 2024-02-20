<script setup lang="ts" scoped>
import { useAuthStore } from '@/store/auth';
import { useLayoutStore } from '@/store/layout';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  useLayoutStore.isLoading = true;
  const nextRouteName = useAuthStore.signedIn ? 'game' : 'login';
  router.push({ name: nextRouteName });
  useLayoutStore.isLoading = false;
});
</script>

<template>
  <div class="relative flex h-full w-full flex-col flex-wrap items-center overflow-hidden">
    <div class="h-full w-full border">CLIENT</div>
  </div>
</template>
