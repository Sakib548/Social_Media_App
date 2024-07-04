import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

const Logout = () => {
  const { setAuth, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setAuth({});
      dispatch({ type: "LOGOUT" }); // Assuming your reducer handles this action
      // Additional cleanup or redirection logic
    } catch (err) {
      console.error("Logout failed:", err);
      // Handle logout failure, e.g., display error message
    }
  };

  return (
    <button className="icon-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
