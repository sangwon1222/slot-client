import { useAuthStore } from '@/store/auth';
import axiosApi from './index';
import { useGameStore } from '@/store/game';
import { canvasInfo } from '@/util/config';

class SlotApi {
  getGame = async (groupIdx: number) => {
    try {
      const { data } = await axiosApi.post('gameList/get-game', { name: useAuthStore.gameName, groupIdx });
      return data;
    } catch (e) {
      console.error('get-game ERROR', e);
    }
  };
}

export default new SlotApi();
