import { useEffect, useState } from "react";
import anecdoteService from "../services/anecdotes";

const useAnecdote = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data));
  }, []);

  return { anecdotes };
};

export default useAnecdote;
