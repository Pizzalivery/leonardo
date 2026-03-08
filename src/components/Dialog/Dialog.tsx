import { X } from "lucide-react";
import "./Dialog.css";

interface DialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({
  title,
  isOpen,
  onClose,
  children,
}: DialogProps) {
  return (
    <section className={`address-dialog ${isOpen ? "open" : ""}`}>
      <header className="dialog-header">
        <h2 className="dialog-title">{title}</h2>

        <button
          id="close-button"
          className="icon-button"
          aria-label="Fechar"
          onClick={onClose}
          type="button"
        >
          <X />
        </button>
      </header>

      <div className="dialog-content">{children}</div>
    </section>
  );
}
