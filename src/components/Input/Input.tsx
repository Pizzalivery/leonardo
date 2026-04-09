interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
  fullWidth?: boolean;
  placeholder?: string;
  type: string;
  noLabel?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  id,
  label,
  name,
  fullWidth = false,
  type,
  placeholder,
  noLabel = false,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      <label htmlFor={id} className={noLabel ? "sr-only" : "block"}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={`
          border 
          border-interface-base 
          rounded-full 
          py-4
          px-6 
          placeholder:text-typography-light
          text-typography-dark
          w-full
          disabled:bg-mix-interface-border-light
          disabled:pointer-events-none
        `}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

interface ErrorLabelProps {
  children: React.ReactNode;
  id: string;
}

export const ErrorLabel = ({ id, children }: ErrorLabelProps) => {
  return (
    <label
      className="text-interface-error text-sm m-2 block"
      htmlFor={`${id}-error`}
    >
      {children}
    </label>
  );
};
