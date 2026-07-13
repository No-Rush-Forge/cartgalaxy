import React from "react";
import { Loader2 } from "lucide-react";

/* ------------------------------------------------------------------
   Primary submit button, shared across all auth forms.
   Shows a spinner + loadingLabel while `loading` is true.
------------------------------------------------------------------- */
const SubmitButton = ({ loading, loadingLabel, children }) => (
  <button type="submit" className="btn-primary" disabled={loading}>
    {loading ? (
      <>
        <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />
        {loadingLabel}
      </>
    ) : (
      children
    )}
  </button>
);

export default SubmitButton;
