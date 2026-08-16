import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import AuthShell from "../components/AuthShell";
import CardHeader from "../components/CardHeader";
import FormField from "../components/FormField";
import PasswordField from "../components/PasswordField";
import SubmitButton from "../components/SubmitButton";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SignupPage = () => {

  const { signup, signupData, setSignupData, loading } = useContext(AuthContext)

  const navigate = useNavigate()

  return (
    <AuthShell topLinkLabel="Log in →" topLinkAction={() => navigate("/login")}>
      <div className="card" style={{ padding: 32 }}>
        <CardHeader
          eyebrow="Create workspace account"
          title="Create your account"
          subtitle="Set up access to your team's workspace."
        />
        <form onSubmit={signup} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 16,
            }}
          >
            <FormField
              id="signup-name"
              label="Full name"
              icon={User}
              placeholder="Enter your full name"
              value={signupData.fullName}
              autoComplete="name"
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  fullName: e.target.value,
                })
              }
            // onBlur={handleBlur("name")}

            />
          </div>
          <FormField
            id="signup-email"
            label="Email"
            icon={Mail}
            placeholder="Enter your email"
            value={signupData.email}
            autoComplete="email"
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          // onBlur={handleBlur("email")}

          />
          <PasswordField
            id="signup-password"
            label="Password"
            icon={Lock}
            placeholder="Create a password"
            value={signupData.password}
            autoComplete="new-password"
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          // onBlur={handleBlur("password")}

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
