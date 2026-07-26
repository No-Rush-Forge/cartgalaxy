import { Routes, Route, Navigate } from "react-router-dom";

import GlobalStyle from "./styles/GlobalStyle";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPassword";
import LandingPage from "./pages/Home"
import Dashboard from "./pages/Dashboard";
import StoreManagementPage from "./pages/Store";

function App() {
  return (
    <>
      <GlobalStyle />

      <Routes>
        {/* Redirect "/" to "/login" */}
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/store" element={<StoreManagementPage />} />

        {/* ERROR 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;