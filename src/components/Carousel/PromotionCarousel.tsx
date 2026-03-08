import React, { useRef, useState} from 'react';
import CarouselCard from './CarouselCard';
import './PromotionCarousel.css';

interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface PromotionCarouselProps {
  promotions: Promotion[];
  title?: string;
}

export const PromotionCarousel: React.FC<PromotionCarouselProps> = ({
  promotions,
  title = 'Promoções',
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollAmount = 344; // Largura do card (320px) + gap (24px)

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });

      // Atualizar estado após scroll
      setTimeout(checkScroll, 300);
    }
  };

  // Auto-scroll: movimento da direita para a esquerda
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        // Se chegou no final, volta para o início
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Caso contrário, rola para a esquerda
          carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [scrollAmount]);

  React.useEffect(() => {
    checkScroll();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      return () => carousel.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <section className="promotion-carousel-section">
      <div className="promotion-carousel-header">
        <h2 className="promotion-carousel-title">{title}</h2>
      </div>

      <div className="promotion-carousel-container">
        {/* Botão Esquerda */}
        <button
          className="carousel-button carousel-button-left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>

        {/* Carousel com os cards */}
        <div className="promotion-carousel" ref={carouselRef}>
          {promotions.map((promotion) => (
            <div key={promotion.id} className="carousel-item">
              <CarouselCard
                image={promotion.imageUrl}
                title={promotion.title}
                description={promotion.description}
              />
            </div>
          ))}
        </div>

        {/* Botão Direita */}
        <button
          className="carousel-button carousel-button-right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default PromotionCarousel;