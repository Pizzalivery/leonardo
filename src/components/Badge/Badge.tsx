type BadgeVariant = "default" | "info" | "success" | "warning" | "error";
type BadgeSize = "default" | "small";

const variants: Record<BadgeVariant, string> = {
  default: "bg-brand-primary-light text-brand-primary",
  info: "bg-interface-info text-common-light",
  success: "bg-interface-success text-common-light",
  warning: "bg-interface-warning text-common-light",
  error: "bg-interface-error text-common-light",
};

const sizes: Record<BadgeSize, string> = {
  default: "px-3 py-2 text-sm",
  small: "px-2.5 py-1 text-xs",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export const Badge = ({
  children,
  variant = "default",
  size = "default",
}: BadgeProps) => {
  return (
    <mark
      role="status"
      className={`${variants[variant]} ${sizes[size]} rounded-full font-semibold leading-normal`}
    >
      {children}
    </mark>
  );
};
