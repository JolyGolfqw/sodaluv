import { create } from "zustand";

interface UserState {
  name: string;
  setName: (name: string) => void;
}

const saveNameToLocalStorage = (name: string) => {
  localStorage.setItem("name", name);
};

const getNameFromLocalStorage = () => {
  return localStorage.getItem("name") || "";
};

export const useUserStore = create<UserState>((set) => ({
  name: getNameFromLocalStorage(),
  setName: (name) => {
    set({ name });
    saveNameToLocalStorage(name);
  },
}));
