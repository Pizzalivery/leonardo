export type PhoneUpdateRequest = {
  phone: string;
};

const API_BASE_URL = "https://burgerlivery-esposito-api.onrender.com";

async function updateUserPhone(request: PhoneUpdateRequest) {
  const rawToken = sessionStorage.getItem("userToken");
  const token = JSON.parse(rawToken ?? "null");

  const rawUser = sessionStorage.getItem("user");
  const userData = rawUser ? JSON.parse(rawUser) : {};
  const userId = userData?.id;

  const url = `${API_BASE_URL}/users/${userId}`;

  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ phone: request.phone }),
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const error = await res.json();
    console.error("Erro Phone:", error);
    throw new Error(JSON.stringify(error));
  }

  return await res.json();
}

export default updateUserPhone;