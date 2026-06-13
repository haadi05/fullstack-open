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

  return { anecdotes, addAnecdote };
};

export default useAnecdote;
