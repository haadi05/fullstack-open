import { useNotify } from "../hooks/useNotify";
import { useAnecdotes } from "../hooks/useAnecdotes";

const AnecdoteForm = () => {
  const { addAnecdote: addAnecdoteToServer } = useAnecdotes();
  const setNotification = useNotify();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    addAnecdoteToServer(content);
    if (content) {
      setNotification(`anecdote '${content}' added`);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" required />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
