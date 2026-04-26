
async function getSearchPizzas(query: string) {
  const url = "https://burgerlivery-esposito-api.onrender.com";

  const response = await fetch(`${url}/pizzas/search?query=${query}`);

  if (!response.ok) {
    throw new Error("Erro na requisição");
  }
  const data = await response.json();
  return data;
}

export default getSearchPizzas;
