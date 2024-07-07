import { createContext, useState } from "react";

const PostContext = new createContext();

const PostProvider = ({ children }) => {
  const [message, setMessage] = useState("Hello");

  return (
    <PostContext.Provider value={{ message }}>{children}</PostContext.Provider>
  );
};

export { PostContext, PostProvider };
