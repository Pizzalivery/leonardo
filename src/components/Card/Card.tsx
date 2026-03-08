import "./Card.css"

interface CardProps {
    title: string
    price: string
    buttonText: string
    src: string;
    alt: string


}

export const Card = ({src, alt, title, price, buttonText}: CardProps) => {
    return (
        <>
            <img
                className="order-again-img"
                src={src}
                alt={alt}
            />

            <p className="order-again-title">{title}</p>
            <p className="order-again-price">{price}</p>
            <a className="order-again-add" href="">{buttonText}</a>
        </>
    )
}