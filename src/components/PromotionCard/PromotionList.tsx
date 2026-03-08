// src/components/PromotionList/PromotionList.tsx
import React from 'react';
import  PromotionCard  from './styles/PromotionCard';
import './PromotionList.css';

const promotions = [
  { id: 1, image: '/pizza-dobro.jpg', title: 'Pizza em dobro', description: 'Compre uma pizza e ganhe outra' },
  { id: 2, image: '/coca-cola.jpg', title: 'Pizza de Calabresa + Coca', description: 'Pizza + Coca-Cola as Quintas' },
  { id: 3, image: '/sobremesa.jpg', title: 'Quarta: Pizza + Sobremesa', description: 'As quartas compre uma pizza e leve a sobremesa de graça' },
  { id: 4, image: '/coca-cola.jpg', title: 'Pizza de Calabresa + Coca', description: 'Pizza + Coca-Cola as Quintas' },
];

export const PromotionList: React.FC = () => {
  return (
    <section className="promotion-section">
      <h2>Promoções</h2>
      <div className="promotion-grid">
        {promotions.map((promo) => (
          <PromotionCard 
            key={promo.id} 
            image={promo.image} 
            title={promo.title} 
            description={promo.description} 
          />
        ))}
      </div>
    </section>
  );
};