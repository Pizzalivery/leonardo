import { useEffect, useState } from "react";
import Promotions from "../../components/Promotions/Promotions";
import OrderAgain from "../../components/OrderAgain/OrderAgain";
import Favorites from "../../components/Favorites/Favorites";

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

  console.log(offers);

  return (
    <>
      <Promotions />
      <OrderAgain />
      <Favorites />
    </>
  );
}

export default Home;
