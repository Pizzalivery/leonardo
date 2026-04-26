import "./Navigation.css";

interface NavigationProps {
  children: React.ReactNode;
}

export const Navigation = ({ children }: NavigationProps) => {
  return (
    <nav id="navigation">
      <div className="navigation-wrapper">{children}</div>
    </nav>
  );
};
