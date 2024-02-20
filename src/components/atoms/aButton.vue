<script setup lang="ts" scoped>
import { computed } from 'vue';

declare interface TypePropButton {
  defaultStyle?: string;
  validateStyle?: string;
  label?: string;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<TypePropButton>(), {
  defaultStyle: '',
  validateStyle: '',
  label: '',
  type: 'button',
});

const style = computed(() => `${props.defaultStyle} ${props.validateStyle} select-none`);

const emit = defineEmits(['onClick']);
</script>

<template>
  <button
    class="flex items-center justify-center"
    :class="style"
    :type="props.type"
    role="button"
    :aria-label="`${props.label}-Aria`"
    @click.prevent="$emit('onClick')"
  >
    {{ props.label }}
  </button>
</template>

<style lang="less" scoped></style>
