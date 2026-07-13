import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import AuthShell from "../components/AuthShell";
import CardHeader from "../components/CardHeader";
import FormField from "../components/FormField";
import PasswordField from "../components/PasswordField";
import SubmitButton from "../components/SubmitButton";
import {
  validateName,
  validateEmail,
  validateSignupPassword,
  validateConfirm,
} from "../utils/validators";

const SignupPage = () => {
   const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validators = {
    name: validateName,
    email: validateEmail,
    password: validateSignupPassword,
    confirm: (v) => validateConfirm(values.password, v),
  };

  const handleBlur = (field) => () => {
    setErrors((e) => ({ ...e, [field]: validators[field](values[field]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      password: validateSignupPassword(values.password),
      confirm: validateConfirm(values.password, values.confirm),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Placeholder success path — wire up to real auth here.
    }, 1200);
  };

  return (
    <AuthShell topLinkLabel="Log in →" topLinkAction={() => navigate("/login")}>
      <div className="card" style={{ padding: 32 }}>
        <CardHeader
          eyebrow="Create workspace account"
          title="Create your account"
          subtitle="Set up access to your team's workspace."
        />
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <FormField
            id="signup-name"
            label="Full name"
            icon={User}
            placeholder="Enter your full name"
            value={values.name}
            autoComplete="name"
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            onBlur={handleBlur("name")}
            error={errors.name}
          />
          <FormField
            id="signup-email"
            label="Email"
            icon={Mail}
            placeholder="Enter your email"
            value={values.email}
            autoComplete="email"
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            onBlur={handleBlur("email")}
            error={errors.email}
          />
          <PasswordField
            id="signup-password"
            label="Password"
            icon={Lock}
            placeholder="Create a password"
            value={values.password}
            autoComplete="new-password"
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            onBlur={handleBlur("password")}
            error={errors.password}
          />
          <PasswordField
            id="signup-confirm"
            label="Confirm password"
            icon={Lock}
            placeholder="Re-enter your password"
            value={values.confirm}
            autoComplete="new-password"
            onChange={(e) => setValues((v) => ({ ...v, confirm: e.target.value }))}
            onBlur={handleBlur("confirm")}
            error={errors.confirm}
          />

          <p style={{ fontSize: 11.5, color: "var(--ink-2)", margin: "-8px 0 0", lineHeight: 1.5 }}>
            Use 8+ characters with a mix of uppercase, lowercase, a number, and a symbol.
          </p>

          <SubmitButton loading={loading} loadingLabel="Creating account…">
            Create account
          </SubmitButton>
        </form>
      </div>
      <p style={{ textAlign: "center", fontSize: 13, color: "var(--ink-1)", marginTop: 22 }}>
        Already have an account?{" "}
        <button className="text-link" onClick={() => navigate("/login")}>
          Log in
        </button>
      </p>
    </AuthShell>
  );
};

export default SignupPage;
