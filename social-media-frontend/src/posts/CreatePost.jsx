import { useContext, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import { PostReducer, initialState } from "../reducers/PostReducer";
import axiosInstance from "../utils/axiosInstance";
const CreatePost = () => {
  //const [error, setError] = useState({ email: "", password: "" });
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [post, setPost] = useState({ postContent: "", image: null });
  const { message } = useContext(PostContext);
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const { auth } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = auth?.user?._id;
  console.log(user);
  // const handlePostSubmit = async (formData) => {
  //   dispatch({ type: "POST_DATA_FETCHING" });
  //   console.log("FormData", formData);
  //   try {
  //     const res = await axiosInstance.post("/posts", {
  //       user: user,
  //       content: formData.postContent,
  //       image: formData.image,
  //       // Add other fields as necessary
  //     });
  //     if (res.status === 200) {
  //       dispatch({ type: "POST_CREATED", data: res.data });
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error creating post:",
  //       error.response?.data || error.message
  //     );
  //     dispatch({
  //       type: "POST_FETCH_ERROR",
  //       data: error.response?.data || "An error occurred",
  //     });
  //   }
  // };

  const handlePostSubmit = async (formData) => {
    dispatch({ type: "POST_DATA_FETCHING" });

    const postData = new FormData();
    postData.append("content", formData.postContent);
    postData.append("user", user);
    if (formData.image && formData.image.length > 0) {
      postData.append("image", formData.image[0]);
    }

    try {
      const res = await axiosInstance.post("/posts", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        dispatch({ type: "POST_CREATED", data: res.data });
      }
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      dispatch({
        type: "POST_FETCH_ERROR",
        data: error.response?.data || "An error occurred",
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      // setImage(selectedImage);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit(handlePostSubmit)}
      className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <textarea
          {...register("postContent", { required: "Please Enter something" })}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          rows="4"
          placeholder="What's on your mind?"
          value={postContent}
          id="postContent"
          name="postContent"
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        {errors.postContent && <div>Please Post something</div>}
      </div>

      <div className="mb-4 flex justify-end">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="image"
        >
          Add an image
        </label>
        <input
          {...register("image")}
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      {imagePreview && (
        <div className="mb-4 relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-full h-auto rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;
