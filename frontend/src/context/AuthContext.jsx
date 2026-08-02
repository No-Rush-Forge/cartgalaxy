/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const domainName = import.meta.env.VITE_DOMAIN_NAME;

  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
);
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
  // const login = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await axios.post(
  //       `${backendUrl}/api/auth/login`,
  //       loginData
  //     );

  //     if (res.data.success) {
  //       localStorage.setItem("token", res.data.token);

  //       setToken(res.data.token);
  //       setUser(res.data.user);

  //       navigate("/");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const login = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await axios.post(
      `${backendUrl}/api/auth/login`,
      loginData
    );

    if (res.data.success) {
      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user details
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setToken(res.data.token);
      setUser(res.data.user);

      // Navigate to dashboard
      navigate("/dashboard");
    }

  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.message ||
      "Login Failed"
    );

  } finally {
    setLoading(false);
  }
};

  // Signup
  const signup = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/auth/register`,
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
    domainName
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};