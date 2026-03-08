import { useEffect, useState } from "react";
import  {Header}  from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import PromotionCard from '../../components/PromotionCard/styles/PromotionCard';
import PromotionCarousel from '../../components/Carousel/PromotionCarousel';
import PizzaCard from './../../components/PizzaCard/PizzaCard';
import "./Home.css";

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
      console.log(data);
      if (Array.isArray(data) && data.length > 0) {
        // encontrar oferta de calabresa + coca e duplicar
        const calabresaOffer = data.find(
          (o: any) =>
            typeof o.title === 'string' &&
            o.title.toLowerCase().includes('calabresa') &&
            o.title.toLowerCase().includes('coca'),
        );
        if (calabresaOffer) {
          data.push({ ...calabresaOffer, id: data.length + 1 });
        }
      }
      setOffers(data);
    });
  }, []);

  return (
    
    <div>
      <Header />
      <PromotionCarousel 
        promotions={offers.map(offer => ({
          id: offer.id.toString(),
          title: offer.title,
          description: offer.description,
          imageUrl: offer.image.src
        }))} 
        title="Promoções" 
      />
      <div className="container">
        <h2>Peça novamente</h2>
        <div className="promotions">
          <PromotionCard
          image="leonardo/src/assets/160572915436349060139189700225-1080p.jpg"
            title="Margherita"
            price="R$ 93,00"
            />
        </div>
        <h3>As mais desejadas</h3>
        <div className="pizzas">
          <PizzaCard 
          image="leonardo/src/assets/160572915436349060139189700225-1080p.jpg"
            name="Margherita"
            description="Muçarela especial e manjericão muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado"
            price="R$ 93,00"
          />
          <PizzaCard 
          image="leonardo/src/assets/16057285666390640459715899877-1080p.jpg"
            name="Calabresa"
            description="Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas"
            price="R$ 93,00"
            />
            <PizzaCard 
          image="leonardo/src/assets/160572872237340571510501432084-1080p.jpg"
            name="Calacheese"
            description="Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial"
            price="R$ 99,00"
            />

        </div>
      </div>
    </div>
  );
}

export default Home