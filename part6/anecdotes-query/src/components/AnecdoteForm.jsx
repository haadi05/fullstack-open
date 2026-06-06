import { useContext } from "react";
import { useAnecdotes } from "../hooks/useAnecdotes";
import AnecdoteContext from "../context/AnecdoteContext";

const AnecdoteForm = () => {
  const { addAnecdote: addAnecdoteToServer } = useAnecdotes();
  const { setNotification } = useContext(AnecdoteContext);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    addAnecdoteToServer(content);
    if (content) {
      setNotification(`anecdote '${content}' added`);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" required minLength="5" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
