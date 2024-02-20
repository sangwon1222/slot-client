<script setup lang="ts" scoped>
import tSignInForm from './tSignInForm.vue';
import aButton from '@atoms/aButton.vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();

const signIn = async (ok: boolean, msg: string) => {
  if (ok) router.push({ name: 'game' });
  else toast.error(msg);
};

const findAccount = () => toast.error('준비중입니다.');
</script>

<template>
  <div class="sign-in-wrap gap-[20px] p-[20px]">
    <div class="logo-wrap py-[20px] pt-[40px]">
      <div class="relative flex h-[60px] w-[60px] animate-[spin_8s_linear_forwards] items-center justify-center">
        <div class="absolute h-[50px] w-[50px] rotate-[85deg] rounded-md bg-main-1" alt="로그인_로고" />
        <div class="absolute h-[42px] w-[42px] rotate-[65deg] rounded-md bg-main-2" alt="로그인_로고" />
        <div class="absolute h-[36px] w-[36px] rotate-45 rounded-md bg-main-3" alt="로그인_로고" />
      </div>
      <p class="block w-full py-[20px] text-center text-[20px] font-black">로그인</p>
    </div>

    <t-sign-in-form @sign-in="signIn" />

    <div class="flex w-full max-w-[500px] flex-col flex-wrap">
      <div class="flex h-[50px] w-full items-center border-b">
        <a-button default-style="flex-1" label="아이디 / 비밀번호 찾기" @on-click="findAccount" />
        <hr class="h-[20px] w-[1px] bg-gray-300" />
        <a-button default-style="flex-1" label="회원가입" @on-click="router.push({ name: 'signUp' })" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sign-in-wrap {
  @apply relative flex w-full flex-col items-center bg-white;
  .logo-wrap {
    @apply flex w-full flex-col items-center justify-center;
  }
}
</style>
