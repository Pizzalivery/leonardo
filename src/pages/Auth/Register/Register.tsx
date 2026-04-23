import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Button, Heading, Input } from "../../../components";
import postAuthRegister, { type RegisterPayload } from "../../../api/postAuthRegister";
import { LoaderCircle } from "lucide-react";
import { type AuthLayoutContext } from "../../../components/Layouts/AuthLayout/AuthLayout";

function Register(){
    const navigate = useNavigate();

    const { setTitle, setNavigationHistory } = useOutletContext<AuthLayoutContext>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTitle("Criar conta");
        setNavigationHistory("/auth/login");
    },[])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setName(value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPassword(value);
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setConfirmPassword(value);
    }

    async function fetchregister(payload: RegisterPayload){
        setIsLoading(true);

        try {
            const response = await postAuthRegister(payload);

            sessionStorage.setItem("userToken", JSON.stringify(response.accessToken));
            sessionStorage.setItem("user", JSON.stringify(response.user));

            navigate("/auth/add-cpf");

        } catch (error) {
            if (error instanceof Error) {
                const parsedError = JSON.parse(error.message);

                if (parsedError.statusCode === 409) {
                    alert("Este e-mail já está cadastrado")
                }

                if (parsedError.statusCode === 500) {
                    alert("Erro interno do servidor. Tente novamente mais tarde")
                }
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert("As senhas não coincidem");
            return;
        }

        const payload: RegisterPayload = {
            name,
            email,
            password
        };

        fetchregister(payload);
    }

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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                />

                <Button
                    variant="primary"
                    onClick={handleRegister}
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? <LoaderCircle className="animate-spin" /> : "Criar conta"}
                </Button>

            </div>
        </section>
    );
}

export default Register;
