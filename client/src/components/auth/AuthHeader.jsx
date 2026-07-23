import React from "react";
import { CarFront } from "lucide-react";

const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-5 text-primary">
        <CarFront size={22} strokeWidth={2.5} />
        <span
          className="font-semibold text-base tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-body)" }}
        >
          AutoInventory
        </span>
      </div>
      <h1
        className="text-3xl font-semibold tracking-tight text-foreground mb-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-foreground-muted leading-relaxed max-w-[320px]">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AuthHeader;
