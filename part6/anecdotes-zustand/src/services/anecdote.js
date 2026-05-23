const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("failed to fetch anecdote");
  }
  return await response.json();
};

const create = async (obj) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };

  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw new Error("failed to create anecdote");
  }

  return await response.json();
};

export default { getAll, create };
