import "./Footer.css";

export interface FooterProps {
  anoCopyright: string;
  endereco: string;
  cep: string;
  links: React.ReactNode;
}

export interface FooterLinkItemProps {
  name: string;
  link?: string;
}

export const Footer = ({ anoCopyright, endereco, cep, links }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="container">
        <h4 className="footer-title">Pizzalivery</h4>
        <div className="footer-wrapper">
          <section className="footer-info-section">
            <p className="footer-info">
              © Copyright {anoCopyright} - Pizzalivery - Todos os direitos
              reservados
            </p>
            <p className="footer-info">
              CNPJ 35.609.792/0001-80 / {endereco}
              <br />
              CEP {cep}
            </p>
          </section>
          <nav className="footer-nav-section">
            <ul className="footer-link">{links}</ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export const FooterLinkItem = ({ name, link = "" }: FooterLinkItemProps) => {
  return (
    <li className="footer-link-item">
      <a href={link}>{name}</a>
    </li>
  );
};
