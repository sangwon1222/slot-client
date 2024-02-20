<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/layout';
import { toast } from 'vue3-toastify';
import { setEncode } from '@/util';
import authApi from '@/api/auth';
import { reactive } from 'vue';
import { debounce } from 'lodash-es';

const state = reactive({
  id: '',
  pw: '',
  rePw: '',
  nickname: '',
  name: '',
  email: '',
  phoneNumber: '',
  verificationCode: '',
  recommendId: '',
  isAgree: false,
  openTermsofUse: false,
  openPrivacyStatement: false,
});

const signUp = debounce(
  async () => {
    useLayoutStore.isLoading = true;
    try {
      const pwInput = document.getElementById('pw') as HTMLInputElement;

      const { id, pw, rePw } = state;
      if (pw != rePw) {
        toast.error('비밀번호가 일치하지 않습니다.');
        state.pw = '';
        state.rePw = '';
        pwInput.focus();
        return;
      }

      const objectL = { id, pw };
      const l = setEncode(JSON.stringify(objectL), 'signup-info');

      const { ok, msg } = await authApi.signUp({ l });
      if (ok) location.replace('/login');
      else toast.error(msg);
    } catch (e) {
      console.log('error   >', e);
    } finally {
      useLayoutStore.isLoading = false;
    }
  },
  500,
  { trailing: true, leading: false },
);

const cancel = debounce(() => location.replace('/login'), 500, { trailing: true, leading: false });
</script>

<template>
  <div class="sign-up-wrap p-[10px]">
    <form class="user-info-box gap-[10px] p-[14px]" @submit.prevent="signUp">
      <input id="id" v-model="state.id" type="text" maxlength="20" placeholder="아이디를 입력하세요." required />
      <input
        id="pw"
        v-model="state.pw"
        type="password"
        maxlength="20"
        placeholder="비밀번호를 입력하세요."
        autocomplete="off"
        required
      />
      <input
        id="re-pw"
        v-model="state.rePw"
        type="password"
        maxlength="20"
        autocomplete="off"
        placeholder="비밀번호를 확인해주세요."
        required
      />

      <div class="mt-10 flex flex-col gap-[10px] p-[10px]">
        <button class="h-[50px] rounded bg-main-1 text-white" accesskey="s" type="submit">회원 가입</button>
        <button class="h-[50px] rounded border" type="button" @click.self.prevent="cancel">취소</button>
      </div>
    </form>
  </div>
</template>

<style lang="less" scoped>
.sign-up-wrap {
  @apply relative flex h-full w-full flex-col;
  .user-info-box {
    @apply flex flex-col;
    input {
      @apply w-full border;
      height: 50px;
      padding-left: 6px;
      padding-right: 6px;
    }
  }
}
</style>
