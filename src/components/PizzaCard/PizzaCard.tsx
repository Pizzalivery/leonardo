import "./PizzaCard.css"

interface Props{
  image:string
  name:string
  description:string
  price:string
}

export default function PizzaCard({image,name,description,price}:Props){
  return(
    <div className="pizza-card">

      <img src={image} alt={name} className="pizza-image" />
      <div className="pizza-info">
        <h3 className="pizza-name">{name}</h3>
        <p className="pizza-description">{description}</p>
        <span className="price">{price}</span>
      </div>

    </div>
  )
}