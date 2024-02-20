import { reactive } from 'vue';

export const useSocketStore = reactive({
  socket: null,
  socketID: '',
  nickname: '',
});
