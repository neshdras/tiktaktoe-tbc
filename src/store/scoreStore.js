import { create } from "zustand";

// On donne un nom à notre store, en général "use" + le nom du store
export const useScore = create((set) => ({
    scoreX: 0,
    scoreO: 0, 
    increaseScoreX: () => set((state) => ({scoreX: state.scoreX + 1})), 
    increaseScoreO: () => set((state) => ({scoreO: state.scoreO + 1})) 
}))