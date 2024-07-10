// import ThreeDotsIcon from "/icons/3dots.svg";
//import DeleteIcon from "/icons/delete.svg";
//import EditIcon from "/icons/edit.svg";
// import TimeIcon from "/icons/time.svg";
import { useContext, useReducer, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import { PostReducer, initialState } from "../reducers/PostReducer";
import axiosInstance from "../utils/axiosInstance";
import { getDateDifferenceFromNow } from "../utils/getDateDifferenceFromNow";

const PostHeader = ({ post }) => {
  const [state, dispatch] = useReducer(PostReducer, initialState);

  const { auth } = useContext(AuthContext);
  const isMe = post?.user?._id === auth?.user?._id;
  const [showAction, setShowAction] = useState(false);
  const { setIsEditable, isEditable } = useContext(PostContext);
  // const post = {
  //   userName: "Jane Doe",
  //   userAvatar: "path/to/avatar.jpg",
  //   postTime: "2 hours ago",
  //   location: "New York, NY", // Optional
  // };

  console.log("Post", post);
  // console.log("Auth", auth);

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/posts/${post._id}`, {
        headers: {
          User_ID: auth?.user?._id,
        },
      });
      if (res.status === 200) {
        dispatch({ type: "DELETE_POST" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="flex items-center p-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-xl shadow-lg">
      <div className="flex-shrink-0">
        <img
          className="w-14 h-14 rounded-full border-2 border-white shadow-md hover:shadow-lg transition-shadow duration-300"
          src={post.userAvatar}
          alt={`${post.userName}'s avatar`}
        />
      </div>
      <div className="ml-5 flex-grow relative">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            {post?.user?.username}
          </h2>
          {isMe && (
            <button
              className="text-white opacity-75 hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-1"
              onClick={() => setShowAction(!showAction)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center mt-2">
          <span className="text-sm text-white opacity-90">
            {getDateDifferenceFromNow(post?.createdAt)} ago
          </span>
          {post.location && (
            <>
              <span className="mx-2 text-white opacity-50">•</span>
              <span className="text-sm text-white opacity-90">
                {post.location}
              </span>
            </>
          )}
        </div>
        {showAction && (
          <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-md shadow-xl ring-1 ring-black ring-opacity-5 z-20 overflow-hidden">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150 ease-in-out"
                role="menuitem"
                onClick={() => setIsEditable(!isEditable)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>
              <button
                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150 ease-in-out"
                role="menuitem"
                onClick={handleDelete}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
