import { useEffect, useState } from "react";
import "../../styles/style.css";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import { Menu } from "../../components/Menu/Menu";
import { MenuItem } from "../../components/Menu/Menu";
import { User, UserAdress } from "../../components/User/User";
import { Repurchase } from "../../components/Repurchase/Repurchase";

import {
  MostWanted,
  MostWantedItem,
} from "../../components/MostWanted/MostWanted";

import margherita from "../../assets/160572915436349060139189700225-1080p.jpg";
import calabresa from "../../assets/16057285666390640459715899877-1080p.jpg";
import calacheese from "../../assets/160572872237340571510501432084-1080p.jpg";
import { Footer } from "../../components/Footer/Footer";

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
            src: margherita,
            alt: "Imagem de uma pizza de Margherita que está como sugestão para compra novamente",
          }}
        />
      </section>

      <MostWanted>
        <h2 className="section-title">As mais desejadas</h2>
        <div className="most-wanted-wrapper">
          <MostWantedItem
            image={{
              src: margherita,
              alt: "Imagem de uma pizza de Margherita",
            }}
            title="Margherita"
            description="Muçarela especial, muçarela de búfala rasgada, fatias de tomate  finalizada com folhas de manjericão orgânico e um fio de azeite  aromatizado."
            price="93,00"
          />

          <MostWantedItem
            image={{
              src: calabresa,
              alt: "Imagem de uma pizza de Calabresa",
            }}
            title="Calabresa"
            description="Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas."
            price="93,00"
          />

          <MostWantedItem
            image={{
              src: calacheese,
              alt: "Imagem de uma pizza de Calacheese",
            }}
            title="Calacheese"
            description="Leva muçarela de búfala rasgada,  linguicinhas curada e curada apimentada sobre muçarela especial."
            price="99,00"
          />
        </div>
      </MostWanted>

      <Footer />
    </>
  );
}

export default Home;
