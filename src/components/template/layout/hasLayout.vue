<script lang="ts" setup scoped>
import { useLayoutStore } from '@store/layout';
import { RouterView } from 'vue-router';
import tNav from '@template/layout/tNav.vue';
</script>

<template>
  <div class="relative flex h-screen w-full flex-col items-center">
    <div class="sticky top-0 z-[3] flex w-full max-w-[1300px] flex-col items-center gap-[1px]">
      <t-nav />
    </div>
    <RouterView class="flex h-full w-full max-w-[1300px] flex-1 flex-col overflow-y-auto" />
  </div>
</template>
