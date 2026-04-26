export type CepAddress = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento?: string;
};

async function getCepAddress(cep: string): Promise<CepAddress> {
  const sanitizedCep = cep.replace(/\D/g, "");

  const response = await fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`);

  if (!response.ok) {
    const errorMessage = {
      statusCode: response.status,
      message: "Erro ao buscar o CEP.",
    };

    throw new Error(JSON.stringify(errorMessage));
  }

  const data = await response.json();

  if (data.erro) {
    const errorMessage = {
      statusCode: 404,
      message: "CEP não encontrado.",
    };

    throw new Error(JSON.stringify(errorMessage));
  }

  return data;
}

export default getCepAddress;
