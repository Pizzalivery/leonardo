import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Header } from "../../components/Header/Header";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import { OrderAgain } from "../../components/OrderAgain/OrderAgain";
import { MostWanted } from "../../components/MostWanted/MostWanted";
import { Footer } from "../../components/Footer/Footer";


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
      <Navbar />

      <Header />

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
          image={{
            src: "/src/assets/160572915436349060139189700225-1080p.jpg",
            alt: "Pizza Margherita"
          }}
          title="Margherita"
          price="R$ 93,00"
        />

      <MostWanted>
        <></>
      </MostWanted>

      <Footer />
    </>
  );
}

export default Home;