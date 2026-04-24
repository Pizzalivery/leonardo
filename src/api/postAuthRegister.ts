export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const API_URL = "https://burgerlivery-esposito-api.onrender.com";

async function postAuthRegister(payload: RegisterPayload) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export default postAuthRegister;
