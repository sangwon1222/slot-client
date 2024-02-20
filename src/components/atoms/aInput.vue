<script setup lang="ts" scoped>
import { computed, reactive, ref } from 'vue';

declare interface TypePropInput {
  label?: string;
  validateStyle?: string;
  useValidate?: boolean;
  defaultStyle?: string;
  autocomplete?: string;
  placeholder?: string;
  errorText?: string;
  required?: boolean;
  type?: string;
  initValue?: string;
  readonly?: boolean;
  modelValue?: string;
  dataBinding?: string;
}

const props = withDefaults(defineProps<TypePropInput>(), {
  label: '',
  useValidate: false,
  validateStyle: '',
  placeholder: '',
  type: 'text',
  errorText: '',
  defaultStyle: '',
  initValue: '',
  autocomplete: 'on',
  required: false,
  readonly: false,
  modelValue: '',
  dataBinding: '',
});

const state = reactive({
  inputValue: props.initValue ? props.initValue : props.modelValue,
  errorText: '',
});

const style = computed(() => {
  const stlye = props.useValidate ? ` ${props.defaultStyle} ${props.validateStyle}` : `${props.defaultStyle}`;
  return `${stlye} ${props.readonly ? 'cursor-pointer' : ''}`;
});
const refInput = ref(null);

const input = (e: InputEvent) => {
  const target = e.currentTarget as HTMLInputElement;
  if (props.type === 'number') target.value = `${+target.value}`;
  typing(target.value);
};

const typing = (value: string) => {
  state.errorText = '';

  /**특수 기호 금지 */
  if (props.dataBinding.includes('not-symbol')) {
    // eslint-disable-next-line no-useless-escape
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    const notSymbol = value.replace(reg, '');
    if (value != notSymbol) state.errorText = '특수 기호는 입력할 수 없습니다.';
    value = notSymbol;
  }

  /**대문자 변환 */
  if (props.dataBinding.includes('upper')) value = value.toUpperCase();

  /**소문자 변환 */
  if (props.dataBinding.includes('lower')) value = value.toLowerCase();

  state.inputValue = value;
  refInput.value.value = state.inputValue;
  emit('update:model-value', state.inputValue);
};
const focus = () => refInput?.value?.focus();
const select = () => refInput?.value?.select();
const blur = () => refInput?.value?.blur();
const reset = () => typing('');
const trim = () => (state.inputValue = state.inputValue.trim());

defineExpose({ focus, select, blur, typing, reset, trim });
const emit = defineEmits(['update:model-value', 'keydownEnter']);
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-wrap items-center px-[6px]">
      <label v-if="props.label" class="pr-6">{{ props.label }} :</label>

      <input
        ref="refInput"
        :type="props.type"
        :placeholder="props.placeholder"
        :class="style"
        :value="props.readonly ? props.initValue : state.inputValue"
        :required="props.required"
        class="focus:border-sky-300"
        :readonly="props.readonly"
        @input="input"
        @keydown.enter.self="$emit('keydownEnter')"
      />
    </div>
    <p v-if="props.useValidate" :class="props.errorText ? 'opacity-100' : 'opacity-0'" class="h-[18px] text-red-400">
      {{ props.errorText }}
    </p>
    <p :class="state.errorText ? 'opacity-100' : 'opacity-0'" class="h-[18px] text-red-400">{{ state.errorText }}</p>
  </div>
</template>

<style lang="less" scoped></style>
