import { create } from "zustand";

const useReviewStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    incrementGood: () => set((state) => ({ good: state.good + 1 })),
    incrementNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
    incrementBad: () => set((state) => ({ bad: state.bad + 1 })),
  },
}));

export const useReviewControls = () => useReviewStore((state) => state.actions);
export const useGoodReview = () => useReviewStore((state) => state.good);
export const useNeutralReview = () => useReviewStore((state) => state.neutral);
export const useBadReview = () => useReviewStore((state) => state.bad);
