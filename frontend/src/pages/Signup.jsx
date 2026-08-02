import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import AuthShell from "../components/AuthShell";
import CardHeader from "../components/CardHeader";
import FormField from "../components/FormField";
import PasswordField from "../components/PasswordField";
import SubmitButton from "../components/SubmitButton";

import axios from "axios";

import {
  validateName,
  validateEmail,
  validateSignupPassword,
} from "../utils/validators";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SignupPage = () => {

  const { backendUrl } = useContext(AuthContext)

  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // const validators = {
  //   name: validateName,
  //   email: validateEmail,
  //   password: validateSignupPassword,
  // };

  // const handleBlur = (field) => () => {
  //   setErrors((e) => ({ ...e, [field]: validators[field](values[field]) }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      password: validateSignupPassword(values.password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setSubmitted(true);
      return
    };

    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/api/auth/register`, {
        fullName: values.name,
        email: values.email,
        password: values.password,
      })

      if (!res.data.success) {
        console.error(res.data.message)
      }

      console.log(res.data);

      // // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    } finally {
      setLoading(false);
    }
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
~
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
              value={values.name}
              autoComplete="name"
              onChange={(e) =>
                setValues((v) => ({ ...v, name: e.target.value }))
              }
              // onBlur={handleBlur("name")}
              error={errors.name}
            />
          </div>
          <FormField
            id="signup-email"
            label="Email"
            icon={Mail}
            placeholder="Enter your email"
            value={values.email}
            autoComplete="email"
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            // onBlur={handleBlur("email")}
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
            // onBlur={handleBlur("password")}
            error={errors.password}
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
