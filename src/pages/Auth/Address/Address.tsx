import { useState, useEffect } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";
import postAuthRegister, { type RegisterPayload } from "../../../api/postAuthRegister";

type AddressState = {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
};

function Address() {
    const navigate = useNavigate();
    const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();
    const location = useLocation();
    const addressState = location.state as AddressState;

    const [number, setNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTitle("");
        setNavigationHistory("/auth/search-cep");
    }, []);

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNumber(value);
    };

    const handleConclude = async () => {
        setIsLoading(true);

        try {
            const name = JSON.parse(sessionStorage.getItem("registerName") || "");
            const email = JSON.parse(sessionStorage.getItem("registerEmail") || "");
            const password = JSON.parse(sessionStorage.getItem("registerPassword") || "");
            const cpf = sessionStorage.getItem("registerCpf")
            ? JSON.parse(sessionStorage.getItem("registerCpf")!)
            : undefined;
            const phone = sessionStorage.getItem("registerPhone")
            ? JSON.parse(sessionStorage.getItem("registerPhone")!)
            : undefined;

            const payload: RegisterPayload = {
            name,
            email,
            password,
            role: "customer",
            cpf,
            phone,
            address: {
                cep: addressState?.cep,
                street: addressState?.street,
                number,
                neighborhood: addressState?.neighborhood,
                city: addressState?.city,
                state: addressState?.state,
            },
            };
            
            const response = await postAuthRegister(payload);
            sessionStorage.setItem("userToken", JSON.stringify(response.id));
            sessionStorage.setItem("user", JSON.stringify(response));

        } catch (error) {
            console.error("API indisponível, continuando fluxo local:", error);
        } finally {
            sessionStorage.setItem(
            "userAddress",
            JSON.stringify(`${addressState?.street}, ${number}`)
            );
            sessionStorage.setItem(
            "userName",
            sessionStorage.getItem("registerName") || ""
            );

            sessionStorage.removeItem("registerName");
            sessionStorage.removeItem("registerEmail");
            sessionStorage.removeItem("registerPassword");
            sessionStorage.removeItem("registerCpf");
            sessionStorage.removeItem("registerPhone");

            setIsLoading(false);
            navigate("/");
        }
    };

    return (
        <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
            <div className="flex flex-col gap-6 items-center justify-center">
                <div className="flex flex-col gap-2 text-center">
                    <Heading component="h1">Estamos quase lá</Heading>
                    <p className="text-typography-base text-sm">
                        Confira o endereço e adicione o número, se tiver complemento adicione também.
                    </p>
                </div>
                <p className="w-full text-sm">
                    CEP:  
                    <span className="text-brand-primary font-bold">
                        {addressState?.cep}
                    </span>
                </p>
                <Input
                    type="text"
                    name="street"
                    id="street"
                    label="Rua"
                    placeholder="Rua"
                    value={addressState?.street}
                    fullWidth
                    noLabel
                    disabled
                />
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Input
                        type="text"
                        name="number"
                        id="number"
                        label="Número"
                        placeholder="Número *"
                        onChange={handleNumberChange}
                        disabled={isLoading}
                    />
                    <Input
                        type="text"
                        name="complement"
                        id="complement"
                        label="Complemento"
                        placeholder="Complemento"
                        disabled={isLoading}
                    />
                </div>
                <Input
                    type="text"
                    name="neighborhood"
                    id="neighborhood"
                    label="Bairro"
                    placeholder="Bairro"
                    value={addressState?.neighborhood}
                    fullWidth
                    noLabel
                    disabled
                />
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <Input
                        type="text"
                        name="city"
                        id="city"
                        label="Cidade"
                        placeholder="Cidade"
                        value={addressState?.city}
                        disabled
                    />
                    <Input
                        type="text"
                        name="state"
                        id="state"
                        label="Estado"
                        placeholder="UF"
                        value={addressState?.state}
                        disabled
                    />
                </div>
                <Button
                    variant="primary"
                    onClick={handleConclude}
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? <LoaderCircle className="animate-spin" /> : "Concluir"}
                </Button>
            </div>
        </section>
    );
}

export default Address;