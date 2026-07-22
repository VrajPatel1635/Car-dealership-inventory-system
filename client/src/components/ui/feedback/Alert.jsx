import React from "react";
import { cn } from "../../../utils/cn";

const Alert = React.forwardRef(
  (
    { className, variant = "info", title, description, icon, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "alert",
          {
            "alert-success": variant === "success",
            "alert-warning": variant === "warning",
            "alert-error": variant === "error",
            "alert-info": variant === "info",
          },
          className,
        )}
        {...props}
      >
        {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
        <div className="flex flex-col gap-1">
          {title && (
            <h5 className="font-medium text-foreground m-0">{title}</h5>
          )}
          {description && (
            <div className="text-body-sm-size text-muted">{description}</div>
          )}
        </div>
      </div>
    );
  },
);
Alert.displayName = "Alert";
export default Alert;
