import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "primary";
  full?: boolean;
}

export function Button({ children, onClick, className = "", variant = "default", full = false }: ButtonProps) {
  return (
    <button
      className={`button ${variant !== "default" ? variant : ""} ${full ? "full" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

