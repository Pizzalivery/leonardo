import { X } from "lucide-react"
import "./Dialog.css"

interface DialogProps {
  title: string
  children: React.ReactNode
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
      <div>{children}</div>
    </section>
  )
}
