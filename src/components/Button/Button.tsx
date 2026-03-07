import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "change-address";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "default",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`button ${variant}`}>
      {children}
    </button>
  );
}