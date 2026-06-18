import { createContext, useReducer, useState } from "react";

const BlogContext = createContext();

export default BlogContext;

export const BlogContextProvider = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET":
        return {
          message: action.payload.message,
          type: action.payload.type,
        };

      case "CLEAR":
        return null;
      default:
        return state;
    }
  };
  const [notification, dispatch] = useReducer(reducer, null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  return (
    <BlogContext.Provider
      value={{
        notification,
        dispatch,
        username,
        setUsername,
        password,
        setPassword,
        user,
        setUser,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};
