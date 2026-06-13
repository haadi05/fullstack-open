import { useEffect, useState } from "react";
import anecdoteService from "../services/anecdotes";

const useAnecdote = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data));
  }, []);

  const addAnecdote = async (anecdote) => {
    const response = await anecdoteService.createNew(anecdote);
    setAnecdotes(anecdotes.concat(response));
  };

  const delAnecdote = async (id) => {
    const response = await anecdoteService.del(id);
    if (response === 200) {
      setAnecdotes(anecdotes.filter((anecdote) => anecdote.id !== id));
    }
  };

  return { anecdotes, addAnecdote, delAnecdote };
};

export default useAnecdote;
