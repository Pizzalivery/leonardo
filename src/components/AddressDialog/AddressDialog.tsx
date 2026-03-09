import { Button } from "../Button/Button";
import { Dialog } from "../Dialog/Dialog";
import "./AddressDialog.css";

interface AddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddressDialog({ isOpen, onClose }: AddressDialogProps) {
  return (
    <Dialog
      title="Alterar endereço de entrega"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form>
        <div className="form-input">
          <label className="sr-only" htmlFor="cep">
            Cep
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
            required
            disabled
            defaultValue="Rua Xingu"
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
              required
              disabled
              defaultValue="12354"
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
              required
              disabled
              defaultValue="Apto 101"
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
            required
            disabled
            defaultValue="Vila Xingu"
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
              required
              disabled
              defaultValue="São Paulo"
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
              required
              disabled
              defaultValue="SP"
            />
          </div>
        </div>

        <Button variant="primary" type="submit" full>
          Cadastrar
        </Button>
      </form>
    </Dialog>
  );
}