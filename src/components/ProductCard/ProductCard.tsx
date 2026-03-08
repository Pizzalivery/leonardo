import "./ProductCard.css"

interface ProductCardMenuProps {
    children: React.ReactNode;
}

interface ProductCardItemProps {
    src: string
    alt: string
    title: string
    description: string
    price: string
}

export const ProductCardMenu = ({children}: ProductCardMenuProps) => {
    return (
        <div className="most-wanted-wrapper">
            {children}
        </div>
    )
}

export const ProductCardItem = ({src, alt, title, description, price}: ProductCardItemProps) => {
    return (
        <section className="most-wanted-item">
            <img className="product-image" src={src} alt={alt}/>
            <h3 className="product-title">{title}</h3>
            <p className="product-description">{description}</p>
            <p className="product-price">{price}</p>
        </section>
    )
}