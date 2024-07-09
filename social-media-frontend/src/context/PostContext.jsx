import { createContext, useState } from "react";

const PostContext = new createContext();

const PostProvider = ({ children }) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <PostContext.Provider value={{ isEditable, setIsEditable }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
