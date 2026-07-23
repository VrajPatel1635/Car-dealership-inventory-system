import React from "react";
import { cn } from "../../../utils/cn";
import Label from "./Label";
import { AlertCircle } from "lucide-react";

const Input = React.forwardRef(
  (
    {
      className,
      error,
      helperText,
      label,
      id,
      required,
      prefix,
      suffix,
      size = "md",
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const isError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : isError ? helperText : null;
    const showHelper = helperText && !isError;

    return (
      <div className="w-full flex flex-col gap-1.5 shrink-0">
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}
        <div className="relative flex items-center w-full">
          {prefix && (
            <div className="absolute left-3.5 flex items-center justify-center text-foreground-muted pointer-events-none z-10 shrink-0">
              {prefix}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            required={required}
            aria-invalid={isError}
            aria-describedby={
              isError
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            className={cn(
              "w-full bg-surface border border-border rounded-xl text-foreground placeholder:text-foreground-muted/60 transition-all duration-[var(--duration-fast)] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background-secondary/50 shrink-0",
              {
                "h-9 px-3 text-xs": size === "sm",
                "h-11 px-3.5 text-sm": size === "md",
                "h-12 px-4 text-base": size === "lg",
                "pl-10": prefix,
                "pr-10": suffix,
                "border-error focus:border-error focus:ring-error/20 bg-error/5": isError,
              },
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3.5 flex items-center justify-center text-foreground-muted z-10 shrink-0">
              {suffix}
            </div>
          )}
        </div>

        {showHelper && (
          <p id={`${inputId}-helper`} className="text-xs text-foreground-muted/80 ml-0.5">
            {helperText}
          </p>
        )}
        {isError && errorMessage && (
          <div
            id={`${inputId}-error`}
            className="flex items-center gap-1.5 text-xs text-error font-medium ml-0.5"
          >
            <AlertCircle size={14} className="shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
