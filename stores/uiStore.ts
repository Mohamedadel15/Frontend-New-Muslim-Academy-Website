import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  activeModal: string | null;
  toggleMobileMenu: () => void;
  setMobileMenu: (open: boolean) => void;
  setActiveModal: (modal: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  activeModal: null,
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  setMobileMenu: (open) => set({ isMobileMenuOpen: open }),
  setActiveModal: (modal) => set({ activeModal: modal }),
}));
