import { X } from 'lucide-react';
import "./Dialog.css"
import "./input.css"
import { Button } from '../Button/Button';

interface DialogProps {
  title: string
  isOpen: boolean
  onClose: () => void
}

export const Dialog = ({ title, isOpen, onClose }: DialogProps) => {
  return (
    <section className={`address-dialog ${isOpen ? "open" : ""}`}>
      <header className="dialog-header">
        <h2 className="dialog-title">{title}</h2>
        <button id="close-button" className="icon-button" aria-label="Fechar" onClick={onClose}>
          <X />
        </button>
      </header>
      <form>
        <div className="form-input">
          <label className="sr-only" htmlFor="cep">Cep</label>
          <input className="text-field" type="text" id="cep" name="cep" placeholder="Digite o CEP" value="09060-050" />
        </div>
        <div className="form-input">
          <label className="sr-only" htmlFor="street">Rua</label>
          <input className="text-field" type="text" id="street" name="street" required disabled value="Rua Xingu" />
        </div>
        <div className="form-grid">
          <div className="form-input input-small">
            <label className="sr-only" htmlFor="number">Número</label>
            <input className="text-field" type="text" id="number" name="number" required disabled value="12354" />
          </div>
          <div className="form-input">
            <label className="sr-only" htmlFor="additional">Complemento</label>
            <input className="text-field" type="text" id="additional" name="additional" required disabled value="Apto 101" />
          </div>
        </div>
        <div className="form-input">
          <label className="sr-only" htmlFor="neighborhood">Bairro</label>
          <input className="text-field" type="text" id="neighborhood" name="neighborhood" required disabled value="Vila Xingu" />
        </div>
        <div className="form-grid">
          <div className="form-input">
            <label className="sr-only" htmlFor="city">Cidade</label>
            <input className="text-field" type="text" id="city" name="city" required disabled value="São Paulo" />
          </div>
          <div className="form-input input-small">
            <label className="sr-only" htmlFor="state">Estado</label>
            <input className="text-field" type="text" id="state" name="state" required disabled value="SP" />
          </div>
        </div>
        <button className="button primary full">Cadastrar</button>
      </form>
    </section>
  )
}