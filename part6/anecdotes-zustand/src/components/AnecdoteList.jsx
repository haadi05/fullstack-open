import { useAnecdoteActions, useAnecdotes } from "../store";
import { useNotificationActions } from "../notificationStore";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdoteActions();
  const { setVoteNotification } = useNotificationActions();

  const handleVote = async (e, anecdote) => {
    e.preventDefault();
    vote(anecdote.id);
    setVoteNotification(anecdote.content);
  };

  const handleDelete = async (e, anecdote) => {
    e.preventDefault();
    const result = window.confirm(`Delete ${anecdote.content} ?`);
    if (result) {
      remove(anecdote.id);
    }
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={(e) => handleVote(e, anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button
                style={{ color: "red" }}
                onClick={(e) => handleDelete(e, anecdote)}
              >
                delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
