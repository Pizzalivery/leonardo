import "./Footer.css";

export interface FooterData {
  anoCopyright: string;
  endereco: string;
  cep: string;
  links: React.ReactNode;
}

interface LinkProps {
  name: string;
  href?: string;
}

export function Footer({ anoCopyright, endereco, cep, links }: FooterData) {
  return (
    <footer className="footer">
      <div className="container">
        <h4 className="footer-title">Pizzalivery</h4>
        
        <div className="footer-wrapper">
          <address className="footer-info-section">
            <p className="footer-legal">
              © {anoCopyright} Pizzalivery. Todos os direitos reservados.
            </p>
            <p className="footer-location">
              CNPJ 35.609.792/0001-80
              <span className="address-divider"> | </span> 
              {endereco}
              <br />
              <strong>CEP:</strong> {cep}
            </p>
          </address>

          <nav className="footer-nav-section" aria-label="Links úteis">
            <ul className="footer-link-list">
              {links}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function FooterLinkItem({ name, href = "#" }: LinkProps) {
  return (
    <li className="footer-link-item">
      <a href={href} className="footer-anchor">
        {name}
      </a>
    </li>
  );
}