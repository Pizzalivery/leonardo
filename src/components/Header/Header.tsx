import { ChevronDown } from "lucide-react";
import "./Header.css"

interface HeaderProps {
    children: React.ReactNode;
}

interface DeliveryAddressProps {
    address: string
}

interface GreetingUserProps {
    title: string
    buttonText: string
}

export const Header = ({children}: HeaderProps) => {
    return (
        <header className="header">
            {children}
        </header>
    )
}

export const DeliveryAddress = ({address}: DeliveryAddressProps) => {
    return (
        <div className="delivery-address">
            <span>Entregando no endereço:</span>
            <span className="delivery-text">{address} </span>
            <button id="change-address">
                <ChevronDown />
                <span>Alterar</span>
            </button>
        </div>
    )
}

export const GreetingUser = ({title, buttonText}: GreetingUserProps) => {
    return (
        <div className="greeting-user">
            <p>{title}</p>
            <a href="">{buttonText}</a>
        </div>
    )
}

