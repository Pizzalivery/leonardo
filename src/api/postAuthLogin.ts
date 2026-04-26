export type LoginPayload = { email: string; password: string; };

const postAuthLogin = async (payload: LoginPayload) => {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const response = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Erro no login");
  return await response.json();
};

export default postAuthLogin;