type PatchUserCpfPayload = {
  cpf: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

async function postAuthLogin(payload: LoginPayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";

  const response = await fetch(`${url}/auth/login`, {
    method: "POST",
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

async function sendPatch(
  userId: string | number,
  payload: PatchUserCpfPayload,
  token: string,
) {
  const url = "https://burgerlivery-esposito-api.onrender.com";

  const response = await fetch(`${url}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

async function patchUserCpf(
  userId: string | number,
  payload: PatchUserCpfPayload,
) {
  let token = JSON.parse(sessionStorage.getItem("userToken") || "null");

  if (!token) {
    throw new Error(
      JSON.stringify({
        statusCode: 401,
        message: "Usuário não autenticado.",
      }),
    );
  }

  try {
    return await sendPatch(userId, payload, token);
  } catch (error) {
    if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);

        if (parsedError.statusCode === 401) {
          const registerAuth = JSON.parse(
            sessionStorage.getItem("registerAuth") || "null",
          );

          if (!registerAuth?.email || !registerAuth?.password) {
            throw new Error(
              JSON.stringify({
                statusCode: 401,
                message: "Sessão inválida. Faça login novamente.",
              }),
            );
          }

          const loginResponse = await postAuthLogin({
            email: registerAuth.email,
            password: registerAuth.password,
          });

          sessionStorage.setItem(
            "userToken",
            JSON.stringify(loginResponse.accessToken),
          );

          if (loginResponse?.user) {
            sessionStorage.setItem("user", JSON.stringify(loginResponse.user));
          }

          token = loginResponse.accessToken;

          return await sendPatch(userId, payload, token);
        }

        throw error;
      } catch {
        throw error;
      }
    }

    throw error;
  }
}

export default patchUserCpf;