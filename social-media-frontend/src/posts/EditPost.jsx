import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import { PostReducer, initialState } from "../reducers/PostReducer";
import axiosInstance from "../utils/axiosInstance";
import AddPhoto from "/icons/addPhoto.svg";

const EditPost = ({ post }) => {
  //console.log(post);
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL.replace(/\/$/, "");
  const initialImageUrl = post.image
    ? `${baseUrl}/${post.image.replace(/^\//, "")}`
    : "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      editPostContent: post.content,
      editImage: initialImageUrl,
    },
  });
  const [state, dispatch] = useReducer(PostReducer, initialState);
  const watchEditImage = watch("editImage");

  const onEditSubmit = async (data) => {
    const formData = new FormData();
    formData.append("editPostContent", data.editPostContent);
    if (data.editImage instanceof File) {
      formData.append("editImage", data.editImage);
    }
    console.log("Editing post:", formData);

    // Send formData to your API for editing the post
    try {
      //  const response = await api.patch(
      //    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
      //    { bio }
      //  );
      const res = await axiosInstance.patch(`/posts/${post._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        dispatch({ type: "EDIT_POST", data: res.data });
      }
    } catch (error) {
      console.error(
        "Error Editing post:",
        error.response?.data || error.message
      );
      dispatch({
        type: "POST_FETCH_ERROR",
        data: error.response?.data || "An error occurred",
      });
    }
  };

  const getImageSrc = () => {
    if (!watchEditImage) return null;
    if (typeof watchEditImage === "string") return watchEditImage;
    if (watchEditImage instanceof File)
      return URL.createObjectURL(watchEditImage);
    return null;
  };

  return (
    <form onSubmit={handleSubmit(onEditSubmit)}>
      <div className="mb-4">
        <textarea
          {...register("editPostContent", {
            required: "Please enter something",
          })}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          rows="4"
          placeholder="Edit your post..."
        ></textarea>
        {errors.editPostContent && <div>{errors.editPostContent.message}</div>}
      </div>

      <div className="flex items-center justify-center overflow-hidden">
        {watchEditImage && (
          <img
            className="object-cover"
            width="400px"
            height="400px"
            src={getImageSrc()}
            alt="Edit post image"
            onError={(e) => {
              console.error("Edit image load error:", e.target.error);
            }}
            onLoad={() => console.log("Edit image loaded successfully")}
          />
        )}
      </div>

      <label
        className="btn-primary cursor-pointer !text-gray-100"
        htmlFor="editImage"
      >
        <img src={AddPhoto} alt="Edit Photo" />
        Edit Photo
      </label>
      <input
        type="file"
        id="editImage"
        className="hidden"
        {...register("editImage")}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setValue("editImage", e.target.files[0]);
          }
        }}
      />
      <input type="submit" value="Save Edit" />
    </form>
  );
};

export default EditPost;
