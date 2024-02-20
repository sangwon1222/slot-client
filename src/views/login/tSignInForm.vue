<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/layout';
import { onMounted, reactive, ref, computed } from 'vue';
import aButton from '@atoms/aButton.vue';
import aInput from '@atoms/aInput.vue';
import { setEncode } from '@/util';
import authApi from '@/api/auth';

const refIdinput = ref(null);
const refPwinput = ref(null);
const state = reactive({
  id: '',
  pw: '',
  error: {
    id: computed(() => !state.id),
    pw: computed(() => !state.pw),
  },
});

onMounted(() => refIdinput.value?.focus());

const signIn = async () => {
  const { id, pw } = state;
  if (!id) return refIdinput.value.focus();
  if (!pw) return refPwinput.value.focus();

  useLayoutStore.isLoading = true;
  try {
    const l = setEncode(JSON.stringify({ userID: id, pwd: pw }), 'login-info');
    const { ok, msg } = await authApi.signIn({ l });
    emit('sign-in', ok, msg);
    if (!ok) refIdinput.value.select();
  } catch (e) {
    console.log(e);
  } finally {
    useLayoutStore.isLoading = false;
  }
};

const emit = defineEmits(['sign-in']);
</script>

<template>
  <form class="user-info-box gap-[20px]" @submit.prevent="signIn">
    <a-input
      ref="refIdinput"
      v-model:model-value="state.id"
      :validate-style="state.error.id ? 'border-red-400' : 'border-black'"
      :error-text="state.id ? '' : '아이디를 입력해주세요.'"
      class="!w-full max-w-[500px]"
      default-style="!w-full"
      placeholder="아이디"
      label="ID"
      use-validate
      required
    />
    <a-input
      ref="refPwinput"
      v-model:model-value="state.pw"
      :validate-style="state.error.pw ? 'border-red-400' : 'border-black'"
      :error-text="state.pw ? '' : '비밀번호를 입력해주세요.'"
      class="!w-full max-w-[500px]"
      default-style="!w-full"
      placeholder="비밀번호"
      autocomplete="off"
      label="PASSWORD"
      type="password"
      use-validate
      required
    />

    <a-button
      type="submit"
      default-style="w-full max-w-[500px] rounded p-[10px] duration-300 "
      :validate-style="state.id && state.pw ? 'bg-main-1 text-white' : 'bg-main-3'"
      label="로그인"
      @on-click="signIn"
    />
  </form>
</template>

<style lang="less" scoped>
.user-info-box {
  @apply flex w-full flex-col items-center;
}
</style>
