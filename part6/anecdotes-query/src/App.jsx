import { useState } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";
import AnecdoteContext from "./context/AnecdoteContext";

const App = () => {
  const [notification, setNotification] = useState("");
  const { anecdotes, isPending, isError, voteAnecdote: vote } = useAnecdotes();

  const handleVote = (anecdote) => {
    vote(anecdote);
    setNotification(`anecdote '${anecdote.content}' voted`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  if (isPending) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <AnecdoteContext.Provider value={{ notification, setNotification }}>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </AnecdoteContext.Provider>
  );
};

export default App;
