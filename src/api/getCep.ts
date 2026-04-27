export type CepResponse = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

async function getCep(cep: string) {
  const url = "https://viacep.com.br";
  const sanitizedCep = cep.replace(/\D/g, "");

  const response = await fetch(`${url}/ws/${sanitizedCep}/json/`);

  if (!response.ok) {
    throw new Error("Erro na requisicao de CEP");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP nao encontrado");
  }

  return {
    cep: data.cep,
    street: data.logradouro,
    neighborhood: data.bairro,
    city: data.localidade,
    state: data.uf,
  } as CepResponse;
}

export default getCep;
