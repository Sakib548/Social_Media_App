import React, { useContext, useEffect, useRef, useState } from "react";
import { PostContext } from "../context/PostContext";
import EditPost from "./EditPost";

// eslint-disable-next-line react/display-name
const PostBody = React.memo(({ post }) => {
  const { content, image } = post;
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const renderCount = useRef(0);
  const { isEditable } = useContext(PostContext);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`PostBody rendered ${renderCount.current} times`);

    if (image) {
      const baseUrl = import.meta.env.VITE_SERVER_BASE_URL.replace(/\/$/, "");
      const imageUrl = image ? `${baseUrl}/${image.replace(/^\//, "")}` : "";
      console.log(`Setting image URL: ${imageUrl}`);
      setImageUrl(imageUrl);
    }

    // Cleanup function
    return () => {
      console.log("PostBody unmounting");
    };
  }, [image]);

  const handleImageError = () => {
    console.error("Failed to load image:", imageUrl);
    setImageError(true);
  };

  return isEditable ? (
    <EditPost post={post} />
  ) : (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      <p className="mb-4">{content ?? "No Content Available"}</p>

      <div className="flex items-center justify-center overflow-hidden">
        {imageUrl && !imageError ? (
          <>
            <img
              className=" object-cover"
              width="400px"
              height="400px"
              src={imageUrl}
              alt="poster"
              onError={(e) => {
                console.error("Image load error:", e.target.error);
                handleImageError();
              }}
              onLoad={() => console.log("Image loaded successfully")}
            />
          </>
        ) : image ? (
          <p>Failed to load image</p>
        ) : null}
      </div>
    </div>
  );
});

export default PostBody;
