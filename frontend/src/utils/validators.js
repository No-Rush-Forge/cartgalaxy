/* ------------------------------------------------------------------
   Validation helpers
------------------------------------------------------------------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PW_UPPER = /[A-Z]/;
const PW_LOWER = /[a-z]/;
const PW_NUM = /[0-9]/;
const PW_SPECIAL = /[^A-Za-z0-9]/;

export function validateEmail(v) {
  if (!v.trim()) return "Email is required.";
  if (!EMAIL_RE.test(v.trim())) return "Enter a valid email address.";
  return "";
}

export function validateLoginPassword(v) {
  if (!v) return "Password is required.";
  if (v.length < 8) return "Password must be at least 8 characters.";
  return "";
}

export function validateSignupPassword(v) {
  if (!v) return "Password is required.";
  if (v.length < 8) return "Use at least 8 characters.";
  if (!PW_UPPER.test(v)) return "Include one uppercase letter.";
  if (!PW_LOWER.test(v)) return "Include one lowercase letter.";
  if (!PW_NUM.test(v)) return "Include one number.";
  if (!PW_SPECIAL.test(v)) return "Include one special character.";
  return "";
}

export function validateConfirm(pw, confirm) {
  if (!confirm) return "Please confirm your password.";
  if (pw !== confirm) return "Passwords do not match.";
  return "";
}

export function validateName(v) {
  if (!v.trim()) return "Full name is required.";
  return "";
}
