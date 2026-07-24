import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import FormField from "./FormField";

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

export default PasswordField;
