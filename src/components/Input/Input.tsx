interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
  fullWidth?: boolean;
  placeholder: string;
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
    <div className={`${fullWidth ? "w-full" : "min-w-3xs"}`}>
      <label htmlFor={id} className={noLabel ? "sr-only" : "block"}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="
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
          focus:outline-none
          focus:border-(--brand-primary)
        "
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};
