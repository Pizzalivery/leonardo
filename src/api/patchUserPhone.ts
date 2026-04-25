
import { API_BASE_URL } from "./postAuthRegister";

export type AddPhonePayload = { phone: string };


async function patchUserPhone(payload: AddPhonePayload): Promise<void> {
 
  if (!API_BASE_URL) {
    console.warn("[patchUserPhone] API_BASE_URL vazia — pulando chamada de telefone.");
    return; 
  }

  const token = JSON.parse(sessionStorage.getItem("userToken") || "null");

  const response = await fetch(`${API_BASE_URL}/users/phone`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      JSON.stringify({
        statusCode: response.status,
        message: errorData?.message ?? "Erro desconhecido",
      })
    );
  }
}

export default patchUserPhone;
