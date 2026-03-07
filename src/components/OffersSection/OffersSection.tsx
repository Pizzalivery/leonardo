import type { ReactElement } from "react";
import "./OffersSection.css";

export interface OffersSectionProps {
  title: string;
  items: ReactElement;
}

export const OffersSection = ({ title, items }: OffersSectionProps) => {
  return (
    <section className="offers">
      <div className="container">
        <h2 className="section-title">{title}</h2>
      </div>
      {items}
    </section>
  );
};
