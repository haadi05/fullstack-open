import { useContext } from "react";
import AnecdoteContext from "../context/AnecdoteContext";

export const useNotify = () => {
  const { setNotification } = useContext(AnecdoteContext);
  return (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };
};
