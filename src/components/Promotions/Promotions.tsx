import type { ReactElement } from "react";
import "./Promotions.css";

export interface PromotionsProps {
  title: string;
  carousel: ReactElement;
}

export const Promotions = ({ title, carousel }: PromotionsProps) => {
  return (
    <section className="offers">
      <div className="container">
        <h2 className="section-title">{title}</h2>
      </div>
      {carousel}
    </section>
  );
};
