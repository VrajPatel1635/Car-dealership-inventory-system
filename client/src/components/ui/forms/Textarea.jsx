import React from "react";
import { cn } from "../../../utils/cn";
import Label from "./Label";
import { AlertCircle } from "lucide-react";

const Textarea = React.forwardRef(
  ({ className, error, helperText, label, id, required, ...props }, ref) => {
    const isError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : isError ? helperText : null;
    const showHelper = helperText && !isError;

    return (
      <div className="w-full flex flex-col gap-1.5 shrink-0">
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}
        <textarea
          id={id}
          ref={ref}
          required={required}
          aria-invalid={isError}
          aria-describedby={
            isError
              ? `${id}-error`
              : helperText
              ? `${id}-helper`
              : undefined
          }
          className={cn(
            "w-full min-h-[100px] p-3.5 text-sm sm:text-base bg-surface border border-border rounded-xl text-foreground placeholder:text-muted/60 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed resize-y",
            {
              "border-error focus:border-error focus:ring-error/20 bg-error/5": isError,
            },
            className
          )}
          {...props}
        />
        {showHelper && (
          <p id={`${id}-helper`} className="text-xs text-muted/80 ml-0.5">
            {helperText}
          </p>
        )}
        {isError && errorMessage && (
          <div
            id={`${id}-error`}
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
Textarea.displayName = "Textarea";
export default Textarea;

