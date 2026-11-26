/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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

/*
========================================
GET AUTH CONFIG
========================================
*/

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

  // Login
  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(`${backendUrl}/api/auth/login`, loginData);

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      setLoginData({ password: "", email: "" });

      toast.success(res.data.message);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user details
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setToken(res.data.token);
      setUser(res.data.user);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
      // err.response?.data?.message || "Login Failed";
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

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      setSignupData({ fullName: "", email: "", password: "" });

      toast.success(res.data.message);

      navigate("/login");
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

  /*
========================================
GET PROFILE
========================================
*/

const getProfile = async () => {
  try {
    const res = await axios.get(
      `${backendUrl}/api/users/profile`,
      authConfig(),
    );

    if (res.data.success) {
      const updatedUser = res.data.user;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser),
      );

      setUser(updatedUser);

      return updatedUser;
    }
  } catch (error) {
    console.error("Get Profile Error:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to load profile.",
    );
  }
};


/*
========================================
UPDATE PROFILE
========================================
*/

const updateProfile = async (profileData) => {
  try {
    setLoading(true);

    const res = await axios.put(
      `${backendUrl}/api/users/profile`,
      profileData,
      authConfig(),
    );

    if (!res.data.success) {
      toast.error(res.data.message);
      return false;
    }

    const updatedUser = res.data.user;

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser),
    );

    setUser(updatedUser);

    toast.success(res.data.message);

    return true;
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to update profile.",
    );

    return false;
  } finally {
    setLoading(false);
  }
};


/*
========================================
CHANGE PASSWORD
========================================
*/

const changePassword = async (
  currentPassword,
  newPassword,
) => {
  try {
    setLoading(true);

    const res = await axios.put(
      `${backendUrl}/api/users/password`,
      {
        currentPassword,
        newPassword,
      },
      authConfig(),
    );

    if (!res.data.success) {
      toast.error(res.data.message);
      return false;
    }

    toast.success(res.data.message);

    return true;
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to update password.",
    );

    return false;
  } finally {
    setLoading(false);
  }
};


/*
========================================
UPLOAD PROFILE PICTURE
========================================
*/

const uploadProfilePicture = async (file) => {
  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("profile_picture", file);

    const res = await axios.post(
      `${backendUrl}/api/users/profile-picture`,
      formData,
      authConfig()
    );

    if (!res.data.success) {
      toast.error(res.data.message);
      return false;
    }

    // Update existing user details with the new image
    const updatedUser = {
      ...user,
      profile_picture_path: res.data.profile_picture_path,
      profile_picture_url: res.data.profile_picture_url,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    toast.success(res.data.message);

    return true;
  } catch (error) {
    console.error("Upload Profile Picture Error:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to upload profile picture."
    );

    return false;
  } finally {
    setLoading(false);
  }
};


/*
========================================
REMOVE PROFILE PICTURE
========================================
*/

const removeProfilePicture = async () => {
  try {
    setLoading(true);

    const res = await axios.delete(
      `${backendUrl}/api/users/profile-picture`,
      authConfig()
    );

    if (!res.data.success) {
      toast.error(res.data.message);
      return false;
    }

    // Clear profile picture from existing user details
    const updatedUser = {
      ...user,
      profile_picture_path: null,
      profile_picture_url: null,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    toast.success(res.data.message);

    return true;
  } catch (error) {
    console.error("Remove Profile Picture Error:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to remove profile picture."
    );

    return false;
  } finally {
    setLoading(false);
  }
};

/*
========================================
GET USER PREFERENCES
========================================
*/

const getUserPreferences = async () => {
  try {
    const res = await axios.get(
      `${backendUrl}/api/users/preferences`,
      authConfig()
    );

    if (res.data.success) {
      return res.data.preferences;
    }

    return null;
  } catch (error) {
    console.error("Get User Preferences Error:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to load user preferences."
    );

    return null;
  }
};


/*
========================================
UPDATE USER PREFERENCES
========================================
*/

const updateUserPreferences = async (preferences) => {
  try {
    const res = await axios.put(
      `${backendUrl}/api/users/preferences`,
      preferences,
      authConfig()
    );

    if (!res.data.success) {
      toast.error(res.data.message);
      return false;
    }

    return res.data.preferences;
  } catch (error) {
    console.error("Update User Preferences Error:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to save user preferences."
    );

    return false;
  }
};


const deleteAccount = async (currentPassword) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/api/users/account`,
      {
        ...authConfig(),
        data: { currentPassword },
      }
    );

    if (response.data.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setToken("");
      setUser(null);

      toast.success(response.data.message || "Account deleted successfully.");

      navigate("/login");

      return { success: true };
    }

    return {
      success: false,
      message: response.data.message || "Unable to delete account.",
    };
  } catch (error) {
    const message =
      error.response?.data?.message || "Unable to delete your account.";

    toast.error(message);

    return {
      success: false,
      message,
    };
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

getProfile,
updateProfile,
changePassword,

uploadProfilePicture,
removeProfilePicture,

getUserPreferences,
updateUserPreferences,

deleteAccount,

logout,

    navigate,
    domainName,
    toast,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
