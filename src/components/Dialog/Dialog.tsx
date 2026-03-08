import { X } from "lucide-react";
import "./Dialog.css";

interface DialogProps {
  title: string;
  children: React.ReactNode;
}

interface DialogFormGridProps {
  children: React.ReactNode;
}

export interface DialogFormInputProps {
  value: string;
  labelName: string;
  labelFor: string;
  placeholder?: string;
  fieldClass?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  variant?: "default" | "input-small";
}

export const Dialog = ({ title, children }: DialogProps) => {
  return (
    <section className="address-dialog">
      <header className="dialog-header">
        <h2 className="dialog-title">{title}</h2>
        <button id="close-button" className="icon-button" aria-label="Fechar">
          <X />
        </button>
      </header>
      <form>{children}</form>
    </section>
  );
};

export const DialogFormGrid = ({ children }: DialogFormGridProps) => {
  return <div className="form-grid">{children}</div>;
};

export const DialogFormInput = ({
  value,
  labelName,
  labelFor,
  placeholder,
  fieldClass = "text-field",
  type = "text",
  variant = "default",
  disabled = true,
  required = true,
}: DialogFormInputProps) => {
  return (
    <div className={`form-input ${variant}`}>
      <label className="sr-only" htmlFor={labelFor}>
        {labelName}
      </label>
      <input
        value={value}
        className={fieldClass}
        type={type}
        id={labelFor}
        name={labelFor}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};
