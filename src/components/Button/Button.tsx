import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = "default",
  onClick,
  type = "button",
  fullWidth = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variant} ${fullWidth ? "full" : ""}`}
    >
      {children}
    </button>
  );
};