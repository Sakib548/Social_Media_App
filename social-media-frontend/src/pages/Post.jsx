import { useState } from "react";
import PostActions from "../posts/PostActions";
import PostBody from "../posts/PostBody";
import PostComments from "../posts/PostComments";
import PostHeader from "../posts/PostHeader";
import axiosInstance from "../utils/axiosInstance";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`/posts/${post._id}/comment`, {
        content: comment,
      });
      setComments(res.data);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  //console.log("From Header", post);
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} />
      <PostBody />
      <PostActions />
      <PostComments />
    </article>
    // <div className="post">
    //   <h3>{post.user.username}</h3>
    //   <p>{post.content}</p>
    //   <form onSubmit={handleCommentSubmit}>
    //     <input
    //       type="text"
    //       value={comment}
    //       onChange={(e) => setComment(e.target.value)}
    //       placeholder="Write a comment..."
    //     />
    //     <button type="submit">Comment</button>
    //   </form>
    //   <div className="comments">
    //     {comments.map((comment) => (
    //       <p key={comment._id}>{comment.content}</p>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Post;
