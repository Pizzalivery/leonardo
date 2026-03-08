import "./PromotionCard.css"

interface Props{
  image:string
  title:string
  price:string
}

export default function PromotionCard({image,title, price }:Props){
  return(
    <div className="promotion-card">
      <div className="promotion-image-container">
       <img src={image} alt={title} className="promotion-image" />
      </div>
        <div className="promotion-info">
          <h3 className="promotion-title">{title}</h3>
        <p className="promotion-price">{price}</p>
        <button className="promotion-button">Adicionar à sacola</button>
        </div>
    </div>
  )
}

