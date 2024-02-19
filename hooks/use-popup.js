import { create } from "zustand";

export const usePopup = create((set) => ({
    isPopUpOpen: false,
    setIsPopUpOpen: () => set((state) => ({isPopUpOpen: !state.isPopUpOpen})),
    actionType: "",
    setActionType: (actionType) => set({ actionType })
}))