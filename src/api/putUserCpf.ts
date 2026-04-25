export type CpfPayload = {
  cpf: string;
};

async function putUserCpf(id: string, payload: CpfPayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const token = JSON.parse(sessionStorage.getItem("userToken") ?? "");

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

export default putUserCpf;