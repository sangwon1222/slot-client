<script setup lang="ts" scoped>
import { useChatStore } from '@/store/chat';
import { useSocketStore } from '@/store/socket';
import { watch } from 'vue';

watch(
  () => useChatStore.chatting.length,
  (_newValue, _oldValue) => setTimeout(() => goToChatBottom(), 500),
);

const goToChatBottom = () => {
  const speechBox = document.getElementById('speech-box') as HTMLDivElement;
  speechBox.scrollTo({ top: speechBox.scrollHeight });
};

const sendChat = () => {
  const input = document.getElementById('chat-id') as HTMLInputElement;
  if (!input.value) return;
  useSocketStore.socket.emit('send-chat', { userID: useSocketStore.nickname, chat: input.value, level: 1 });
  input.value = '';
};
</script>

<template>
  <div class="relative flex w-full flex-col gap-10 bg-white py-10">
    <div id="speech-box" class="flex h-200 flex-col gap-6 overflow-y-auto border-2">
      <div
        v-for="(v, i) in useChatStore.chatting"
        :key="i"
        class="flex gap-10"
        :class="v.userID === useSocketStore.nickname ? 'flex-row-reverse' : ''"
      >
        <span
          :class="v.userID === useSocketStore.nickname ? 'bg-main-1 ' : 'bg-main-2'"
          class="flex items-center justify-center rounded-md px-10 text-white"
        >
          {{ v.userID }}
        </span>
        <p class="rounded-md border px-10 py-4">{{ v.chat }}</p>
      </div>
    </div>

    <div class="flex h-40 w-full gap-6 px-6">
      <input id="chat-id" type="text" class="flex-1 border-2 px-10" @keydown.enter.self="sendChat" />
      <button class="bg-main-3 px-20 text-center" @click="sendChat">전송</button>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
