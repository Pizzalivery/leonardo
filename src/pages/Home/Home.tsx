import { useEffect, useState } from "react";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import { AddressDialog } from "../../components/AddressDialog/AddressDialog";
import { Header } from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { OrderAgain } from "../../components/OrderAgain/OrderAgain";
import { MostWanted, MostWantedItem } from "../../components/MostWanted/MostWanted";
import { Footer } from "../../components/Footer/Footer";


import margheritaImg from "../../assets/160572915436349060139189700225-1080p.jpg";
import calabresaImg from "../../assets/16057285666390640459715899877-1080p.jpg";
import calacheeseImg from "../../assets/160572872237340571510501432084-1080p.jpg";

type Offer = {
  id: number;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

const getData = async (): Promise<Array<Offer>> => {
  try {
    const response = await fetch(
      "https://burgerlivery-esposito-api.onrender.com/offer-gallery",
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar ofertas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching offers:", error);
    return [];
  }
};

function Home() {
  const [offers, setOffers] = useState<Array<Offer>>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getData().then((data) => {
      setOffers(data);
    });
  }, []);

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <Navigation />
      <Header onOpenDialog={handleOpenDialog} />

      <main>
        <section className="container">
          <h2 className="section-title">Promoções</h2>
        </section>
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
        <OrderAgain
          title="Margherita"
          price="R$ 93,00"
          image={{
            src: "" + margheritaImg,
            alt: "Pizza Margherita",
          }}
        />
        <MostWanted>
          <MostWantedItem
            title="Margherita"
            description="Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado."
            price="R$ 93,00"
            image={{
              src: margheritaImg,
              alt: "Pizza Margherita",
            }}
          />

          <MostWantedItem
            title="Calabresa"
            description="Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas."
            price="R$ 93,00"
            image={{
              src: calabresaImg,
              alt: "Pizza Calabresa",
            }}
          />

          <MostWantedItem
            title="Calacheese"
            description="Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial."
            price="R$ 99,00"
            image={{
              src: calacheeseImg,
              alt: "Pizza Calacheese",
            }}
          />
        </MostWanted>
      </main>
      <Footer />

      <AddressDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

export default Home;
