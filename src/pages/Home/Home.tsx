import { useEffect, useState } from "react";
// import { Button } from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import { Navigation } from "../../components/Navigation/Navigation";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { OrderAgain } from "../../components/OrderAgain/OrderAgain"; 


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
    // @ts-ignore
    lucide.createIcons();
  }, []);

  return (
    <>
    <Navigation />
    <Header />
    <SectionTitle>Promoções</SectionTitle>
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
      <SectionTitle>Peça Novamente</SectionTitle>
      <OrderAgain />
      <SectionTitle>As mais desejadas</SectionTitle>
    </>
  );
}

export default Home;
