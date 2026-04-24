import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function Register() {
    const navigate = useNavigate();
    const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        setTitle("");
        setNavigationHistory("/auth/login");
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setName(value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setConfirmPassword(value);
    };

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        sessionStorage.setItem("user", JSON.stringify({ name, email }));
        sessionStorage.setItem("registerName", JSON.stringify(name));
        sessionStorage.setItem("registerEmail", JSON.stringify(email));
        sessionStorage.setItem("registerPassword", JSON.stringify(password));

        navigate("/auth/add-cpf");
    };

    return (
        <section className="grid grid-rows-[1fr_auto] gap-4 h-[calc(100vh-88px)]">
            <div className="flex flex-col gap-6 items-center justify-center">
                <div className="flex flex-col gap-2 text-center">
                    <Heading component="h1">Crie sua conta</Heading>
                    <p className="text-typography-base text-sm">
                        É rápido e fácil. Insira seus dados para começar.
                    </p>
                </div>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    label="Nome completo"
                    placeholder="Seu nome completo"
                    onChange={handleNameChange}
                    fullWidth
                    noLabel
                />
                <Input
                    type="email"
                    name="email"
                    id="email"
                    label="Email"
                    placeholder="email *"
                    onChange={handleEmailChange}
                    fullWidth
                    noLabel
                />
                <Input
                    type="password"
                    name="password"
                    id="password"
                    label="Senha"
                    placeholder="Senha *"
                    onChange={handlePasswordChange}
                    fullWidth
                    noLabel
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    label="Confirmar senha"
                    placeholder="Confirmar senha *"
                    onChange={handleConfirmPasswordChange}
                    fullWidth
                    noLabel
                />
                <Button
                    variant="primary"
                    onClick={handleRegister}
                    fullWidth
                >
                    Criar conta
                </Button>
            </div>
        </section>
    );
}

export default Register;