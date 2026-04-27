export type UpdateCpfPayload = {
  cpf: string;
};

async function patchUserCpf(payload: UpdateCpfPayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const storedToken = sessionStorage.getItem("userToken") || "null";
  const storedUser = sessionStorage.getItem("user") || "{}";
  const token = JSON.parse(storedToken);
  const parsedUser = JSON.parse(storedUser);
  const user = typeof parsedUser === "string" ? JSON.parse(parsedUser) : parsedUser;
  const userId = user.id;

  if (!token || !userId) {
    throw new Error(
      JSON.stringify({
        error: "unauthorized",
        statusCode: 401,
        message: "Token ou usuario ausente",
      }),
    );
  }

  const response = await fetch(`${url}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cpf: payload.cpf }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("Erro CPF:", errorData);
    throw new Error(JSON.stringify(errorData));
  }

  const data = await response.json();

  if (data?.user) {
    sessionStorage.setItem("user", JSON.stringify(data.user));
  } else {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        cpf: payload.cpf,
      }),
    );
  }

  return data;
}

export default patchUserCpf;
