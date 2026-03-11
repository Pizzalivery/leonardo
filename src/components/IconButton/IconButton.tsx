import "./IconButton.css";

interface IconButtonProps {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const IconButton = ({ children, label, onClick }: IconButtonProps) => {
  return (
    <button className="icon-button" aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
};
