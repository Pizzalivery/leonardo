import type { ReactElement } from "react";
import "./OffersSection.css";

export interface IOffersDisplay {
  title: string;
  items: ReactElement;
}

export function OffersSection({ title, items }: IOffersDisplay) {
  return (
    <section className="offers">
      <header className="container">
        <h2 className="section-title">{title}</h2>
      </header>

      <div className="offers-content">
        {items}
      </div>
    </section>
  );
}