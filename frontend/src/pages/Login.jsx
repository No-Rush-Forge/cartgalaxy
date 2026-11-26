import { useContext } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import AuthShell from "@/components/auth/AuthShell";
import CardHeader from "@/components/auth/CardHeader";
import FormField from "@/components/auth/FormField";
import PasswordField from "@/components/auth/PasswordField";
import SubmitButton from "@/components/auth/SubmitButton";

export function Login() {
  const { loginData, setLoginData, submitError, loading, login, navigate } =
    useContext(AuthContext);

  return (
    <AuthShell
      topLinkLabel="Sign up →"
      topLinkAction={() => navigate("/signup")}
    >
      <Card className="p-8">
        <CardHeader
          eyebrow="Workspace sign in"
          title="Welcome back"
          subtitle="Sign in to continue to your workspace."
        />

        <form onSubmit={login} className="flex flex-col gap-5">
          <FormField
            id="login-email"
            label="Email"
            icon={Mail}
            placeholder="Enter your email"
            value={loginData.email}
            autoComplete="email"
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />

          <div>
            <PasswordField
              id="login-password"
              label="Password"
              icon={Lock}
              placeholder="Enter your password"
              value={loginData.password}
              autoComplete="current-password"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <div className="mt-2 text-right">
              <button
                type="button"
                className="text-xs font-semibold text-teal-600 hover:underline dark:text-teal-100"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>
          </div>

          {submitError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <SubmitButton loading={loading} loadingLabel="Signing in…">
            Log in
          </SubmitButton>
        </form>
      </Card>

      <p className="mt-5 text-center text-sm text-ink-light dark:text-paper/65">
        Don't have an account?{" "}
        <button
          className="font-semibold text-teal-600 hover:underline dark:text-teal-100"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </p>
    </AuthShell>
  );
}
