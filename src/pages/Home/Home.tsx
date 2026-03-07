import { useEffect, useState } from "react";

import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import {
  Navigation,
  NavigationMenuItem,
} from "../../components/Navigation/Navigation";
import { HomeIcon, Menu, ReceiptText, Search, UserRound } from "lucide-react";
import { Header } from "../../components/Header/Header";

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
      <Navigation>
        <NavigationMenuItem
          variant="active"
          name="Início"
          icon={<HomeIcon />}
        />
        <NavigationMenuItem name="Busca" icon={<Search />} />
        <NavigationMenuItem name="Menu" icon={<Menu />} />
        <NavigationMenuItem name="Pedidos" icon={<ReceiptText />} />
        <NavigationMenuItem name="Perfil" icon={<UserRound />} />
      </Navigation>

      <Header userName="Daniela" enderecoEntrega=" Rua Mesquita, 248 " />

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
    </>
  );
}

export default Home;
