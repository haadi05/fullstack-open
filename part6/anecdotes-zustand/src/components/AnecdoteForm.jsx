import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();

  const getId = () => (100000 * Math.random()).toFixed(0);

  const addAnecdotes = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const anecdote = { content: content, id: getId(), votes: 0 };
    add(anecdote);
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
