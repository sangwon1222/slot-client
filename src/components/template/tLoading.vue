<script lang="ts" setup scoped>
import { useLayoutStore } from '@store/layout';
</script>

<template>
  <div class="loading-wrap" :class="useLayoutStore.isLoading ? 'animate-fadeIn' : 'animate-fadeOut'">
    <div class="h-full w-full bg-black opacity-50">
      <div class="circle animate-[spin_2s_linear_infinite]" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.loading-wrap {
  @apply pointer-events-auto fixed left-0 top-0 z-10 h-screen w-screen;

  .circle {
    @apply fixed rounded-full border-transparent border-t-white;
    height: 200px;
    width: 200px;
    border-width: 20px;
    top: calc(50% - 100px);
    left: calc(50% - 100px);
  }
}
</style>
