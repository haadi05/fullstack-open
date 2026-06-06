import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnecdoteContextProvider } from "./context/AnecdoteContext";
import ReactDOM from "react-dom/client";
import App from "./App";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <AnecdoteContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AnecdoteContextProvider>,
);
