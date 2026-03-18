import "./Button.css";

type ButtonVariant = "default" | "primary" | "secondary";

const variants: Record<ButtonVariant, string> = {
  default: "bg-transparent text-base hover:bg-mix-interface-border-light",
  primary:
    "bg-brand-primary text-common-light hover:bg-mix-primary-dark disabled:bg-mix-primary-light",
  secondary: "bg-brand-primary-light text-common-dark",
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  onClick: () => void;
}

export const Button = ({
  children,
  variant = "default",
  fullWidth = false,
  onClick,
}: ButtonProps) => {
  return (
    // <button onClick={onClick} className={`button ${variant}`}>
    <button
      onClick={onClick}
      className={`
        
        text-base
        font-black
        rounded-4xl
        border-0
        cursor-pointer
        py-4
        px-6
        transition-colors
        duration-200
        hover:opacity-75
        disabled:cursor-not-allowed
        disabled:pointer-events-none
        disabled:opacity-80
        ${variants[variant]}
        ${fullWidth ? "w-full" : "min-w-3xs"}
      `}
    >
      {children}
    </button>
  );
};
