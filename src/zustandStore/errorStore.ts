import { create } from "zustand";

interface ErrorStore {
  hasError: boolean;
  errorMessage: string | null;
  setError: (message?: string) => void;
  removeError: () => void;
}

const useErrorStore = create<ErrorStore>((set) => ({
  hasError: false,
  errorMessage: null,
  setError: (message?: string) =>
    set({ hasError: true, errorMessage: message || null }),
  removeError: () => set({ hasError: false, errorMessage: null }),
}));

export default useErrorStore;
