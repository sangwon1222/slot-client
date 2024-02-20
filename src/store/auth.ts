import { reactive } from 'vue';

export const useAuthStore: TypeAuthStore = reactive({
  userID: '',
  accessToken: '',
  refreshToken: '',
  currentGroupIndex: 0,
  turnInGroup: 0,
  prizeTurn: 0,
  gameName: '',
  signedIn: false,
});
