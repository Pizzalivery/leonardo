import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function AddCpf() {
    const navigate = useNavigate();
    const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

    const [cpf, setCpf] = useState("");

    useEffect(() => {
        setTitle("");
        setNavigationHistory("");
    }, []);

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCpf(value);
    };

    const handleContinue = () => {
        sessionStorage.setItem("registerCpf", JSON.stringify(cpf));
        navigate("/auth/add-phone");
    };

    const handleSkip = () => {
        navigate("/");
    };

    return (
        <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
            <div className="flex flex-col gap-6 items-center justify-center">
                <div className="flex flex-col gap-2 text-center">
                    <Heading component="h1">Parabéns! Sua conta foi criada</Heading>
                    <p className="text-typography-base text-sm">
                        Finalize seu cadastro adicionando mais informações.
                    </p>
                </div>
                <Input
                    type="text"
                    name="cpf"
                    id="cpf"
                    label="CPF"
                    placeholder="Digite seu CPF *"
                    onChange={handleCpfChange}
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

export default AddCpf;