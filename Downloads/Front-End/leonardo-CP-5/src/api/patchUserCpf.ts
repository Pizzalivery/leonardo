export type CpfPayload = {
  cpf: string;
};

async function putUserCpf(
  userId: string,
  payload: CpfPayload,
  token: string | null,
) {
  const url = "https://burgerlivery-esposito-api.onrender.com";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${url}/users/${userId}`, {
    method: "PUT",
    headers,
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

export default putUserCpf;
