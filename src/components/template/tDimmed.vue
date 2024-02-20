<script setup lang="ts" scoped>
const props = withDefaults(defineProps<{ isShow: boolean }>(), { isShow: false });
const emit = defineEmits(['on-close-pop']);
</script>

<template>
  <div
    class="fixed left-0 top-0 z-[1] min-h-screen w-screen bg-black"
    :class="props.isShow ? 'animate-dimmed' : 'hidden'"
    @click="$emit('on-close-pop')"
  />
</template>

<style lang="less" scoped></style>
