import { useContext, useEffect } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

import AuthShell from "../components/AuthShell";
import CardHeader from "../components/CardHeader";
import FormField from "../components/FormField";
import PasswordField from "../components/PasswordField";
import SubmitButton from "../components/SubmitButton";

import { validateEmail } from "../utils/validators";

const LoginPage = () => {
  const {
    loginData,
    setLoginData,
    // loginErrors,
    submitError,
    loading,
    login,
    navigate,
  } = useContext(AuthContext);

  useEffect(() => {
    console.log(loginData)
  }, [loginData])

  return (
    <AuthShell
      topLinkLabel="Sign up →"
      topLinkAction={() => navigate("/signup")}
    >
      <div className="card" style={{ padding: 32 }}>
        <CardHeader
          eyebrow="Workspace sign in"
          title="Welcome back"
          subtitle="Sign in to continue to your workspace."
        />

        <form
          onSubmit={login}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <FormField
            id="login-email"
            label="Email"
            icon={Mail}
            placeholder="Enter your email"
            value={loginData.email}
            autoComplete="email"
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
            // onBlur={validateEmail(loginData.email)}
            error={validateEmail(loginData.email)}
          />

          <div>
            <PasswordField
              id="login-password"
              label="Password"
              icon={Lock}
              placeholder="Enter your password"
              // value={loginData.password}
              autoComplete="current-password"
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            // onBlur={handleLoginBlur("password")}
            // error={loginErrors.password}
            />

            <div
              style={{
                textAlign: "right",
                marginTop: 9,
              }}
            >
              <button
                type="button"
                className="text-link"
                style={{ fontSize: 12.5 }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>
          </div>

          {submitError && (
            <div className="err-msg" role="alert">
              <AlertCircle size={13} />
              <span>{submitError}</span>
            </div>
          )}

          <SubmitButton
            loading={loading}
            loadingLabel="Signing in…"
          >
            Log in
          </SubmitButton>
        </form>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "var(--ink-1)",
          marginTop: 22,
        }}
      >
        Don't have an account?{" "}
        <button
          className="text-link"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </p>
    </AuthShell>
  );
};

export default LoginPage;