import { Routes, Route, Navigate } from "react-router-dom";

import GlobalStyle from "./styles/GlobalStyle";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPassword";
import LandingPage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StoreManagementPage from "./pages/Store";
import StoreFront from "./pages/StoreFront";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { Profile } from "./pages/Profile";
import { Subscriptions } from "./pages/Subscriptions";
import { Orders } from "./pages/Orders";

function App() {
  return (
    <>
      <GlobalStyle />

      <Routes>
        {/* Redirect "/" to "/login" */}
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store"
          element={
            <ProtectedRoute>
              <StoreManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store/*"
          element={
            <ProtectedRoute>
              <StoreFront />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscriptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* ERROR 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
