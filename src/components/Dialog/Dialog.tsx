import { Heading } from "../Heading/Heading";
import { X } from "lucide-react";
import "./Dialog.css";

interface DialogProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const Dialog = ({ title, children, open, onClose }: DialogProps) => {
  return (
    <section className={`address-dialog ${open ? "open" : "closed"}`}>
      <header className="dialog-header">
        <Heading component="h2">{title}</Heading>
        <button
          id="close-button"
          className="dialog-icon-button"
          aria-label="Fechar"
          onClick={onClose}
        >
          <X />
        </button>
      </header>
      <>{children}</>
    </section>
  );
};
