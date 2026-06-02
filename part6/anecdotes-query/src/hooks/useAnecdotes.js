import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, update, create } from "../requests";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: 1,
  });

  const updatedAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    voteAnecdote: (anecdote) =>
      updatedAnecdoteMutation.mutate({
        ...anecdote,
        votes: anecdote.votes + 1,
      }),
  };
};
