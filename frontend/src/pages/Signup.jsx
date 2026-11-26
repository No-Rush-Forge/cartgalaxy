import { useContext } from "react";
import { User, Mail, Lock, AlertCircle } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import AuthShell from "@/components/auth/AuthShell";
import CardHeader from "@/components/auth/CardHeader";
import FormField from "@/components/auth/FormField";
import PasswordField from "@/components/auth/PasswordField";
import SubmitButton from "@/components/auth/SubmitButton";

export function Signup() {
  const { signupData, setSignupData, submitError, loading, signup, navigate } = useContext(AuthContext);

  return (
    <AuthShell topLinkLabel="Log in →" topLinkAction={() => navigate("/login")}>
      <Card className="p-8">
        <CardHeader
          eyebrow="Create your workspace"
          title="Get started with CartGalaxy"
          subtitle="Set up your account in under a minute."
        />

        <form onSubmit={signup} className="flex flex-col gap-5">
          <FormField
            id="signup-name"
            label="Full Name"
            icon={User}
            placeholder="Enter your full name"
            value={signupData.fullName}
            autoComplete="name"
            onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
          />

          <FormField
            id="signup-email"
            label="Email"
            icon={Mail}
            placeholder="Enter your email"
            value={signupData.email}
            autoComplete="email"
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          />

          <PasswordField
            id="signup-password"
            label="Password"
            icon={Lock}
            placeholder="Create a password"
            value={signupData.password}
            autoComplete="new-password"
            helperText="Use at least 8 characters, including a number."
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          />

          {submitError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <SubmitButton loading={loading} loadingLabel="Creating account…">
            Create account
          </SubmitButton>
        </form>
      </Card>

      <p className="mt-5 text-center text-sm text-ink-light dark:text-paper/65">
        Already have an account?{" "}
        <button
          className="font-semibold text-teal-600 hover:underline dark:text-teal-100"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </p>
    </AuthShell>
  );
}
