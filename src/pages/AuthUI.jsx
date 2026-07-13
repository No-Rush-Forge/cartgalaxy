import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

/* ------------------------------------------------------------------
   Design tokens
   Palette:
     --bg-0   #0d0f13  page base
     --bg-1   #171a21  card surface
     --bg-2   #1e2229  input surface
     --line   #2a2e37  hairline borders
     --line-2 #363b46  hover borders
     --ink-0  #eceef1  primary text
     --ink-1  #9ba0ac  secondary text
     --ink-2  #676c78  tertiary / placeholder
     --amber  #d99a4e  accent (signature)
     --amber-hi #eab06a hover accent
     --amber-dim rgba(217,154,78,0.12)
     --green  #3ecf8e  success
     --red    #e5636a  error
   Type: Inter (display/body), JetBrains Mono (eyebrow/labels/meta)
------------------------------------------------------------------- */

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    .auth-root {
      --bg-0:#0d0f13; --bg-1:#171a21; --bg-2:#1e2229;
      --line:#2a2e37; --line-2:#363b46;
      --ink-0:#eceef1; --ink-1:#9ba0ac; --ink-2:#676c78;
      --amber:#d99a4e; --amber-hi:#eab06a; --amber-dim:rgba(217,154,78,0.14);
      --green:#3ecf8e; --red:#e5636a;
      font-family:'Inter',ui-sans-serif,system-ui,sans-serif;
      min-height:100vh;
      width:100%;
      position:relative;
      background:
        radial-gradient(1100px 520px at 15% -8%, rgba(217,154,78,0.07), transparent 60%),
        radial-gradient(900px 500px at 100% 100%, rgba(217,154,78,0.04), transparent 55%),
        linear-gradient(160deg, #14161c 0%, #101217 45%, #0b0d11 100%);
      color:var(--ink-0);
      overflow:hidden;
    }
    .auth-grid {
      position:absolute; inset:0;
      background-image:
        linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 42px 42px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%);
      pointer-events:none;
    }
    .mono { font-family:'JetBrains Mono', ui-monospace, monospace; }
    .eyebrow {
      font-family:'JetBrains Mono', ui-monospace, monospace;
      font-size:11px; letter-spacing:0.14em; text-transform:uppercase;
      color:var(--ink-2);
    }
    .field-label {
      font-family:'JetBrains Mono', ui-monospace, monospace;
      font-size:11px; letter-spacing:0.09em; text-transform:uppercase;
      color:var(--ink-1);
    }
    .top-link {
      color:var(--ink-1);
      transition:color .18s ease;
    }
    .top-link:hover { color:var(--ink-0); }

    .card {
      background:var(--bg-1);
      border:1px solid var(--line);
      border-radius:14px;
      box-shadow: 0 1px 0 rgba(255,255,255,0.03) inset, 0 20px 50px -20px rgba(0,0,0,0.6);
      position:relative;
      overflow:hidden;
      animation: card-in .5s cubic-bezier(.16,1,.3,1);
    }
    .card::before {
      content:'';
      position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg, transparent, var(--amber), transparent);
      opacity:.85;
    }
    @keyframes card-in {
      from { opacity:0; transform:translateY(10px) scale(.985); }
      to { opacity:1; transform:translateY(0) scale(1); }
    }

    .logo-mark {
      width:34px; height:34px; border-radius:8px;
      background:linear-gradient(155deg, var(--amber), #b97a34);
      display:flex; align-items:center; justify-content:center;
      font-family:'JetBrains Mono', monospace; font-weight:600; font-size:14px;
      color:#0d0f13;
      box-shadow: 0 6px 16px -4px rgba(217,154,78,0.45);
    }

    .input-shell {
      display:flex; align-items:center; gap:10px;
      background:var(--bg-2);
      border:1px solid var(--line);
      border-radius:9px;
      padding:0 12px;
      transition: border-color .16s ease, box-shadow .16s ease, background .16s ease;
    }
    .input-shell:hover { border-color:var(--line-2); }
    .input-shell.focused {
      border-color:var(--amber);
      box-shadow:0 0 0 3px var(--amber-dim);
      background:#20242c;
    }
    .input-shell.error {
      border-color:var(--red);
      box-shadow:0 0 0 3px rgba(229,72,77,0.12);
    }
    .input-shell input {
      background:transparent; border:none; outline:none;
      color:var(--ink-0); font-size:14px; width:100%;
      padding:11px 2px; font-family:'Inter',sans-serif;
    }
    .input-shell input::placeholder { color:var(--ink-2); }
    .icon-btn {
      color:var(--ink-2); transition:color .15s ease; cursor:pointer;
      display:flex; align-items:center; background:none; border:none; padding:0;
    }
    .icon-btn:hover { color:var(--ink-1); }

    .err-msg {
      display:flex; align-items:center; gap:6px;
      font-size:12.5px; color:var(--red); margin-top:6px;
      animation: fade-down .16s ease;
    }
    @keyframes fade-down {
      from { opacity:0; transform:translateY(-3px); }
      to { opacity:1; transform:translateY(0); }
    }

    .btn-primary {
      width:100%;
      background:linear-gradient(160deg, var(--amber-hi), var(--amber));
      color:#181008;
      font-weight:600; font-size:14.5px;
      border:none; border-radius:9px;
      padding:12px 16px;
      display:flex; align-items:center; justify-content:center; gap:8px;
      cursor:pointer;
      transition:filter .15s ease, transform .12s ease, box-shadow .15s ease;
      box-shadow:0 8px 20px -8px rgba(217,154,78,0.55);
    }
    .btn-primary:hover:not(:disabled) { filter:brightness(1.08); transform:translateY(-1px); }
    .btn-primary:active:not(:disabled) { transform:translateY(0); }
    .btn-primary:disabled { opacity:.75; cursor:default; }
    .btn-primary:focus-visible, .input-shell input:focus-visible, .top-link:focus-visible, .icon-btn:focus-visible, .text-link:focus-visible {
      outline:2px solid var(--amber); outline-offset:2px;
    }

    .text-link {
      color:var(--amber); font-weight:500; cursor:pointer;
      background:none; border:none; padding:0; font-size:inherit;
      font-family:inherit;
      transition:color .15s ease;
    }
    .text-link:hover { color:var(--amber-hi); text-decoration:underline; }

    .divider-line { height:1px; background:var(--line); }

    .page-transition {
      animation: page-in .38s cubic-bezier(.16,1,.3,1);
    }
    @keyframes page-in {
      from { opacity:0; transform:translateY(6px); }
      to { opacity:1; transform:translateY(0); }
    }

    .success-box {
      background:rgba(62,207,142,0.08);
      border:1px solid rgba(62,207,142,0.3);
      border-radius:9px;
      padding:14px;
      display:flex; gap:10px; align-items:flex-start;
      animation: fade-down .2s ease;
    }

    @media (prefers-reduced-motion: reduce) {
      .card, .page-transition, .err-msg, .success-box { animation:none !important; }
      .btn-primary:hover:not(:disabled) { transform:none; }
    }
  `}</style>
);

/* ------------------------------------------------------------------
   Validation helpers
------------------------------------------------------------------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PW_UPPER = /[A-Z]/;
const PW_LOWER = /[a-z]/;
const PW_NUM = /[0-9]/;
const PW_SPECIAL = /[^A-Za-z0-9]/;

function validateEmail(v) {
  if (!v.trim()) return "Email is required.";
  if (!EMAIL_RE.test(v.trim())) return "Enter a valid email address.";
  return "";
}

function validateLoginPassword(v) {
  if (!v) return "Password is required.";
  if (v.length < 8) return "Password must be at least 8 characters.";
  return "";
}

function validateSignupPassword(v) {
  if (!v) return "Password is required.";
  if (v.length < 8) return "Use at least 8 characters.";
  if (!PW_UPPER.test(v)) return "Include one uppercase letter.";
  if (!PW_LOWER.test(v)) return "Include one lowercase letter.";
  if (!PW_NUM.test(v)) return "Include one number.";
  if (!PW_SPECIAL.test(v)) return "Include one special character.";
  return "";
}

function validateConfirm(pw, confirm) {
  if (!confirm) return "Please confirm your password.";
  if (pw !== confirm) return "Passwords do not match.";
  return "";
}

function validateName(v) {
  if (!v.trim()) return "Full name is required.";
  return "";
}

/* ------------------------------------------------------------------
   Reusable input component
------------------------------------------------------------------- */
const FormField = ({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  rightAdornment,
  autoComplete,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="field-label" style={{ display: "block", marginBottom: 7 }}>
        {label}
      </label>
      <div className={`input-shell ${focused ? "focused" : ""} ${error ? "error" : ""}`}>
        <Icon size={16} color={error ? "var(--red)" : focused ? "var(--amber)" : "var(--ink-2)"} style={{ flexShrink: 0 }} />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(e);
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {rightAdornment}
      </div>
      {error && (
        <div className="err-msg" id={`${id}-error`} role="alert">
          <AlertCircle size={13} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

const PasswordField = (props) => {
  const [show, setShow] = useState(false);
  return (
    <FormField
      {...props}
      type={show ? "text" : "password"}
      rightAdornment={
        <button
          type="button"
          className="icon-btn"
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((s) => !s)}
          tabIndex={0}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    />
  );
};

/* ------------------------------------------------------------------
   Shell: logo + eyebrow + top-right nav link
------------------------------------------------------------------- */
const AuthShell = ({ children, topLinkLabel, topLinkAction }) => (
  <div className="auth-root">
    <div className="auth-grid" />
    <div style={{ position: "absolute", top: 24, left: 28, display: "flex", alignItems: "center", gap: 10, zIndex: 2 }}>
      <div className="logo-mark">A</div>
      <span className="eyebrow" style={{ color: "var(--ink-1)" }}>Acme Cloud</span>
    </div>
    {topLinkLabel && (
      <button
        onClick={topLinkAction}
        className="top-link mono"
        style={{
          position: "absolute",
          top: 26,
          right: 28,
          zIndex: 2,
          fontSize: 13,
          background: "none",
          border: "1px solid var(--line)",
          borderRadius: 7,
          padding: "7px 14px",
          cursor: "pointer",
        }}
      >
        {topLinkLabel}
      </button>
    )}
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "88px 20px 40px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ width: "100%", maxWidth: 408 }} className="page-transition">
        {children}
      </div>
    </div>
  </div>
);

const CardHeader = ({ eyebrow, title, subtitle }) => (
  <div style={{ marginBottom: 26 }}>
    <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>
    <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.01em", color: "var(--ink-0)" }}>
      {title}
    </h1>
    {subtitle && (
      <p style={{ fontSize: 13.5, color: "var(--ink-1)", margin: "8px 0 0", lineHeight: 1.5 }}>{subtitle}</p>
    )}
  </div>
);

/* ------------------------------------------------------------------
   Login Page
------------------------------------------------------------------- */
const LoginPage = ({ navigate }) => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleBlur = (field, validator) => () => {
    setErrors((e) => ({ ...e, [field]: validator(values[field]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailErr = validateEmail(values.email);
    const pwErr = validateLoginPassword(values.password);
    setErrors({ email: emailErr, password: pwErr });
    setSubmitError("");
    if (emailErr || pwErr) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitError("");
      // Placeholder success path — wire up to real auth here.
    }, 1200);
  };

  return (
    <AuthShell topLinkLabel="Sign up →" topLinkAction={() => navigate("signup")}>
      <div className="card" style={{ padding: 32 }}>
        <CardHeader
          eyebrow="Workspace sign in"
          title="Welcome back"
          subtitle="Sign in to continue to your workspace."
        />
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <FormField
            id="login-email"
            label="Email"
            icon={Mail}
            placeholder="Enter your email"
            value={values.email}
            autoComplete="email"
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            onBlur={handleBlur("email", validateEmail)}
            error={errors.email}
          />
          <div>
            <PasswordField
              id="login-password"
              label="Password"
              icon={Lock}
              placeholder="Enter your password"
              value={values.password}
              autoComplete="current-password"
              onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
              onBlur={handleBlur("password", validateLoginPassword)}
              error={errors.password}
            />
            <div style={{ textAlign: "right", marginTop: 9 }}>
              <button type="button" className="text-link" style={{ fontSize: 12.5 }} onClick={() => navigate("/forgot-password")}>
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

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={16} className="spin" style={{ animation: "spin 0.8s linear infinite" }} />
                Signing in…
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
      <p style={{ textAlign: "center", fontSize: 13, color: "var(--ink-1)", marginTop: 22 }}>
        Don&apos;t have an account?{" "}
        <button className="text-link" onClick={() => navigate("signup")}>
          Sign up
        </button>
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AuthShell>
  );
};

/* ------------------------------------------------------------------
   Sign Up Page
------------------------------------------------------------------- */
const SignupPage = ({ navigate }) => {
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
    <AuthShell topLinkLabel="Log in →" topLinkAction={() => navigate("login")}>
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

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>
      </div>
      <p style={{ textAlign: "center", fontSize: 13, color: "var(--ink-1)", marginTop: 22 }}>
        Already have an account?{" "}
        <button className="text-link" onClick={() => navigate("login")}>
          Log in
        </button>
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AuthShell>
  );
};

/* ------------------------------------------------------------------
   Forgot Password Page
------------------------------------------------------------------- */
const ForgotPasswordPage = ({ navigate }) => {
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
    <AuthShell topLinkLabel="Log in →" topLinkAction={() => navigate("login")}>
      <div className="card" style={{ padding: 32 }}>
        <CardHeader
          eyebrow="Account recovery"
          title="Reset your password"
          subtitle="Enter the email on your account and we'll send a reset link."
        />

        {sent ? (
          <div className="success-box" role="status">
            <CheckCircle2 size={18} color="var(--green)" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-0)", fontWeight: 500 }}>
                Reset link sent
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ink-1)", lineHeight: 1.5 }}>
                A password reset link has been sent to <span style={{ color: "var(--ink-0)" }}>{email}</span>.
              </p>
            </div>
          </div>
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
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />
                  Sending link…
                </>
              ) : (
                "Send reset link"
              )}
            </button>
          </form>
        )}
      </div>
      <p style={{ textAlign: "center", fontSize: 13, marginTop: 22 }}>
        <button
          className="text-link"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ink-1)" }}
          onClick={() => navigate("login")}
        >
          <ArrowLeft size={13} />
          Back to login
        </button>
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AuthShell>
  );
};

/* ------------------------------------------------------------------
   Router
   React Router isn't available in this sandbox, so this implements
   equivalent behavior: URL sync via history.pushState + popstate,
   no full page reloads, same /login /signup /forgot-password routes.
------------------------------------------------------------------- */
const ROUTES = {
  login: LoginPage,
  signup: SignupPage,
  "forgot-password": ForgotPasswordPage,
};

function routeFromPath(pathname) {
  const clean = pathname.replace(/^\/+/, "");
  return ROUTES[clean] ? clean : "login";
}

export default function App() {
  const [route, setRoute] = useState("login");
  const initialized = useRef(false);

  useEffect(() => {
    const onPop = () => setRoute(routeFromPath(window.location.pathname || "/login"));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((next) => {
    setRoute(next);
    try {
      window.history.pushState({}, "", `/${next}`);
    } catch (e) {
      
      /* pushState may be restricted in sandboxed preview — safe to ignore */
    }
  }, []);

  const Page = ROUTES[route] || LoginPage;

  return (
    <>
      <GlobalStyle />
      <Page key={route} navigate={navigate} />
    </>
  );
}
