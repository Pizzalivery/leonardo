import { useNavigate, useOutletContext } from "react-router";
import type { ProductLayoutContext } from "../../../components/Layouts/ProductLayout/ProductLayout";
import {
  Button,
  Card,
  Dialog,
  Heading,
  PixPayment,
  RadioCard,
} from "../../../components";
import { useContext, useEffect, useState } from "react";
import type {
  Address,
  OrderContextProps,
  PaymentMethod,
  PixData,
} from "../../../types";
import { OrderContext } from "../../../context/OrderContext";
import { formatCurrency } from "../../../utils/numberFormat";
import getPaymentMethods from "../../../api/getPaymentMethods";
import postOrders from "../../../api/postOrders";
import postGeneratePix from "../../../api/postGeneratePix";

function CartPayment() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<ProductLayoutContext>();

  const navigate = useNavigate();

  const { orders, totalValue, delveryFee } =
    useContext<OrderContextProps>(OrderContext);

  const ponitsValue = 0;

  setTitle("Pagamento");
  setNavigationHistory("/cart");

  const [userId, setUserId] = useState<string>("");
  const [userAddress, setUserAddress] = useState<Address>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();
  const [isPaymentMethodsLoading, setIsPaymentMethodsLoading] = useState(false);

  const [orderLoading, setOrderLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [pixData, setPixData] = useState<PixData>();

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  async function fetchPaymentMethods() {
    setIsPaymentMethodsLoading(true);
    try {
      const response = await getPaymentMethods();
      const filteredMethods = response.filter(
        (method: PaymentMethod) => method.available === true,
      ); // Filter => Retorna um novo array

      setPaymentMethods(filteredMethods);
    } catch (error) {
      console.error("Erro ao buscar métodos de pagamento:", error);
    } finally {
      setIsPaymentMethodsLoading(false);
    }
  }

  async function fetchCreateOrder() {
    setOrderLoading(true);

    const payload = {
      userId: userId,
      pizzaIds: orders
        .filter((item) => item.category === "pizza")
        .map((item) => item.id),
      beverageIds: orders
        .filter((item) => item.category === "beverage")
        .map((item) => item.id),
      dessertIds: orders
        .filter((item) => item.category === "dessert")
        .map((item) => item.id),
      totalValue: totalValue + delveryFee - ponitsValue,
      deliveryAddress: userAddress as Address,
    };

    try {
      const response = await postOrders(payload);
      return response;
      console.log("Resposta da API ao criar pedido:", response);
      navigate("/orders");
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    } finally {
      setOrderLoading(false);
    }
  }

  async function fetchGeneratePix() {
    const payload = {
      amount: totalValue + delveryFee - ponitsValue,
    };

    try {
      const response = await postGeneratePix(payload);
      setPixData(response);
    } catch (error) {
      console.error("Erro ao gerar Pix:", error);
    } finally {
      console.log("Processo de geração de Pix finalizado");
    }
  }

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleChangePaymentMethod = (value: string) => {
    setSelectedPaymentMethod(value);
  };

  const handlePixPayment = () => {
    setIsOpen(true);
    fetchGeneratePix();
  };

  const handleCreditCardPayment = () => {
    setIsOpen(true);
  };

  const handleCreateOrder = () => {
    switch (selectedPaymentMethod) {
      case "credit_card":
        handleCreditCardPayment();
        break;
      case "cash_on_delivery":
        fetchCreateOrder();
        break;
      case "pix":
        handlePixPayment();
        break;
      default:
        console.error("Método de pagamento não suportado");
    }
  };

  // useEffect(() => {
  //   if (orders.length === 0) {
  //     navigate("/");
  //     return;
  //   }
  // }, []);

  useEffect(() => {
    if (!userAddress) {
      const userStorage = sessionStorage.getItem("user");
      if (userStorage) {
        const userData = JSON.parse(userStorage);
        setUserId(userData?.id);
        setUserAddress(userData?.address);
      }
    }
  }, []);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return (
    <>
      <article className="px-5 grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
        <div>
          <section className="mb-4">
            <Heading component="h2">Endereço de entrega</Heading>
            <Card>
              <address className="text-md text-typography-light not-italic">
                {userAddress?.street}, {userAddress?.number},
                {userAddress?.neighborhood}, <br />
                {userAddress?.city} - {userAddress?.state} CEP{" "}
                {userAddress?.cep}
              </address>
            </Card>
          </section>
          <section className="mb-4">
            <Heading component="h2">Forma de Pagamento</Heading>
            {isPaymentMethodsLoading ? (
              <div className="skeleton-image h-16 bg-gray-200 animate-pulse rounded-lg mb-2" />
            ) : (
              paymentMethods.map((method: PaymentMethod) => (
                <RadioCard
                  key={method.id}
                  group="payment-method"
                  id={method.type}
                  label={method.name}
                  value={selectedPaymentMethod}
                  onChange={() => handleChangePaymentMethod(method.type)}
                />
              ))
            )}
          </section>
          <section>
            <Heading component="h2">Resumo do pedido</Heading>
            <Card>
              <ul className="text-md text-typography-light">
                <li className="flex justify-between mb-2">
                  Produtos (0)
                  <span>{formatCurrency(totalValue)}</span>
                </li>
                <li className="flex justify-between mb-2">
                  Taxa de entrega
                  <span>{formatCurrency(delveryFee)}</span>
                </li>
                <li className="flex justify-between mb-2">
                  Desconto (pontos)
                  <span>{formatCurrency(ponitsValue)}</span>
                </li>
              </ul>
              <hr className="text-interface-base" />
              <p className="flex justify-between font-bold text-lg text-typography-dark mt-2">
                Total{" "}
                <span>
                  {formatCurrency(totalValue + delveryFee - ponitsValue)}
                </span>
              </p>
            </Card>
          </section>
        </div>
        <div>
          <div className="py-4">
            <Button
              fullWidth
              onClick={handleCreateOrder}
              variant="primary"
              disabled={
                !selectedPaymentMethod ||
                isPaymentMethodsLoading ||
                orderLoading
              }
            >
              Realizar pedido
            </Button>
          </div>
        </div>
      </article>
      <Dialog
        title={
          selectedPaymentMethod === "pix"
            ? "Pagamento via PIX"
            : "Pagamento com Cartão"
        }
        open={isOpen}
        onClose={handleCloseDialog}
      >
        {selectedPaymentMethod === "pix" ? (
          <PixPayment pixData={pixData} />
        ) : (
          <p className="text-center text-typography-light">
            Aqui você pode integrar a funcionalidade de pagamento com cartão de
            crédito usando uma biblioteca ou API de terceiros, como Stripe ou
            PayPal.
          </p>
        )}
      </Dialog>
    </>
  );
}

export default CartPayment;
