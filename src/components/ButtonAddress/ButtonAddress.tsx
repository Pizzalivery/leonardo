import "./ButtonAddress.css";

interface ButtonAddressProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const ButtonAddress = ({ children, onClick }: ButtonAddressProps) => {
  return (
    <button className="ButtonAddress" onClick={onClick}>
        {children}      
    </button>
  );
};