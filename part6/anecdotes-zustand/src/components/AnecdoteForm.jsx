import { useAnecdoteActions } from "../store";
import { useNotificationActions } from "../notificationStore";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { setCreateNotification } = useNotificationActions();

  const addAnecdotes = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    await add(content);
    setCreateNotification(content);
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
