import { Header } from "../../components/Header/Header";
import { UserGreeting } from "../../components/UserGreeting/UserGreeting";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { PromoCard } from "../../components/PromoCard/PromoCard";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Footer } from "../../components/Footer/Footer";
import "./Home.css";

// Importando as imagens da sua pasta assets (verifique se os nomes dos arquivos estão corretos)
import pizzaDobro from "../../assets/depositphotos_15951851-stock-photo-fresh-pizza.webp";
import pizzaCoca from "../../assets/pizza_coca_cola.png";
import pizzaSobremesa from "../../assets/pizza_sobremesa.png";
import margheritaImg from "../../assets/160572915436349060139189700225-1080p.jpg";
import calabresaImg from "../../assets/16057285666390640459715899877-1080p.jpg"
import calacheese from "../../assets/160572872237340571510501432084-1080p.jpg"
function Home() {
  return (
    <div className="home-page">
      {/* 1. Cabeçalho */}
      <Header />
      
      <main className="main-content">
        {/* 2. Saudação e Endereço */}
        <UserGreeting 
          name="Daniela" 
          points={100} 
          address="Rua Mesquita, 248" 
        />

        {/* 3. Seção de Promoções (Carrossel) */}
        <SectionTitle title="Promoções" />
        <div className="promo-carousel">
          <PromoCard 
            title="Pizza em dobro" 
            description="Compre uma pizza e ganhe outra" 
            image={pizzaDobro} 
          />
          <PromoCard 
            title="Pizza de Calabresa + Coca-Cola" 
            description="Pizza + Coca-Cola as Quintas" 
            image={pizzaCoca} 
          />
          <PromoCard 
            title="Quarta feira - Pizza + Sobremesa" 
            description="As quartas compre uma pizza e leve a sobremesa de graça" 
            image={pizzaSobremesa} 
          />
          <PromoCard 
            title="Pizza de Calabresa + Coca-Cola" 
            description="Pizza + Coca-Cola as quintas" 
            image={pizzaCoca} 
          />
        </div>

        {/* 4. Seção Peça Novamente */}
        <SectionTitle title="Peça novamente" />
        <div className="section-container">
          <ProductCard 
            title="Margherita" 
            price={93.00} 
            image={margheritaImg} 
            variant="horizontal"
          />
        </div>

        {/* 5. Seção As Mais Desejadas (Grid) */}
        <SectionTitle title="As mais desejadas" />
        <div className="products-grid">
          <ProductCard 
            title="Margherita" 
            description="Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado."
            price={93.00} 
            image={margheritaImg} 
            variant="horizontal"
          />
          <ProductCard 
            title="Calabresa" 
            description="Calabresa especial cozida, em fatias, anéis de cebola, orégano e azeitonas portuguesas."
            price={93.00} 
            image={calabresaImg} 
            variant="horizontal"
          />
          <ProductCard 
            title="Calacheese" 
            description="Leva muçarela de búfala rasgada, linguicinhas curada e curada apimentada sobre muçarela especial."
            price={99.00} 
            image={calacheese} 
            variant="horizontal"
          />
        </div>
      </main>

      {/* 6. Rodapé */}
      <Footer />
    </div>
  );
}

export default Home;
