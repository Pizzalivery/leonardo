import React from 'react';
import './styles/Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Seção Esquerda - Logo e Informações Legais */}
        <div className="footer-left">
          <h3 className="footer-title">Pizzalivery</h3>
          <p className="footer-copyright">
            © Copyright 2025 - Pizzalivery - Todos os direitos reservados
          </p>
          <p className="footer-info">
            CNPJ 35.609.792/0001-80 / Rua Elias Mussa Fajuri, 421 - Rio Pequeno - São Paulo 
            - SP CEP 05364-190
          </p>
        </div>

        {/* Seção Direita - Links */}
        <div className="footer-right">
          <nav className="footer-nav">
            <a href="#termos" className="footer-link">
              Termos e condições de uso
            </a>
            <a href="#privacidade" className="footer-link">
              Privacidade
            </a>
            <a href="#seguranca" className="footer-link">
              Dicas de segurança
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;