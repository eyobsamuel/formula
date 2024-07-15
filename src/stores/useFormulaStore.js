import create from "zustand";

const useFormulaStore = create((set) => ({
  result: null,
  error: null,
  setResult: (result) => set({ result }),
  setError: (error) => set({ error }),
}));

export default useFormulaStore;
