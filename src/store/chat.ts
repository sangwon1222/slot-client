import { reactive } from 'vue';

export const useChatStore: TypeChatStore = reactive({
  chatting: [],
  concurrentUsers: 1,
});
