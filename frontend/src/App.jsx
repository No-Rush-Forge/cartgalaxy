import { Routes, Route, Navigate } from "react-router-dom";

import GlobalStyle from "./styles/GlobalStyle";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage"
import DashboardPage from "./pages/DashboardPage";
import StoreManagementPage from "./pages/StoreManagementPage";

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
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/store" element={<StoreManagementPage />} />

        {/* ERROR 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;