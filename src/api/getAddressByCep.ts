async function getAddressByCep(cep: string) {
  const sanitizedCep = cep.replace(/\D/g, "");
  const url = "https://viacep.com.br/ws";

  const response = await fetch(`${url}/${sanitizedCep}/json/`);

  if (!response.ok) {
    throw new Error(
      JSON.stringify({
        statusCode: response.status,
        message: "Não foi possível buscar o CEP.",
      }),
    );
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error(
      JSON.stringify({
        statusCode: 404,
        message: "CEP não encontrado.",
      }),
    );
  }

  return data;
}

export default getAddressByCep;