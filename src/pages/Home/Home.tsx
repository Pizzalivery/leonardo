import { useEffect, useState } from "react";
// import { Button } from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import { Navigation } from "../../components/Navigation/Navigation";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { OrderAgain } from "../../components/OrderAgain/OrderAgain"; 
import { MostWanted, MostWantedItem } from "../../components/MostWanted/MostWanted";
import { Footer } from "../../components/Footer/Footer";
import "../../styles/style.css"

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
      <SectionTitle>Peça novamente</SectionTitle>
      <OrderAgain />
      <MostWanted>
        <MostWantedItem
          image={{
            src: "./src/assets/160572915436349060139189700225-1080p.jpg",
            alt: "Pizza Margherita"
          }}
          title="Margherita"
          description="Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado."
          price={93.00}
        />
        <MostWantedItem
          image={{
            src: "./src/assets/16057285666390640459715899877-1080p.jpg",
            alt: "Calabresa"
          }}
          title="Calabresa"
          description="Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas."
          price={93.00}
        />
        <MostWantedItem
          image={{
            src: "./src/assets/160572872237340571510501432084-1080p.jpg",
            alt: "Calacheese"
          }}
          title="Calacheese"
          description="Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial."
          price={ 99.00}
        />
      </MostWanted> 
      <Footer/>
      
    </>
  );
}

export default Home;
