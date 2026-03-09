import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  onClick: () => void;
}

export const Button = ({
  children,
  variant = "default",
  onClick,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={`button ${variant}`}>
      {children}
    </button>
  );
};