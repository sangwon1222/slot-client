<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/layout';
import { useAuthStore } from '@/store/auth';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { filter, find } from 'lodash-es';

const router = useRouter();
const state = reactive({
  pageList: computed(() => {
    if (useAuthStore.signedIn) {
      const requiredAuth = filter(routeList, (e) => e.meta.nav && e.meta.authRequired && e.name !== 'logout');
      return requiredAuth as any;
    } else {
      const NotRequiredAuth = filter(routeList, (e) => e.meta.nav && !e.meta.authRequired);
      return NotRequiredAuth as any;
    }
  }),
});

const routeList = filter(router.getRoutes(), (e) => e.redirect != '/404' && e.name != '404');

const goPage = (pageName: string) => {
  if (pageName === 'logout') {
    localStorage.clear();
    useAuthStore.signedIn = false;
    router.push({ name: 'login' });
  } else {
    router.push({ name: pageName });
  }
};

/**
 * ** router/index.ts
 *  meta.nav 값 true 로 기입하면  [ tNav 페이지 목록에 자동 동기화 ],
 *  meta.authRequired 값 true 로 기입하면 로그인 상태에서만 able
 *  meta.authRequired 값 false 로 기입하면 로그인 아닌 상태에서만 able
 */
</script>

<template>
  <div class="flex h-[40px] w-full flex-wrap justify-center border-b-2 border-black bg-white">
    <div class="flex h-full flex-wrap duration-300 mobile:gap-0 tablet:gap-[30px] desktop:gap-[60px]">
      <button v-for="(v, i) in state.pageList" :key="i" class="nav-btn group" @click="goPage(v.name.toString())">
        {{ v.name }}

        <hr
          :class="useLayoutStore.currentNav === v.name ? '!w-[80px] !bg-main-2' : ''"
          class="group-hover:w-[80px] group-hover:bg-main-3"
        />
      </button>
    </div>
    <button v-if="useAuthStore.signedIn" class="nav-btn group !absolute right-0 top-0" @click="goPage('logout')">
      logout
      <hr
        :class="useLayoutStore.currentNav === 'logout' ? '!w-[80px] !bg-main-2' : ''"
        class="group-hover:w-[80px] group-hover:bg-main-3"
      />
    </button>
  </div>
</template>

<style lang="less" scoped>
.nav-btn {
  @apply relative h-full  select-none items-center justify-center;
  width: 80px;
  > hr {
    @apply absolute left-1/2 top-full block w-0 -translate-x-1/2 duration-100;
    height: 4px;
  }
}
</style>
