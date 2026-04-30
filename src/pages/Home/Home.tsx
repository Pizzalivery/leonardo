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
  Input,
  ErrorLabel,
} from "../../components";

import MargueritaImage from "../../assets/160572915436349060139189700225-1080p.jpg";
import CalabresaImage from "../../assets/16057285666390640459715899877-1080p.jpg";
import CalacheeseImage from "../../assets/160572872237340571510501432084-1080p.jpg";
import getOffers from "../../api/getOffers";
import "./Home.css";

import { useForm } from "react-hook-form";
import type { Address } from "../../types";

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

type AddressForm = {
  cep: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
};

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [offers, setOffers] = useState<Array<Offer>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<Address | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>();

  const handleOnSubmit = (data: AddressForm) => {
    console.log("Dados do formulário:", data);
  };

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
    if (!userData) {
      const userStorage = sessionStorage.getItem("user");
      if (userStorage) {
        const parsedUserData = JSON.parse(userStorage);
        setUserData(parsedUserData.name);
        setUserAddress(parsedUserData.address);
      }
    }
  }, []);

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
        <DeliveryAddress
          address={userAddress}
          onClick={() => setOpenModal(true)}
        />
        <GrettingUser userName={userData} />
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
        title="Alterar endereço"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div>
            <Input
              type="text"
              id="cep"
              label="CEP"
              // name="cep"
              placeholder="Digite o CEP"
              noLabel
              {...register("cep", {
                required: "CEP é obrigatório",
                pattern: {
                  // value: /^[0-9]+$/,
                  value: /^[0-9]{5}-?[0-9]{3}$/,
                  message: "Apenas números são permitidos",
                },
                max: 9,
              })}
            />
            {errors.cep && (
              <ErrorLabel id="cep">{errors.cep.message}</ErrorLabel>
            )}
          </div>
          <div>
            <Input
              type="text"
              id="street"
              label="Rua"
              // name="street"
              placeholder="Rua"
              noLabel
              {...register("street", { required: "Rua é obrigatório" })}
            />
            {errors.street && (
              <ErrorLabel id="cep">{errors.street.message}</ErrorLabel>
            )}
          </div>
          <div className="flex gap-2">
            <div>
              <Input
                type="text"
                id="number"
                label="Número"
                // name="number"
                placeholder="Número"
                noLabel
                {...register("number", { required: "Número é obrigatório" })}
              />
              {errors.number && (
                <ErrorLabel id="cep">{errors.number.message}</ErrorLabel>
              )}
            </div>
            <div className="flex-none">
              <Input
                type="text"
                id="complement"
                label="Complemento"
                // name="complement"
                placeholder="Complemento"
                noLabel
                {...register("complement")}
              />
            </div>
          </div>
          <div>
            <Input
              type="text"
              id="neighborhood"
              label="Bairro"
              // name="neighborhood"
              placeholder="Bairro"
              noLabel
              {...register("neighborhood", {
                required: "Bairro é obrigatório",
              })}
            />
            {errors.neighborhood && (
              <ErrorLabel id="cep">{errors.neighborhood.message}</ErrorLabel>
            )}
          </div>
          <div className="flex gap-2">
            <div className="flex-none">
              <Input
                type="text"
                id="city"
                label="Cidade"
                // name="city"
                placeholder="Cidade"
                noLabel
                {...register("city", { required: "Cidade é obrigatório" })}
              />
              {errors.city && (
                <ErrorLabel id="cep">{errors.city.message}</ErrorLabel>
              )}
            </div>
            <div className="flex-1">
              <Input
                type="text"
                id="state"
                label="Estado"
                // name="state"
                placeholder="estado"
                noLabel
                {...register("state", {
                  required: "Estado é obrigatório",
                  pattern: {
                    value: /^[A-Za-zÀ-ÿ\s]+$/,
                    message: "Apenas letras são permitidas",
                  },
                })}
              />
              {errors.state && (
                <ErrorLabel id="cep">{errors.state.message}</ErrorLabel>
              )}
            </div>
          </div>

          <Button variant="primary" fullWidth onClick={() => {}}>
            Cadastrar
          </Button>
        </form>
      </Dialog>
    </>
  );
}

export default Home;
