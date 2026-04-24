export type UpdatePhonePayload = {
  phone: string;
};

async function patchUserPhone(payload: UpdatePhonePayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const token = JSON.parse(sessionStorage.getItem("userToken") || "null");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = user.id;

  const response = await fetch(`${url}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ phone: payload.phone }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("Erro Phone:", errorData);
    throw new Error(JSON.stringify(errorData));
  }

  const data = await response.json();
  return data;
}

export default patchUserPhone;