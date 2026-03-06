import { useEffect, useState } from "react";
import "../../styles/style.css";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import { Menu } from "../../components/Menu/Menu";
import { MenuItem } from "../../components/Menu/Menu";
import { User, UserAdress } from "../../components/User/User";
import { Repurchase } from "../../components/Repurchase/Repurchase";

import repurchaseImage from "../../assets/160572915436349060139189700225-1080p.jpg";

const getData = async () => {
  try {
    const response = await fetch(
      "https://burgerlivery-esposito-api.onrender.com/offer-gallery",
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching offers:", error);
  }
};

type Offer = {
  id: number;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

function Home() {
  const [offers, setOffers] = useState<Array<Offer>>([]);

  useEffect(() => {
    getData().then((data) => {
      setOffers(data);
    });
  }, []);

  return (
    <>
      <nav id="navigation">
        <div className="navigation-wrapper">
          <h2 className="logo">Pizzalivery</h2>
          <Menu>
            <MenuItem page={"Inicio"} iconName={"home"} variant="active" />
            <MenuItem page={"Busca"} iconName={"search"} />
            <MenuItem page={"Menu"} iconName={"menu"} />
            <MenuItem page={"Pedidos"} iconName={"receipt-text"} />
            <MenuItem page={"Perfil"} iconName={"user-round"} />
          </Menu>
        </div>
      </nav>

      <header className="header">
        <UserAdress userAdress={"Rua Mesquita, 248"} />
        <User userName={"Daniela"} />
      </header>

      <section className="offers">
        <div className="container">
          <h2 className="section-title">Promoções</h2>
        </div>
        <Carousel>
          {offers.map((offer) => (
            <CarouselItem
              key={offer.id}
              title={offer.title}
              description={offer.description}
              image={offer.image}
            />
          ))}
        </Carousel>
      </section>

      <section className="order-again">
        <h2 className="section-title">Peça novamente</h2>
        <Repurchase
          title="Margherita"
          price="93,00"
          image={{
            src: repurchaseImage,
            alt: "Imagem de uma pizza de Margherita que está como sugestão para compra novamente",
          }}
        />
      </section>

      <article></article>

      <footer></footer>
    </>
  );
}

export default Home;
