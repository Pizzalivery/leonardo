export type UpdateCpfPayload = {
  cpf: string;
};

async function patchUserCpf(payload: UpdateCpfPayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const token = JSON.parse(sessionStorage.getItem("userToken") || "null");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = user.id;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${url}/users/${userId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ cpf: payload.cpf }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("Erro CPF:", errorData);
    throw new Error(JSON.stringify(errorData));
  }

  const data = await response.json();

  const updatedUser = { ...user, cpf: payload.cpf, ...data };
  sessionStorage.setItem("user", JSON.stringify(updatedUser));
  
  return data;
}

export default patchUserCpf;