import { create } from "zustand";

const useNotificationStore = create((set) => ({
  notification: "",
  actions: {
    setVoteNotification: (anecdoteContent) => {
      set(() => ({ notification: `You voted "${anecdoteContent}"` }));
      setTimeout(() => set(() => ({ notification: "" })), 5000);
    },

    setCreateNotification: (anecdoteContent) => {
      set(() => ({ notification: `You Added "${anecdoteContent}"` }));
      setTimeout(() => set(() => ({ notification: "" })), 5000);
    },
  },
}));

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);

export const useNotification = () =>
  useNotificationStore((state) => state.notification);
