import { create } from "zustand";

export interface SearchStore {
  isSearch: boolean;
  setSearch: (search: string) => void;
  search?: string;
}

export const useSearch = create<SearchStore>((set) => ({
  isSearch: false,
  setSearch: (search: string) => {
    set({ isSearch: search !== "" });
    set({ search: search });
  },
}));
