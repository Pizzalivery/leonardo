export type PhonePayload = {
  phone: string;
};

async function postAuthPhone(payload: PhonePayload, token: string) {
  const url = "https://burgerlivery-esposito-api.onrender.com";

  const response = await fetch(`${url}/auth/phone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      JSON.stringify({
        error: errorData.error,
        statusCode: response.status,
        message: errorData.message,
      })
    );
  }

  const data = await response.json();
  return data;
}

export default postAuthPhone;