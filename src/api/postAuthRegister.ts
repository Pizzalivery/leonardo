
export const API_BASE_URL = "";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  accessToken: string;
  user: { id: string; name: string; email: string };
};


async function postAuthRegister(
  payload: RegisterPayload
): Promise<RegisterResponse> {

  if (!API_BASE_URL) {
    console.warn("[postAuthRegister] API_BASE_URL vazia — usando mock local.");
    return {
      accessToken: "mock-token",
      user: { id: "1", name: payload.name, email: payload.email },
    };
  }

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

  return response.json();
}

export default postAuthRegister;
