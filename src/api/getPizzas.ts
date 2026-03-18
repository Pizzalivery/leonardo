async function getPizzas() {
  // const url = "https://burgerlivery-esposito-api.onrender.com/pizzas";
  // const response = await fetch(url);

  // if (!response.ok) {
  //   throw new Error("Erro na requisição");
  // }

  // const data = await response.json();
  // return data;

  const url = "https://burgerlivery-esposito-api.onrender.com";
  const response = await fetch(`${url}/pizzas`); // GET

  if (!response.ok) {
    throw new Error("Erro na requisição");
  }

  const data = await response.json();
  return data;
}

export default getPizzas;
