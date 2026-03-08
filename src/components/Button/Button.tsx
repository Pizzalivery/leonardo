import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  size?: "default" | "full";
  onClick: () => void;
}

export const Button = ({
  children,
  variant = "default",
  size = "default",
  onClick,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={`button ${variant} ${size}`}>
      {children}
    </button>
  );
};
