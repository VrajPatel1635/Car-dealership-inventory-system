import React from "react";
import { cn } from "../../../utils/cn";
import Label from "./Label";

const Radio = React.forwardRef(
  ({ className, error, helperText, label, id, required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id={id}
            ref={ref}
            required={required}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={cn("radio", className)}
            {...props}
          />
          {label && (
            <Label
              htmlFor={id}
              required={required}
              className="mb-0 cursor-pointer"
            >
              {label}
            </Label>
          )}
        </div>
        {helperText && !error && (
          <p id={`${id}-helper`} className="text-caption-size text-muted ml-6">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="text-caption-size text-error ml-6">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Radio.displayName = "Radio";
export default Radio;
