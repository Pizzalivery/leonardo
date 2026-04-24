import type { CreateOrder } from "../types";

async function postOrders(payload: CreateOrder) {
  const url = import.meta.env.VITE_API_URL;
  const token = JSON.parse(sessionStorage.getItem("userToken") as string);

  const response = await fetch(`${url}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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

export default postOrders;
