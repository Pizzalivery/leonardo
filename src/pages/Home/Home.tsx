import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";

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
      <Link to="/">Home</Link>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Login
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Pedidos
      </NavLink>
    </>
  );
}

export default Home;
