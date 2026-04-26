export type ViaCepAddress = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

async function getViaCep(cep: string): Promise<ViaCepAddress> {
  const cleanCep = cep.replace(/\D/g, "");

  const response = await fetch(
    `https://viacep.com.br/ws/${cleanCep}/json/`,
  );

  if (!response.ok) {
    const errorMessage = {
      statusCode: response.status,
      message: "Erro ao buscar CEP",
    };
    throw new Error(JSON.stringify(errorMessage));
  }

  const data: ViaCepAddress = await response.json();

  if (data.erro) {
    const errorMessage = {
      statusCode: 404,
      message: "CEP não encontrado",
    };
    throw new Error(JSON.stringify(errorMessage));
  }

  return data;
}

export default getViaCep;
