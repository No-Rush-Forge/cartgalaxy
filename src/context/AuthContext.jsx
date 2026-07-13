/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");

  // Login
  const login = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/auth/login`,
        loginData
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        setToken(res.data.token);
        setUser(res.data.user);

        navigate("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Signup
  const signup = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/auth/signup`,
        signupData
      );

      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  const forgotPassword = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${backendUrl}/api/auth/forgot-password`,
        {
          email: forgotEmail,
        }
      );

      navigate("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    setToken("");
    setUser(null);

    navigate("/login");
  };

  const value = {
    backendUrl,

    user,
    setUser,

    token,
    setToken,

    loading,

    loginData,
    setLoginData,

    signupData,
    setSignupData,

    forgotEmail,
    setForgotEmail,

    login,
    signup,
    forgotPassword,
    logout,

    navigate,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};