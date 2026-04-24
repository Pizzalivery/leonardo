import { useEffect, useState } from "react";
import { mainMenuItems } from "../../utils/mainMenu";
import {
  Button,
  Carousel,
  CarouselItem,
  MainMenu,
  MainMenuItem,
  Navigation,
  Logo,
  OrderAgain,
  Heading,
  ProductItem,
  Footer,
  Dialog,
  DeliveryAddress,
  GrettingUser,
  CarouselSkeleton,
} from "../../components";

import MargueritaImage from "../../assets/160572915436349060139189700225-1080p.jpg";
import CalabresaImage from "../../assets/16057285666390640459715899877-1080p.jpg";
import CalacheeseImage from "../../assets/160572872237340571510501432084-1080p.jpg";
import getOffers from "../../api/getOffers";
import "./Home.css";

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

function Home() {
  const storedUser = JSON.parse(sessionStorage.getItem("user") || "null") || {};
  const storedAddress = JSON.parse(sessionStorage.getItem("userAddress") || "null");

  const [openModal, setOpenModal] = useState(false);
  const [offers, setOffers] = useState<Array<Offer>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddress] = useState(!!storedAddress);

  async function fetchOffers() {
    setIsLoading(true);
    try {
      const response = await getOffers();
      setOffers(response);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOffers();
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
        {showAddress && (
          <DeliveryAddress
            address={storedAddress}
            onClick={() => setOpenModal(true)}
          />
        )}

        <GrettingUser userName={storedUser.name} />
      </header>

      <section className="offers">
        <div className="container">
          <Heading component="h2">Promoções</Heading>
        </div>

        {isLoading ? (
          <CarouselSkeleton />
        ) : (
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
        )}
      </section>

      <OrderAgain
        title={mockOrderAgainData.title}
        image={mockOrderAgainData.image}
        name={mockOrderAgainData.name}
        price={mockOrderAgainData.price}
      />

      <article className="most-wanted">
        <Heading component="h2">As mais desejadas</Heading>
        <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
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
        <Button onClick={() => {}}>aa</Button>
        <Button variant="primary" fullWidth onClick={() => {}}>
          aa
        </Button>
      </Dialog>
    </>
  );
}

export default Home;