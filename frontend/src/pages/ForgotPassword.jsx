import { useContext } from "react";
import { Mail, AlertCircle } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import AuthShell from "@/components/auth/AuthShell";
import CardHeader from "@/components/auth/CardHeader";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import SuccessBox from "@/components/auth/SuccessBox";

export function ForgotPassword() {
  const { forgotEmail, setForgotEmail, submitError, loading, resetSent, requestPasswordReset, navigate } =
    useContext(AuthContext);

  return (
    <AuthShell topLinkLabel="Log in →" topLinkAction={() => navigate("/login")}>
      <Card className="p-8">
        <CardHeader
          eyebrow="Account recovery"
          title="Reset your password"
          subtitle="Enter your email and we'll send you a reset link."
        />

        {resetSent ? (
          <SuccessBox>
            If an account exists for <strong>{forgotEmail}</strong>, a password reset link is on its way.
          </SuccessBox>
        ) : (
          <form onSubmit={requestPasswordReset} className="flex flex-col gap-5">
            <FormField
              id="forgot-email"
              label="Email"
              icon={Mail}
              placeholder="Enter your email"
              value={forgotEmail}
              autoComplete="email"
              onChange={(e) => setForgotEmail(e.target.value)}
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

            <SubmitButton loading={loading} loadingLabel="Sending…">
              Send reset link
            </SubmitButton>
          </form>
        )}
      </Card>

      <p className="mt-5 text-center text-sm text-ink-light dark:text-paper/65">
        Remembered your password?{" "}
        <button
          className="font-semibold text-teal-600 hover:underline dark:text-teal-100"
          onClick={() => navigate("/login")}
        >
          Back to login
        </button>
      </p>
    </AuthShell>
  );
}
