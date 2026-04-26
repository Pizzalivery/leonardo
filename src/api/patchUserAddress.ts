export type UpdateAddressPayload = {
  
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

const API_URL = "https://burgerlivery-esposito-api.onrender.com";

async function updateAddress(payload: unknown) {
  const token = JSON.parse(sessionStorage.getItem("userToken") ?? "null");
  const storedUser = sessionStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : {};
  const userId = userData?.id;

  const endpoint = `${API_URL}/users/${userId}/address`;

  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(endpoint, requestOptions);

  if (!response.ok) {
    const error = await response.json();
    console.error("Erro Address:", error);
    throw new Error(JSON.stringify(error));
  }

  return await response.json();
}

export default updateAddress;