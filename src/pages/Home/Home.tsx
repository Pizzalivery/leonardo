import { useEffect, useState } from "react";

import { Carousel, CarouselItem } from "../../components/Carousel/Carousel";
import {
  Navigation,
  NavigationMenuItem,
} from "../../components/Navigation/Navigation";
import { HomeIcon, Menu, ReceiptText, Search, UserRound } from "lucide-react";
import { Header } from "../../components/Header/Header";
import { OffersSection } from "../../components/OffersSection/OffersSection";
import { OrderAgain } from "../../components/OrderAgain/OrderAgain";
import fotoMargherita from "../../assets/160572915436349060139189700225-1080p.jpg";
import fotoCalabresa from "../../assets/16057285666390640459715899877-1080p.jpg";
import fotoCalacheese from "../../assets/160572872237340571510501432084-1080p.jpg";
import { TopSales, TopSalesItem } from "../../components/TopSales/TopSales";
import { Footer, FooterLinkItem } from "../../components/Footer/Footer";
import {
  Dialog,
  DialogFormGrid,
  DialogFormInput,
} from "../../components/Dialog/Dialog";
import { Button } from "../../components/Button/Button";

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
      <Navigation>
        <NavigationMenuItem
          variant="active"
          name="Início"
          icon={<HomeIcon />}
        />
        <NavigationMenuItem name="Busca" icon={<Search />} />
        <NavigationMenuItem name="Menu" icon={<Menu />} />
        <NavigationMenuItem name="Pedidos" icon={<ReceiptText />} />
        <NavigationMenuItem name="Perfil" icon={<UserRound />} />
      </Navigation>

      <Header userName="Daniela" enderecoEntrega=" Rua Mesquita, 248 " />

      <OffersSection
        title={"Promoções"}
        items={
          <Carousel>
            {offers.map((offer) => (
              <CarouselItem
                key={offer.id}
                title={offer.title}
                description={offer.description}
                image={offer.image}
              />
            ))}
            {offers.map((offer) => (
              <CarouselItem
                key={offer.id}
                title={offer.title}
                description={offer.description}
                image={offer.image}
              />
            ))}
            {offers.map((offer) => (
              <CarouselItem
                key={offer.id}
                title={offer.title}
                description={offer.description}
                image={offer.image}
              />
            ))}
            {offers.map((offer) => (
              <CarouselItem
                key={offer.id}
                title={offer.title}
                description={offer.description}
                image={offer.image}
              />
            ))}
          </Carousel>
        }
      />

      <OrderAgain item="Margherita" price="R$ 93,00" img={fotoMargherita} />

      <TopSales>
        <TopSalesItem
          name="Margherita"
          description="Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite  aromatizado."
          img={fotoMargherita}
          price="R$ 93,00"
        />
        <TopSalesItem
          name="Calabresa"
          description="Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas."
          img={fotoCalabresa}
          price="R$ 93,00"
        />
        <TopSalesItem
          name="Calacheese"
          description="Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial."
          img={fotoCalacheese}
          price="R$ 99,00"
        />
      </TopSales>

      <Footer
        anoCopyright="2026"
        endereco="Rua Doutor Olavo Egidio, 554 - São Paulo"
        cep="02037-001"
        links={
          <>
            <FooterLinkItem name="Termos e condições de uso" />
            <FooterLinkItem name="Privacidade" />
            <FooterLinkItem name="Dicas de segurança" />
          </>
        }
      />

      <Dialog title="Alterar endereço de entrega">
        <DialogFormInput
          value="09060-050"
          labelFor="cep"
          labelName="Cep"
          placeholder="Digite o CEP"
          disabled={false}
          required={false}
        />
        <DialogFormInput value="Rua Xingu" labelFor="street" labelName="Rua" />
        <DialogFormGrid>
          {
            <>
              <DialogFormInput
                value="12354"
                labelFor="number"
                labelName="Número"
                variant="input-small"
              />
              <DialogFormInput
                value="Apto 101"
                labelFor="additional"
                labelName="Complemento"
              />
            </>
          }
        </DialogFormGrid>
        <DialogFormInput
          value="Vila Xingu"
          labelFor="neighborhood"
          labelName="Bairro"
        />
        <DialogFormGrid>
          {
            <>
              <DialogFormInput
                value="São Paulo"
                labelFor="city"
                labelName="Cidade"
              />
              <DialogFormInput
                value="SP"
                labelFor="state"
                labelName="Estado"
                variant="input-small"
              />
            </>
          }
        </DialogFormGrid>
        <Button
          variant="primary"
          size="full"
          onClick={() => {
            return;
          }}
        >
          Cadastrar
        </Button>
      </Dialog>
    </>
  );
}

export default Home;
