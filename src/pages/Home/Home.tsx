import { useEffect, useState } from "react";
import "./Home.css";
import { Navigation } from "../../components/Navigation/Navigation";
import { Header } from "../../components/Header/Header";
import { Offers } from "../../components/Offers/Offers";
import { OrderAgain } from "../../components/OrderAgain/OrderAgain";
import { MostWanted } from "../../components/MostWanted/MostWanted";
import { Footer } from "../../components/Footer/Footer";
import { Dialog } from "../../components/Dialog/Dialog";

const getData = async () => {
  try {
    const response = await fetch(
      "https://burgerlivery-esposito-api.onrender.com/offer-gallery"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching offers:", error);
    return [];
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

type MostWantedItem = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  price: string;
};

function Home() {
  const [offers, setOffers] = useState<Array<Offer>>([]);

  useEffect(() => {
    getData().then((data) => {
      setOffers(data);
    });
  }, []);

  const mostWantedItems: MostWantedItem[] = [
    {
      image: {
        src: "/src/assets/160572915436349060139189700225-1080p.jpg",
        alt: "Pizza Margherita",
      },
      title: "Margherita",
      description:
        "Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado.",
      price: "R$ 93,00",
    },
    {
      image: {
        src: "/src/assets/16057285666390640459715899877-1080p.jpg",
        alt: "Pizza Calabresa",
      },
      title: "Calabresa",
      description:
        "Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas.",
      price: "R$ 93,00",
    },
    {
      image: {
        src: "/src/assets/160572872237340571510501432084-1080p.jpg",
        alt: "Pizza Calacheese",
      },
      title: "Calacheese",
      description:
        "Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial.",
      price: "R$ 99,00",
    },
  ];

  return (
    <>
      <Navigation />
      <Header />
      <Offers offers={offers} />
      <OrderAgain />
      <MostWanted items={mostWantedItems} />
      <Footer />
      <Dialog title="Alterar endereço de entrega">
        <form>
          <div className="form-input">
            <label className="sr-only" htmlFor="cep">
              Cep
            </label>
            <input
              className="text-field"
              type="text"
              id="cep"
              name="cep"
              placeholder="Digite o CEP"
              defaultValue="09060-050"
            />
          </div>
          <div className="form-input">
            <label className="sr-only" htmlFor="street">
              Rua
            </label>
            <input
              className="text-field"
              type="text"
              id="street"
              name="street"
              required
              disabled
              defaultValue="Rua Xingu"
            />
          </div>
          <div className="form-grid">
            <div className="form-input input-small">
              <label className="sr-only" htmlFor="number">
                Número
              </label>
              <input
                className="text-field"
                type="text"
                id="number"
                name="number"
                required
                disabled
                defaultValue="12354"
              />
            </div>
            <div className="form-input">
              <label className="sr-only" htmlFor="additional">
                Complemento
              </label>
              <input
                className="text-field"
                type="text"
                id="additional"
                name="additional"
                required
                disabled
                defaultValue="Apto 101"
              />
            </div>
          </div>
          <div className="form-input">
            <label className="sr-only" htmlFor="neighborhood">
              Bairro
            </label>
            <input
              className="text-field"
              type="text"
              id="neighborhood"
              name="neighborhood"
              required
              disabled
              defaultValue="Vila Xingu"
            />
          </div>
          <div className="form-grid">
            <div className="form-input">
              <label className="sr-only" htmlFor="city">
                Cidade
              </label>
              <input
                className="text-field"
                type="text"
                id="city"
                name="city"
                required
                disabled
                defaultValue="São Paulo"
              />
            </div>
            <div className="form-input input-small">
              <label className="sr-only" htmlFor="state">
                Estado
              </label>
              <input
                className="text-field"
                type="text"
                id="state"
                name="state"
                required
                disabled
                defaultValue="SP"
              />
            </div>
          </div>
          <button className="button primary full">Cadastrar</button>
        </form>
      </Dialog>
    </>
  );
}

export default Home;
