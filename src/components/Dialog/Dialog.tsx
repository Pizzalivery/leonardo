import { X } from "lucide-react";
import "./Dialog.css";

interface DialogProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

/* O Dialog foi mantido genérico e controlado por props para reutilizar a mesma
   estrutura visual com qualquer conteúdo interno, sem prender a abertura ao próprio componente. */
export const Dialog = ({ title, children, isOpen, onClose }: DialogProps) => {
  return (
    // A classe "open" delega a animação de entrada/saída para o CSS,
    // mantendo o componente simples e sem lógica extra de transição.
    <section className={`address-dialog ${isOpen ? "open" : ""}`}>
      <header className="dialog-header">
        <h2 className="dialog-title">{title}</h2>

        <button
          id="close-button"
          className="icon-button"
          aria-label="Fechar"
          type="button"
          onClick={onClose}
        >
          <X />
        </button>
      </header>

      <div>{children}</div>
    </section>
  );
};