import { defineStore } from "pinia";

export const useTestStore = defineStore("testStore", () => {
  const amount = ref(0);

  function addAmount() {
    amount.value = amount.value + 1;
  }

  return {
    amount,
    addAmount,
  };
});
