async function getBeverages() {
  const url = import.meta.env.VITE_API_URL;
  const response = await fetch(`${url}/beverage`);

  if (!response.ok) {
    throw new Error("Erro na requisição");
  }

  const data = await response.json();
  return data;
}

export default getBeverages;
