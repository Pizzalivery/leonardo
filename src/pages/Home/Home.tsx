import { use, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import { MenuItem, Navbar } from "../../components/Navbar/Navbar";
import { Section, SectionOffer } from "../../components/Section/Section";
import { Card } from "../../components/Card/Card";
import { ProductCardMenu, ProductCardItem } from "../../components/ProductCard/ProductCard";
import { Search, UserRound, Menu, House, ReceiptText } from "lucide-react";
import { Footer } from "../../components/Footer/Footer";
import { DeliveryAddress, GreetingUser, Header } from "../../components/Header/Header";


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
      <Navbar title="Pizzalivery">
        <MenuItem variant="active" title="Início"><House /></MenuItem>
        <MenuItem variant="default" title="Busca"><Search /></MenuItem>
        <MenuItem variant="default" title="Menu"><Menu /></MenuItem>
        <MenuItem variant="default" title="Pedidos"><ReceiptText /> </MenuItem>
        <MenuItem variant="default" title="Perfil"><UserRound /></MenuItem>
      </Navbar>
      <Header>
        <DeliveryAddress address="Rua Mesquita, 248"/>
        <GreetingUser title="Olá, Daniela" buttonText="Ver meus pontos"/>
      </Header>
      <SectionOffer title="Promoções" className="offers">
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
      </SectionOffer>
      <Section title="Peça novamente" className="order-again">
        <Card src="./src/assets/160572915436349060139189700225-1080p.jpg" alt="Pizza Margherita" title="Margherita" price="R$ 93,00" buttonText="Adicionar a sacola"/>
      </Section>
      <Section title="As mais desejadas" className="most-wanted">
        <ProductCardMenu>
          <ProductCardItem 
            src="./src/assets/160572915436349060139189700225-1080p.jpg"
            alt="Pizza Margherita" title="Margherita" 
            description="Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado."
            price="R$ 93,00"
          />
          <ProductCardItem 
            src="./src/assets/16057285666390640459715899877-1080p.jpg"
            alt="Pizza Calabresa" title="Calabresa" 
            description="Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas."
            price="R$ 93,00"
          />
          <ProductCardItem 
            src="./src/assets/160572872237340571510501432084-1080p.jpg"
            alt="Pizza Calacheese" title="Calacheese" 
            description="Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial."
            price="R$ 93,00"
          />
        </ProductCardMenu>
      </Section>
      <Footer title="Pizzalivery" cnpj="35.609.792/0001-80" address="Rua Elias Mussa Fajuri, 421 - Rio Pequeno - São Paulo - SP" cep="05364-190"/>
    </>
  );
}

export default Home;
