import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <h2 className="footer-logo">Pizzalivery</h2>
          <nav className="footer-links">
            <a href="#">Termos e condições de uso</a>
            <a href="#">Privacidade</a>
            <a href="#">Dicas de segurança</a>
          </nav>
        </div>
        
        <div className="footer-bottom">
          <p>© Copyright 2025 - Pizzalivery - Todos os direitos reservados</p>
          <p>CNPJ 35.609.792/0001-80 / Rua Elias Mussa Fajuri, 421 - Rio Pequeno - São Paulo - SP CEP 05364-190</p>
        </div>
      </div>
    </footer>
  );
};
