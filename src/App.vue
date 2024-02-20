<script lang="ts" setup scoped>
import defaultLayout from '@template/layout/defaultLayout.vue';
import tLoading from '@template/tLoading.vue';

document.addEventListener(
  'contextmenu',
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  },
  { passive: false },
);

/**드래그 금지 */
document.addEventListener(
  'dragstart',
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  },
  { passive: false },
);
</script>

<template>
  <div class="justufy-center relative flex h-full w-full items-center">
    <t-loading class="z-[3]" />
    <defaultLayout class="z-[2]" />
  </div>
</template>
