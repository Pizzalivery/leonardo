import { NavLink } from "react-router";
import { Heading } from "../Heading/Heading";

interface ProductListItemProps {
  id: number;
  image: string;
  title: string;
  description: string;
  value: number;
  onClickAdd?: (id: number) => void;
}

export const ProductListItem = ({
  id,
  image,
  title,
  description,
  value,
  onClickAdd,
}: ProductListItemProps) => {
  const formattedValue = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClickAdd?.(id);
  };

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
        <div className="w-24 flex gap-1 flex-col items-end mb-2">
          <img
            className="w-24 h-24 rounded-xl object-contain bg-common-light"
            src={image}
            alt={title}
          />
          <button
            className="w-full bg-brand-primary text-common-light p-1 rounded-lg text-sm font-medium"
            onClick={handleAdd}
          >
            Adicionar
          </button>
        </div>
      </NavLink>
    </section>
  );
};

export const ProductListItemSkeleton = () => {
  return (
    <section className="my-4 border-b border-interface-border last:border-0">
      <div className="grid grid-cols-3 gap-4 items-center animate-pulse">
        <div className="col-span-2">
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        </div>
        <div className="w-24 h-24 bg-gray-300 rounded-xl"></div>
      </div>
    </section>
  );
};
