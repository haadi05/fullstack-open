import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { BlogContextProvider } from "./context/BlogContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <BlogContextProvider>
      <App />
    </BlogContextProvider>
  </Router>,
);
