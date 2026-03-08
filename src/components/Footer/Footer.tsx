import "./Footer.css"

interface FooterProps {
    title: string
    cnpj: string
    address: string
    cep: string
}

export const Footer = ({title, cnpj, address, cep}: FooterProps) => {
    return (
        <footer className="footer">
            <div className="container">
                <h4 className="footer-title">{title}</h4>
                <div className="footer-wrapper">
                    <section className="footer-info-section">
                        <p className="footer-info">© Copyright 2025 - {title} - Todos os direitos reservados</p>
                        <p className="footer-info">CNPJ {cnpj} / {address}<br />CEP {cep}</p>
                    </section>
                    <nav className="footer-nav-section">
                        <ul className="footer-link">
                            <li className="footer-link-item"><a href="">Termos e condições de uso</a></li>
                            <li className="footer-link-item"><a href="">Privacidade</a></li>
                            <li className="footer-link-item"><a href="">Dicas de segurança</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

{/* <section className="footer-info-section">
                        <p className="footer-info">© Copyright 2025 - Pizzalivery - Todos os direitos reservados</p>
                        <p className="footer-info">CNPJ 35.609.792/0001-80 / Rua Elias Mussa Fajuri, 421 - Rio Pequeno - São Paulo - SP<br />CEP 05364-190</p>
                    </section>
                    <nav className="footer-nav-section">
                        <ul className="footer-link">
                            <li className="footer-link-item"><a href="">Termos e condições de uso</a></li>
                            <li className="footer-link-item"><a href="">Privacidade</a></li>
                            <li className="footer-link-item"><a href="">Dicas de segurança</a></li>
                        </ul>
                    </nav> */}