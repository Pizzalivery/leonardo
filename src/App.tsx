import { useState } from "react"
import "./styles/variables.css"
import "./styles/style.css"

import { Dialog } from "./components/Dialog/Dialog"

function App() {
  // Hook de estado do React, (useState, useEffect, useContext, etc.)
  // usado para criar variáveis de estado e atualizar a interface do usuário quando essas variáveis mudam.
  // const [state, setState] = useState();
  // 1. variavel de estado: state
  // 2. função para atualizar o estado: setState
  // const [count, setCount] = useState<number>(5)
  // const [name, setName] = useState<string>("")
  // const handleIncrement = () => {
  //   setCount(count + 1)
  // }
  // const handleDecrement = () => {
  //   setCount(count - 1)
  // }
  // const handleAddName = () => {
  //   setName("Ubirajara Pelli")
  // }
  // Eventos
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  // Renderização condicional
  return (
    <div>
      <h1>Pizzalivery</h1>
      <button onClick={handleOpenDialog}>Rua Mesquita, 248</button>
      {/* <h2>{name}</h2>
      <button onClick={handleDecrement}>decrementar</button>
      <span>{count}</span>
      <button onClick={handleIncrement}>incrementar</button>
      <button onClick={handleAddName}>Adicionar nome</button> */}

      {isDialogOpen ? (
        <Dialog title="Abobrinha">
          <p>
            Abobrinha é um legume muito versátil e saboroso, perfeito para
            diversas receitas.
          </p>
        </Dialog>
      ) : null}
    </div>
  )
}

export default App
