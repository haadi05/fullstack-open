import { useContext } from "react";
import BlogContext from "../context/BlogContext";

const useNotification = () => useContext(BlogContext);

export default useNotification;
