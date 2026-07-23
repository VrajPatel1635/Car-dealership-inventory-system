import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "../ui/forms/Input";

const PasswordInput = forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const suffix = (
    <button
      type="button"
      className="p-1 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors duration-[var(--duration-fast)] focus:outline-none focus:ring-1 focus:ring-primary/30 cursor-pointer"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      tabIndex={0}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <Input
      type={showPassword ? "text" : "password"}
      ref={ref}
      suffix={suffix}
      className={className}
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
