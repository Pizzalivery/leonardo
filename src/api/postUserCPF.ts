export type CPFPayload = {
  cpf: string;
};

async function postUserCPF(payload: CPFPayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const token = sessionStorage.getItem("userToken");

  const response = await fetch(`${url}/users/cpf`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token || '""')}`,
    },
    body: JSON.stringify(payload),
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

export default postUserCPF;
