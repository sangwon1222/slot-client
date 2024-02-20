import { reactive } from 'vue';

export const useLayoutStore: TypeLayoutStore = reactive({
  isLoading: false,
  currentNav: '',
});
