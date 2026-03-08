import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "change-address";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  full?: boolean;
}

export function Button({
  children,
  variant = "default",
  onClick,
  type = "button",
  full = false,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`button ${variant} ${full ? "full" : ""}`}>
      {children}
    </button>
  );
}