import React from "react";
import { cn } from "../../../utils/cn";
import Label from "./Label";

const Select = React.forwardRef(
  (
    { className, error, helperText, label, id, required, children, ...props },
    ref,
  ) => {
    return (
      <div className="input-group w-full">
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}
        <select
          id={id}
          ref={ref}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={cn("select", { invalid: error }, className)}
          {...props}
        >
          {children}
        </select>
        {helperText && !error && (
          <p id={`${id}-helper`} className="text-caption-size text-muted mt-1">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="text-caption-size text-error mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
export default Select;
