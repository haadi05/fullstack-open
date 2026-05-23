import { useAnecdoteActions, useAnecdotes } from "../store";
import { useNotificationActions as useNotificationActions } from "../notificationStore";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdoteActions();
  const { setVoteNotification } = useNotificationActions();
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  const handleVote = async (e, anecdote) => {
    e.preventDefault();
    vote(anecdote.id);
    setVoteNotification(anecdote.content);
  };

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={(e) => handleVote(e, anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
