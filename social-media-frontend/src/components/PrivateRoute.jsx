// src/utils/PrivateRoute.js
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PostProvider } from "../context/PostContext";
import Navbar from "./Navbar.jsx";

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);
  // console.log("From Private Auth", auth?.user);
  //console.log("From Private Auth user", auth?.accessToken);

  return auth ? (
    <>
      <Navbar />
      <PostProvider>
        <Outlet />{" "}
      </PostProvider>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
