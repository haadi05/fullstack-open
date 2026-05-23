const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("failed to fetch anecdote");
  }
  return await response.json();
};

const create = async (anecdote) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  };

  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw new Error("failed to create anecdote");
  }

  return await response.json();
};

const update = async (id, updateAnecdote) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateAnecdote),
  };

  const response = await fetch(`${baseUrl}/${id}`, options);

  if (!response.ok) {
    throw new Error("failed to update anecdote");
  }

  return await response.json();
};

export default { getAll, create, update };
