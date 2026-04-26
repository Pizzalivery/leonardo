export type PhonePayload = {
  phone: string;
};

async function patchUserPhone(id: string, payload: PhonePayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const token = JSON.parse(sessionStorage.getItem("userToken") as string);

  const response = await fetch(`${url}/users/${id}/phone`, {
    method: "PATCH",
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

export default patchUserPhone;
