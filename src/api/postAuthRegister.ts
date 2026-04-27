export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role?: "customer";
};

async function postAuthRegister(payload: RegisterPayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";

  const response = await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export default postAuthRegister;
