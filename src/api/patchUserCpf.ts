
import { API_BASE_URL } from "./postAuthRegister";

export type AddCpfPayload = { cpf: string };


async function patchUserCpf(payload: AddCpfPayload): Promise<void> {
  
  if (!API_BASE_URL) {
    console.warn("[patchUserCpf] API_BASE_URL vazia — pulando chamada de CPF.");
    return;
  }

  const token = JSON.parse(sessionStorage.getItem("userToken") || "null");

  const response = await fetch(`${API_BASE_URL}/users/cpf`, {
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

export default patchUserCpf;
