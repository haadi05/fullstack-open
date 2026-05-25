import { create } from "zustand";
import anecdoteService from "./services/anecdote";

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    add: async (content) => {
      const anecdote = await anecdoteService.create({ content, votes: 0 });
      set((state) => ({ anecdotes: state.anecdotes.concat(anecdote) }));
    },

    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes: anecdotes }));
    },

    vote: async (id) => {
      const anecdote = get().anecdotes.find((anecdote) => anecdote.id === id);

      const updated = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });

      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updated : anecdote,
        ),
      }));
    },

    remove: async (id) => {
      const response = await anecdoteService.remove(id);
      if (response === 200) {
        set(() => ({
          anecdotes: get().anecdotes.filter((anecdote) => anecdote.id !== id),
        }));
      }
    },

    setFilter: (value) => set(() => ({ filter: value })),
  },
}));

export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
};
