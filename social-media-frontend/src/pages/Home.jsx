import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CreatePost from "../posts/CreatePost";
import axiosInstance from "../utils/axiosInstance";
import Post from "./Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [posts]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-red-500 text-center">
        Hello {auth?.user?.username}
      </h1>
      <CreatePost />
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
