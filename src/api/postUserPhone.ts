const API_URL = "https://burgerlivery-esposito-api.onrender.com";

function getToken() {
  return JSON.parse(sessionStorage.getItem("userToken") || "null");
}

async function postUserPhone(userId: string, phone: string) {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ phone }),
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

export default postUserPhone;
