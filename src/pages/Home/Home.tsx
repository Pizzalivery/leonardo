import { useEffect, useState } from "react";

import { mainMenuItems } from "../../utils/mainMenu";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import { MainMenu, MainMenuItem } from "../../components/MainMenu/MainMenu";
import { Navigation } from "../../components/Navigation/Navigation";
import { Logo } from "../../components/Logo/Logo";
import { OrderAgain } from "../../components/OrderAgain/OrderAgain";
import { Heading } from "../../components/Heading/Heading";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { Footer } from "../../components/Footer/Footer";
import "./Home.css";

import MargueritaImage from "../../assets/160572915436349060139189700225-1080p.jpg";
import CalabresaImage from "../../assets/16057285666390640459715899877-1080p.jpg";
import CalacheeseImage from "../../assets/160572872237340571510501432084-1080p.jpg";
import { Dialog } from "../../components/Dialog/Dialog";
import { DeliveryAddress } from "../../components/DeliveryAddress/DeliveryAddress";
import { GrettingUser } from "../../components/GrettingUser/GrettingUser";

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

const mockOrderAgainData = {
  title: "Peça novamente",
  name: "Margherita",
  price: "93,00",
  image: MargueritaImage,
};

const mockMostWantedData = [
  {
    id: 1,
    title: "Margherita",
    description:
      "Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado.",
    image: MargueritaImage,
    price: "93,00",
  },
  {
    id: 2,
    title: "Calabresa",
    description:
      "Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas.",
    image: CalabresaImage,
    price: "93,00",
  },
  {
    id: 3,
    title: "Calacheese",
    description:
      "Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial.",
    image: CalacheeseImage,
    price: "99,00",
  },
];

const mockUserData = {
  userName: "Daniela",
  address: "Rua Mesquita, 248",
};

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [offers, setOffers] = useState<Array<Offer>>([]);

  useEffect(() => {
    getData().then((data) => {
      setOffers(data);
    });
  }, []);

  return (
    <>
      <Navigation>
        <Logo />
        <MainMenu>
          {mainMenuItems.map((item) => (
            <MainMenuItem key={item.id} link={item.link} icon={item.icon}>
              {item.label}
            </MainMenuItem>
          ))}
        </MainMenu>
      </Navigation>
      <header className="header">
        <DeliveryAddress
          address={mockUserData.address}
          onClick={() => setOpenModal(true)}
        />
        <GrettingUser userName={mockUserData.userName} />
      </header>
      <section className="offers">
        <div className="container">
          <Heading component="h2">Promoções</Heading>
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
      <OrderAgain
        title={mockOrderAgainData.title}
        image={mockOrderAgainData.image}
        name={mockOrderAgainData.name}
        price={mockOrderAgainData.price}
      />
      <article className="most-wanted">
        <Heading component="h2">As mais desejadas</Heading>
        <div className="most-wanted-wrapper">
          {mockMostWantedData.map((item) => (
            <ProductItem
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              price={item.price}
            />
          ))}
        </div>
      </article>
      <Footer />
      <Dialog
        title="Título do Dialog"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        ola
      </Dialog>
    </>
  );
}

export default Home;
