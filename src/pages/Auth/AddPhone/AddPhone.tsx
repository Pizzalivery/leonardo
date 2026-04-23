import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import postAuthPhone, { type PhonePayload } from "../../../api/postAuthPhone";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddPhone(){
    const navigate = useNavigate();
    const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTitle("");
        setNavigationHistory("")
    },[])

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPhone(value);
    }

    async function fetchAddPhone(payload: PhonePayload) {
        setIsLoading(true);

        try {
            const token = JSON.parse(sessionStorage.getItem("token") || "");

            await postAuthPhone(payload, token)

            navigate("/auth/search-cep")

        } catch (error) {
            if (error instanceof Error) {
                const parsedError = JSON.parse(error.message);

                if (parsedError.statusCode === 400){
                    alert("Telefone inválido, tente novamente")
                }

                if (parsedError.statusCode === 500) {
                    alert("Erro no servidor, tente novamente mais tarde")
                }
            }
            
        } finally {
            setIsLoading(false);
        }
    }

    const handleContinue = () => {
        const payload: PhonePayload = {
            phone,
        };
        fetchAddPhone(payload);
    }

    const handleSkip = () => {
        navigate("/");
    }

    return (
        <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
            <div className="flex flex-col gap-6 items-center justify-center">

                <div className="flex flex-col gap-2 text-center">
                    <Heading component="h1">Adicione seu telefone</Heading>
                    <p className="text-typography-base text-sm">
                        Adicione seu telefone para um canal de contato mais agilidade e praticidade.
                    </p>
                </div>

                <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    label="Telefone"
                    placeholder="DDD + Número *"
                    onChange={handlePhoneChange}
                    fullWidth
                    noLabel
                    disabled={isLoading}
                />

                <Button
                    variant="primary"
                    onClick={handleContinue}
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? <LoaderCircle className="animate-spin" /> : "Continuar"}
                </Button>

                <button
                    onClick={handleSkip}
                    className="text-typography-base font-black text-base cursor-pointer"
                >
                    Pular
                </button>

            </div>
        </section>
    );

}

export default AddPhone;
