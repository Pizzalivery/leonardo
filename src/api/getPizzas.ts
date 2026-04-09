async function getPizzas() {
  const url = import.meta.env.VITE_API_URL;
  const response = await fetch(`${url}/pizzas`);

  if (!response.ok) {
    throw new Error("Erro na requisição");
  }

  const data = await response.json();
  return data;
}

export default getPizzas;
