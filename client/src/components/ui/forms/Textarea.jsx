import React from "react";
import { cn } from "../../../utils/cn";
import Label from "./Label";

const Textarea = React.forwardRef(
  ({ className, error, helperText, label, id, required, ...props }, ref) => {
    return (
      <div className="input-group w-full">
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}
        <textarea
          id={id}
          ref={ref}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={cn("textarea", { invalid: error }, className)}
          {...props}
        />
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
Textarea.displayName = "Textarea";
export default Textarea;
