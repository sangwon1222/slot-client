<script lang="ts" setup scoped>
import clearLayout from '@template/layout/clearLayout.vue';
import hasLayout from '@template/layout/hasLayout.vue';
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layoutList = { clearLayout: clearLayout, hasLayout: hasLayout };
const state = reactive({
  layout: computed(() => {
    switch (route?.meta?.layout) {
      case 'hasLayout':
        return 'hasLayout';
      case 'clearLayout':
        return 'clearLayout';
      default:
        return route.meta.layout as string;
    }
  }),
});
</script>

<template>
  <component :is="layoutList[state.layout]">
    <slot />
  </component>
</template>
