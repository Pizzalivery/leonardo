export type UserAddressPayload = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
};

const API_URL = "https://burgerlivery-esposito-api.onrender.com";

function getToken() {
  return JSON.parse(sessionStorage.getItem("userToken") || "null");
}

async function postUserAddress(userId: string, payload: UserAddressPayload) {
  const response = await fetch(`${API_URL}/users/${userId}/address`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      JSON.stringify({
        error: data.error,
        statusCode: response.status,
        message: data.message,
      }),
    );
  }

  return data;
}

export default postUserAddress;
