import { X } from "lucide-react";

type AddressDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

function AddressDialog({ isOpen, onClose }: AddressDialogProps) {
  return (
    <section className={`address-dialog ${isOpen ? "open" : ""}`}>
      <header className="dialog-header">
        <h2 className="dialog-title">Alterar endereço de entrega</h2>

        <button
          id="close-button"
          className="icon-button"
          aria-label="Fechar"
          type="button"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </header>

      <form>
        <div className="form-input">
          <label className="sr-only" htmlFor="cep">
            CEP
          </label>
          <input
            className="text-field"
            type="text"
            id="cep"
            name="cep"
            placeholder="Digite o CEP"
            defaultValue="09060-050"
          />
        </div>

        <div className="form-input">
          <label className="sr-only" htmlFor="street">
            Rua
          </label>
          <input
            className="text-field"
            type="text"
            id="street"
            name="street"
            defaultValue="Rua Xingu"
            disabled
          />
        </div>

        <div className="form-grid">
          <div className="form-input input-small">
            <label className="sr-only" htmlFor="number">
              Número
            </label>
            <input
              className="text-field"
              type="text"
              id="number"
              name="number"
              defaultValue="12354"
              disabled
            />
          </div>

          <div className="form-input">
            <label className="sr-only" htmlFor="additional">
              Complemento
            </label>
            <input
              className="text-field"
              type="text"
              id="additional"
              name="additional"
              defaultValue="Apto 101"
              disabled
            />
          </div>
        </div>

        <div className="form-input">
          <label className="sr-only" htmlFor="neighborhood">
            Bairro
          </label>
          <input
            className="text-field"
            type="text"
            id="neighborhood"
            name="neighborhood"
            defaultValue="Vila Xingu"
            disabled
          />
        </div>

        <div className="form-grid">
          <div className="form-input">
            <label className="sr-only" htmlFor="city">
              Cidade
            </label>
            <input
              className="text-field"
              type="text"
              id="city"
              name="city"
              defaultValue="São Paulo"
              disabled
            />
          </div>

          <div className="form-input input-small">
            <label className="sr-only" htmlFor="state">
              Estado
            </label>
            <input
              className="text-field"
              type="text"
              id="state"
              name="state"
              defaultValue="SP"
              disabled
            />
          </div>
        </div>

        <button className="button primary full" type="submit">
          Cadastrar
        </button>
      </form>
    </section>
  );
}

export default AddressDialog;