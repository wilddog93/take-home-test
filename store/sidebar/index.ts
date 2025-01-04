import { create } from "zustand";

export interface SidebarStore {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const useSidebar = create<SidebarStore>((set, get) => ({
  isOpen: true,
  toggleSidebar: () => set({ isOpen: !get().isOpen }),
}));
