import React from "react";
import { cn } from "../../../utils/cn";

const variantStyles = {
  success: "bg-success/10 border border-success/30 text-success",
  warning: "bg-warning/10 border border-warning/30 text-warning",
  error: "bg-error/10 border border-error/30 text-error",
  info: "bg-info/10 border border-info/30 text-info",
};

const Alert = React.forwardRef(
  ({ className, variant = "info", title, description, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "flex items-start gap-3 rounded-xl px-4 py-3 text-sm",
          variantStyles[variant] ?? variantStyles.info,
          className,
        )}
        {...props}
      >
        {icon && <div className="shrink-0 mt-0.5">{icon}</div>}
        <div className="flex flex-col gap-1 min-w-0">
          {title && (
            <p className="font-medium text-foreground m-0">{title}</p>
          )}
          {description && (
            <p className="text-[var(--text-body-sm-size)] text-foreground-muted">{description}</p>
          )}
          {children && <p className="leading-snug">{children}</p>}
        </div>
      </div>
    );
  },
);
Alert.displayName = "Alert";
export default Alert;
