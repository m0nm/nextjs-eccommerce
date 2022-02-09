import create from "zustand";

interface IStore {
  totalPrice: number;
  setTotalPrice: (value: number) => void;
}

export const useStore = create<IStore>((set) => ({
  totalPrice: 0,
  setTotalPrice: (value) => set((state) => ({ totalPrice: value })),
}));
