import { useState } from "react";
import { useOutletContext } from "react-router";
import type { ProductLayoutContext } from "../../components/Layouts/ProductLayout/ProductLayout";
import getSearchPizzas from "../../api/getSearchPizzas";
import { Input } from "../../components";

type SearchPizza = {
  id: number;
  name: string;
  size: Array<string>;
  category: string;
  description: string;
  image: string;
  value: number;
}[];

function Search() {
  const { setTitle, setNavigationHistory } =
    useOutletContext<ProductLayoutContext>();

  setNavigationHistory("/");
  setTitle("Busca");

  const [searchResult, setSearchResult] = useState<SearchPizza>([]);
  const [search, setSearch] = useState<string>("");

  async function fetchSearchPizzas(query: string) {
    try {
      const response = await getSearchPizzas(query);
      setSearchResult(response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSearchSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchSearchPizzas(search);
    }
  };

  return (
    <div className="mx-auto px-5">
      <Input
        id="search"
        name="search"
        label="Buscar"
        noLabel
        type="text"
        fullWidth
        placeholder="Buscar pizza..."
        onChange={handleSearchChange}
        onKeyDown={handleSearchSubmit}
      />
      <div>
        {searchResult.map((pizza) => (
          <div key={pizza.id} className="border p-4 my-2">
            <h2 className="text-xl font-bold">{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
