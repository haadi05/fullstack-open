import { useContext } from "react";
import BlogContext from "../context/BlogContext";

const useBlogContext = () => useContext(BlogContext);

export default useBlogContext;
