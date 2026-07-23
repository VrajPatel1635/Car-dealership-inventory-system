import React from "react";
import { cn } from "../../../utils/cn";
import Label from "./Label";
import { AlertCircle, ChevronDown } from "lucide-react";

const Select = React.forwardRef(
  (
    {
      className,
      error,
      helperText,
      label,
      id,
      required,
      children,
      options,
      size = "md",
      ...props
    },
    ref
  ) => {
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
        <div className="relative flex items-center w-full">
          <select
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
              "w-full bg-surface border border-border rounded-xl text-foreground transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed appearance-none pr-10 shrink-0 cursor-pointer",
              {
                "h-9 px-3 text-xs": size === "sm",
                "h-11 px-3.5 text-sm sm:text-base": size === "md",
                "h-12 px-4 text-base": size === "lg",
                "border-error focus:border-error focus:ring-error/20 bg-error/5": isError,
              },
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3.5 flex items-center justify-center text-muted pointer-events-none shrink-0">
            <ChevronDown size={16} />
          </div>
        </div>
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

Select.displayName = "Select";
export default Select;

