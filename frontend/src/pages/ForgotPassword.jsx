import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import AuthShell from "../components/AuthShell";
import CardHeader from "../components/CardHeader";
import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";
import SuccessBox from "../components/SuccessBox";
import { validateEmail } from "../utils/validators";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateEmail(email);
    setError(err);
    if (err) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1100);
  };

  return (
    <AuthShell topLinkLabel="Log in →" topLinkAction={() => navigate("/login")}>
      <div className="card" style={{ padding: 32 }}>
        <CardHeader
          eyebrow="Account recovery"
          title="Reset your password"
          subtitle="Enter the email on your account and we'll send a reset link."
        />

        {sent ? (
          <SuccessBox title="Reset link sent">
            A password reset link has been sent to <span style={{ color: "var(--ink-0)" }}>{email}</span>.
          </SuccessBox>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <FormField
              id="forgot-email"
              label="Email address"
              icon={Mail}
              placeholder="Enter your registered email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setError(validateEmail(email))}
              error={error}
            />
            <SubmitButton loading={loading} loadingLabel="Sending link…">
              Send reset link
            </SubmitButton>
          </form>
        )}
      </div>
      <p style={{ textAlign: "center", fontSize: 13, marginTop: 22 }}>
        <button
          className="text-link"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ink-1)" }}
          onClick={() => navigate("/login")}
        >
          <ArrowLeft size={13} />
          Back to login
        </button>
      </p>
    </AuthShell>
  );
};

export default ForgotPasswordPage;
