import { create } from "zustand";
import anecdoteService from "./services/anecdote";

const useAnecdoteStore = create((set) => ({
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

    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote,
        ),
      })),

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
