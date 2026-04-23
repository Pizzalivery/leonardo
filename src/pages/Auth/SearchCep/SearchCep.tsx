import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import getAddressByCep from "../../../api/getAddressByCep";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function SearchCep(){
    const navigate = useNavigate();
    const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

    const [cep, setCep] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTitle("")
        setNavigationHistory("")
    }, [])

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCep(value);
    }

    async function fetchAddressByCep() {
        setIsLoading(true);
        try {
            const addressData = await getAddressByCep(cep);

            navigate("/auth/address", {
                state: {
                    cep: addressData.cep,
                    street: addressData.logradouro,
                    neighborhood: addressData.bairro,
                    city: addressData.localidade,
                    state: addressData.uf
                }
            });
        } catch (error) {
            if (error instanceof Error) {
                const parsedError = JSON.parse(error.message);
                alert(parsedError.message || "CEP não encontrado, tente novamente");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearchCep = () => {
        fetchAddressByCep();
    };

    const handleSkip = () => {
        navigate("/")
    }

    return (
        <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
            <div className="flex flex-col gap-6 items-center justify-center">
                <div className="flex flex-col gap-2 text-center">
                    <Heading component="h1">Qual seu endereço</Heading>
                    <p className="text-typography-base text-sm">
                        Informe seu CEP para adicionar seu endereço.
                    </p>
                </div>

                <Input
                    type="text"
                    name="cep"
                    id="cep"
                    label="CEP"
                    placeholder="Digite seu CEP *"
                    onChange={handleCepChange}
                    fullWidth
                    noLabel
                    disabled={isLoading}
                />

                <Button
                    variant="primary"
                    onClick={handleSearchCep}
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? <LoaderCircle className="animate-spin" /> : "Buscar endereço"}
                </Button>
                <Button
                    variant="default"
                    onClick={handleSkip}
                    fullWidth
                    disabled={isLoading}
                >
                    Pular
                </Button>
            </div>
        </section>
    );
}

export default SearchCep;