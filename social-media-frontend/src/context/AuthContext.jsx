// src/context/AuthContext.js
import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "../reducers/AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        "/api/auth/token",
        {},
        { withCredentials: true }
      );
      dispatch({
        type: "REFRESH_TOKEN_SUCCESS",
        payload: res.data.accessToken,
      });
    } catch (err) {
      dispatch({ type: "REFRESH_TOKEN_FAILURE" });
    }
  };

  useEffect(() => {
    if (state.user) {
      const interval = setInterval(() => {
        refreshToken();
      }, 10 * 60 * 1000); // Refresh token every 10 minutes
      return () => clearInterval(interval);
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
