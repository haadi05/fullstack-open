import { createContext, useReducer } from "react";

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

  return (
    <BlogContext.Provider
      value={{
        notification,
        dispatch,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};
