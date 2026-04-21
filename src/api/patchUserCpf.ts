export type CpfUpdateRequest = {
  cpf: string;
};

const BASE_API = "https://burgerlivery-esposito-api.onrender.com";

async function updateUserCpf(data: CpfUpdateRequest) {
  const storedToken = sessionStorage.getItem("userToken");
  const parsedToken = JSON.parse(storedToken ?? "null");

  const storedUser = sessionStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : {};
  const id = parsedUser?.id;

  const endpoint = `${BASE_API}/users/${id}`;

  const config: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parsedToken}`,
    },
    body: JSON.stringify({ cpf: data.cpf }),
  };

  const result = await fetch(endpoint, config);

  if (!result.ok) {
    const error = await result.json();
    console.error("Erro CPF:", error);
    throw new Error(JSON.stringify(error));
  }

  return await result.json();
}

export default updateUserCpf;