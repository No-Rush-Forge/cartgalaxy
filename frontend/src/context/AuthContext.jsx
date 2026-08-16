/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
  const domainName = import.meta.env.VITE_DOMAIN_NAME;

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");

  // Login
  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(`${backendUrl}/api/auth/login`, loginData);

      if (res.data.success) {
        setLoginData({ password: "", email: "" });

        // Save token
        localStorage.setItem("token", res.data.token);

        // Save user details
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setToken(res.data.token);
        setUser(res.data.user);

        // Navigate to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // Signup
  const signup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/auth/register`,
        signupData,
      );

      if (res.data.success) {
        setSignupData({ fullName: "", email: "", password: "" });

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

      await axios.post(`${backendUrl}/api/auth/forgot-password`, {
        email: forgotEmail,
      });

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
    localStorage.removeItem("user");

    setToken("");
    setUser(null);

    navigate("/login");
  };

  const value = {
    backendUrl,
    frontendUrl,

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
    domainName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
