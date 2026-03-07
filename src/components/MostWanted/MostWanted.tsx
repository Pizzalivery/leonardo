import "./MostWanted.css"
// criar o children
interface MostWantedProps {
  children: React.ReactNode;
}

//especificar os valores que o children vai receber de cada atributo

export interface MostWantedItemProps {
   image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  price: number;
}

//esse aqui chama o children pra ser usado no mostwanted
export const MostWanted = ({ children }: MostWantedProps) => {
  return (
    <div className= "most-wanted">
        <h2 className="section-title">As mais desejadas</h2>
        <div className="most-wanted-wrapper">{children}</div>
    </div>
  ); {/*dentro dessa clase tem as sections, e as props estão nas sections(abaixo)*/}
};

export const MostWantedItem = ({
    image,
    title,
    description,
    price
}: MostWantedItemProps) => {
    return (
        <section className="most-wanted-item">
          <img className="product-image" src={image.src} alt={image.alt} /> {/* o src e o alt sao as propriedades dos negocio */}
          <h3 className="product-title">{title}</h3>
          <p className="product-description">{description}</p>
          <p className="product-price">R$ {price.toFixed(2)}</p> {/* arredonda as cada depois da virgula */}
        </section>
    );
};
