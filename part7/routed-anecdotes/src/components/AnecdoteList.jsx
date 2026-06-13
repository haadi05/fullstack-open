import useAnecdote from "../hooks/useAnecdote";

const AnecdoteList = () => {
  const { anecdotes, delAnecdote } = useAnecdote();
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            {anecdote.content}
            <button onClick={() => delAnecdote(anecdote.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
