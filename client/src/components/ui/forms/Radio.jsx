import React from "react";
import { cn } from "../../../utils/cn";
import Label from "./Label";

const Radio = React.forwardRef(
  ({ className, error, helperText, label, id, required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 shrink-0">
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
            className={cn(
              "w-4 h-4 rounded-full border border-border bg-surface text-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors cursor-pointer accent-primary",
              className
            )}
            {...props}
          />
          {label && (
            <Label
              htmlFor={id}
              required={required}
              className="mb-0 cursor-pointer text-sm font-medium text-foreground/90"
            >
              {label}
            </Label>
          )}
        </div>
        {helperText && !error && (
          <p id={`${id}-helper`} className="text-xs text-muted/80 ml-6">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="text-xs text-error font-medium ml-6">
            {typeof error === "string" ? error : helperText}
          </p>
        )}
      </div>
    );
  },
);
Radio.displayName = "Radio";
export default Radio;

