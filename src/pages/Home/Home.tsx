import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import Offers from "../../components/Offers/Offers";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import OrderAgain from "../../components/OrderAgain/OrderAgain";

import MostWanted from "../../components/MostWanted/MostWanted";
import margheritaImg from "../../assets/160572915436349060139189700225-1080p.jpg";
import calabresaImg from "../../assets/16057285666390640459715899877-1080p.jpg";
import calacheeseImg from "../../assets/160572872237340571510501432084-1080p.jpg";

import Footer from "../../components/Footer/Footer";

const mostWantedItems = [
  {
    image: {
      src: margheritaImg,
      alt: "Pizza Margherita",
    },
    title: "Margherita",
    description:
      "Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado.",
    price: "R$ 93,00",
  },
  {
    image: {
      src: calabresaImg,
      alt: "Pizza Calabresa",
    },
    title: "Calabresa",
    description:
      "Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas.",
    price: "R$ 93,00",
  },
  {
    image: {
      src: calacheeseImg,
      alt: "Pizza Calacheese",
    },
    title: "Calacheese",
    description:
      "Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial.",
    price: "R$ 99,00",
  },
];

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
      <Navigation />
      <Header />

      <Offers>
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
      </Offers>

      <OrderAgain />
      <MostWanted items={mostWantedItems} />
      <Footer />
    </>
  );
}

export default Home;
