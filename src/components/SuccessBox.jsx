import React from "react";
import { CheckCircle2 } from "lucide-react";

const SuccessBox = ({ title, children }) => (
  <div className="success-box" role="status">
    <CheckCircle2 size={18} color="var(--green)" style={{ flexShrink: 0, marginTop: 1 }} />
    <div>
      <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-0)", fontWeight: 500 }}>
        {title}
      </p>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ink-1)", lineHeight: 1.5 }}>
        {children}
      </p>
    </div>
  </div>
);

export default SuccessBox;
