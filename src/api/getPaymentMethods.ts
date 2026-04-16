async function getPaymentMethods() {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("userToken") as string);

  const response = await fetch(`${url}/payment-methods`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
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

export default getPaymentMethods;
