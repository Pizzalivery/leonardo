async function getPizzaDetails(id: string) {
  const url = import.meta.env.VITE_API_URL;
  const response = await fetch(`${url}/pizzas/${id}`);

  if (!response.ok) {
    throw new Error("Erro na requisição");
  }

  const data = await response.json();
  return data;
}

export default getPizzaDetails;
