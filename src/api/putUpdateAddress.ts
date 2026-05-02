import type { AddressParams } from "../types";

async function putUpdateAddress(payload: AddressParams) {
  const url = import.meta.env.VITE_API_URL;

  const response = await fetch(`${url}/users/${payload.id}/address`, {
    method: "PUT",
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

export default putUpdateAddress;
