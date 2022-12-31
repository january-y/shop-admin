import { ref } from "vue";
import { defineStore } from "pinia";

const useTestStore = defineStore(
  "test",
  () => {
    const count = ref<number>(0);
    const increment = () => {
      count.value += 1;
    };

    return {
      count,
      increment,
    };
  },
  {
    persist: true,
  }
);

export default useTestStore;
