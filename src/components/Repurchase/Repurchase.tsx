import "./Repurchase.css";

interface RepurchaseProps {
  title: string;
  price: string;
  image: {
    src: string;
    alt: string;
  };
}

export const Repurchase = ({ title, price, image }: RepurchaseProps) => {
  return (
    <>
      <img className="order-again-img" src={image.src} alt={image.alt} />

      <p className="order-again-title">{title}</p>
      <p className="order-again-price">R${price}</p>
      <a className="order-again-add" href="">
        Adicionar a sacola
      </a>
    </>
  );
};
