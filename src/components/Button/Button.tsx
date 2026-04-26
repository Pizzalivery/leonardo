import "./Button.css";

type ButtonVariant = "default" | "primary" | "secondary";

const variants: Record<ButtonVariant, string> = {
  default: "bg-transparent text-base hover:bg-mix-interface-border-light",
  primary:
    "bg-brand-primary text-common-light hover:bg-mix-primary-dark disabled:bg-mix-primary-light",
  secondary: "bg-brand-primary-light text-common-dark",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = "default",
  fullWidth = false,
  onClick,
  ...props
}: ButtonProps) => {
  return (
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
        [&>svg]:text-center
        [&>svg]:w-full
        ${variants[variant]}
        ${fullWidth ? "w-full" : "min-w-3xs"}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
