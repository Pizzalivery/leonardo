export type UpdateUserPayload = {
  cpf?: string;
  phone?: string;
};

async function putUser(id: string, payload: UpdateUserPayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const storedToken = sessionStorage.getItem("userToken");
  let token: string | null = null;

  if (storedToken) {
    try {
      token = JSON.parse(storedToken);
    } catch {
      token = storedToken;
    }
  }

  if (!token) {
    throw new Error(
      JSON.stringify({
        error: "unauthorized",
        statusCode: 401,
        message: "Token ausente",
      }),
    );
  }

  const response = await fetch(`${url}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export default putUser;
