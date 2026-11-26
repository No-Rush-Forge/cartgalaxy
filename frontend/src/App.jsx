import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GlobalStyle from "./styles/GlobalStyle";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";
import LandingPage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StoreManagementPage from "./pages/Store";
import StoreFront from "./pages/StoreFront";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { Profile } from "./pages/Profile";
import { Subscriptions } from "./pages/Subscriptions";
import { Orders } from "./pages/Orders";

import { AdminOverview } from "@/pages/Admin/AdminOverview";
import { AdminUsers } from "@/pages/Admin/AdminUsers";
import { AdminStores } from "@/pages/Admin/AdminStores";
import { AdminSubscriptions } from "@/pages/Admin/AdminSubscriptions";
import { AdminActivity } from "@/pages/Admin/AdminActivity";
import { AdminSettings } from "@/pages/Admin/AdminSettings";

import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <>
      <Toaster />
      <GlobalStyle />

      <Routes>
        {/* Redirect "/" to "/login" */}
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
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

        {/*
                  Admin Panel — gated behind the existing ProtectedRoute (must be signed in)
                  only. There is no role-based AdminRoute yet since AuthContext doesn't carry
                  a role/permission model. Add that check here once the backend exposes it —
                  do not treat ProtectedRoute alone as real admin authorization.
                */}
{/* =========================
    ADMIN ROUTES
========================= */}

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminOverview />
    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminUsers />
    </AdminRoute>
  }
/>

<Route
  path="/admin/stores"
  element={
    <AdminRoute>
      <AdminStores />
    </AdminRoute>
  }
/>

<Route
  path="/admin/subscriptions"
  element={
    <AdminRoute>
      <AdminSubscriptions />
    </AdminRoute>
  }
/>

<Route
  path="/admin/activity"
  element={
    <AdminRoute>
      <AdminActivity />
    </AdminRoute>
  }
/>

<Route
  path="/admin/settings"
  element={
    <AdminRoute>
      <AdminSettings />
    </AdminRoute>
  }
/>

        {/* ERROR 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
