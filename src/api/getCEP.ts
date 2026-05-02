import type { SearchCep } from "../types";

async function getCEP(payload: SearchCep) {
  const url = "https://brasilapi.com.br/api/cep/v2";

  const response = await fetch(`${url}/${payload.cep}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();

    const errorMessage = {
      error: errorData.error,
      statusCode: response.status,
      message: errorData.message,
    };

    throw new Error(JSON.stringify(errorMessage));
  }

  const data = await response.json();
  return data;
}

export default getCEP;
