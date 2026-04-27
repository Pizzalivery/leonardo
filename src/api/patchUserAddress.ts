export type UserAddressPayload = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
};

async function postUserAddress(userId: string, payload: UserAddressPayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const token = JSON.parse(sessionStorage.getItem("userToken") || "null");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${url}/users/${userId}/address`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = {
      error: "error",
      statusCode: response.status,
      message: "Erro desconhecido",
    };

    try {
      const errorData = await response.json();
      errorMessage = {
        error: errorData.error || "error",
        statusCode: response.status,
        message: errorData.message || "Erro desconhecido",
      };
    } catch {
      // body não é JSON
    }

    throw new Error(JSON.stringify(errorMessage));
  }

  const data = await response.json();
  return data;
}

export default postUserAddress;
