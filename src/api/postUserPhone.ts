export type PhonePayload = {
  phone: string;
};

async function postUserPhone(payload: PhonePayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const token = sessionStorage.getItem("userToken");

  const response = await fetch(`${url}/users/phone`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(token || '""')}`,
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

export default postUserPhone;
