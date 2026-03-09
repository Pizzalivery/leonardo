type PizzaCardProps = {
  nome: string
  preco: string
  children: React.ReactNode
}

function PizzaCard({ nome, preco, children }: PizzaCardProps) {
  return (
    <div style={{border:"1px solid #ccc", padding:"10px", margin:"10px"}}>
      <h2>{nome}</h2>
      <p>{preco}</p>
      {children}
    </div>
  )
}

export default PizzaCard