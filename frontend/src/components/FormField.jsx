import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

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
            if (e.target.value.trim().length === 0) {
              onBlur?.(e);
            }
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

export default FormField;
