<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/layout';
import { useAuthStore } from '@/store/auth';
import { canvasInfo } from '@/util/config';
import { useGameStore } from '@store/game';
import slotApi from '@/api/slot';
import { onMounted } from 'vue';
import { resize } from '@/util';
import App from '@app/app';

const { backgroundColor, width, height } = canvasInfo;
onMounted(async () => {
  useLayoutStore.isLoading = true;

  const { data } = await slotApi.getGame(useAuthStore.currentGroupIndex);
  useGameStore.game = data;

  const canvasElement = document.getElementById('pixi-canvas') as HTMLCanvasElement;

  window['app'] = new App({ backgroundColor, width, height, view: canvasElement });
  await window['app'].init();
  resize(canvasElement);
  window.addEventListener('resize', () => resize(canvasElement));

  useLayoutStore.isLoading = false;
});
</script>

<template>
  <div class="relative h-screen w-screen overflow-hidden bg-black">
    <div class="m-auto flex h-full w-full flex-col flex-wrap items-center shadow-2xl shadow-slate-600">
      <canvas id="pixi-canvas" class="relative z-[2]" />
    </div>
  </div>
</template>
