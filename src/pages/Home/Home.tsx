import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";

import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import { TopMenu, TopMenuItem } from "../../components/TopMenu/TopMenu";
import { HomeIcon, Menu, ReceiptText, Search, UserRound } from "lucide-react";
import { Header } from "../../components/Header/Header";
import { Promotions } from "../../components/Promotions/Promotions";
import { OrderAgain } from "../../components/OrderAgain/OrderAgain";
import { Footer } from "../../components/Footer/Footer";
import {
  MostDesired,
  MostDesiredItem,
} from "../../components/MostDesired/MostDesired";

import fotoMargherita from "../../assets/160572915436349060139189700225-1080p.jpg";
import fotoCalabresa from "../../assets/16057285666390640459715899877-1080p.jpg";
import fotoCalacheese from "../../assets/160572872237340571510501432084-1080p.jpg";

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

  const randomIndex = () => {
    return Math.floor(Math.random() * 10);
  };

  return (
    <>
      <TopMenu>
        <TopMenuItem variant="active" name="Início" icon={<HomeIcon />} />
        <TopMenuItem name="Busca" icon={<Search />} />
        <TopMenuItem name="Menu" icon={<Menu />} />
        <TopMenuItem name="Pedidos" icon={<ReceiptText />} />
        <TopMenuItem name="Perfil" icon={<UserRound />} />
      </TopMenu>

      <Header userName="Daniela" enderecoEntrega=" Rua Mesquita, 248 " />

      <Promotions
        title={"Promoções"}
        carousel={
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
        }
      />

      <OrderAgain item="Margherita" price="R$ 93,00" img={fotoMargherita} />

      <MostDesired>
        <MostDesiredItem
          name="Margherita"
          description="Muçarela especial, muçarela de búfala rasgada, fatias de tomate  finalizada com folhas de manjericão orgânico e um fio de azeite  aromatizado."
          img={fotoMargherita}
          price="R$ 93,00"
        />
        <MostDesiredItem
          name="Calabresa"
          description="Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas."
          img={fotoCalabresa}
          price="R$ 93,00"
        />
        <MostDesiredItem
          name="Calacheese"
          description="Leva muçarela de búfala rasgada,  linguicinhas curada e curada apimentada sobre muçarela especial."
          img={fotoCalacheese}
          price="R$ 99,00"
        />
      </MostDesired>

      <Footer />
    </>
  );
}

export default Home;
