import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

const Logout = () => {
  const { setAuth, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("user");
      setAuth(null);
      dispatch({ type: "LOGOUT" });
      // Redirect to login page
      // navigate("/login");
    }
  };

  return (
    <button className="icon-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
