import { NavLink } from "react-router";
import { Heading } from "../Heading/Heading";

interface ProductListItemProps {
  id: number;
  image: string;
  title: string;
  description: string;
  value: number;
}

export const ProductListItem = ({
  id,
  image,
  title,
  description,
  value,
}: ProductListItemProps) => {
  const formattedValue = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <section className="my-4 border-b border-interface-border last:border-0">
      <NavLink
        className="grid grid-cols-3 gap-4 items-center"
        to={`/products/${id}`}
      >
        <div className="col-span-2">
          <Heading component="h3">{title}</Heading>
          <p className="text-xs font-medium mb-2 line-clamp-5">{description}</p>
          <p className="text-base font-extrabold mb-2 text-brand-primary">
            {formattedValue(value)}
          </p>
        </div>
        <img className="w-24 h-24 rounded-xl" src={image} alt={title} />
      </NavLink>
    </section>
  );
};
