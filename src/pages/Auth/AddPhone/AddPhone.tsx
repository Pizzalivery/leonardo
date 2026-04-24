import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddPhone(){
    const navigate = useNavigate();
    const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

    const [phone, setPhone] = useState("");

    useEffect(() => {
        setTitle("");
        setNavigationHistory("");
    }, [])

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPhone(value);
    }

    const handleContinue = () => {
        sessionStorage.setItem("registerPhone", JSON.stringify(phone));
        navigate("/auth/search-cep");
    }

    const handleSkip = () => {
        navigate("/")
    }

    return (
        <section>
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
                />
                <Button
                    variant="primary"
                    onClick={handleContinue}
                    fullWidth
                >
                    Continuar
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