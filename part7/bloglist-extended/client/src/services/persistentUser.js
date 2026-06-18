export const getUser = () => {
  return window.localStorage.getItem("loggedInUser");
};

export const saveUser = (user) => {
  return window.localStorage.setItem("loggedInUser", JSON.stringify(user));
};

export const removeUser = () => {
  return window.localStorage.removeItem("loggedInUser");
};
