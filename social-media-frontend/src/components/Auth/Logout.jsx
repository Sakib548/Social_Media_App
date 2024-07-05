import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

const Logout = () => {
  const { setAuth, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("user");
      setAuth(null);
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear local state even if server request fails
      localStorage.removeItem("user");
      setAuth(null);
      dispatch({ type: "LOGOUT" });
    }
  };

  return (
    <button className="icon-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
