export type UpdateAddressPayload = {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
};

async function patchUserAddress(payload: UpdateAddressPayload) {
  const url = "https://burgerlivery-esposito-api.onrender.com";
  const token = JSON.parse(sessionStorage.getItem("userToken") || "null");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const userId = user.id;

  const response = await fetch(`${url}/users/${userId}/address`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("Erro Address:", errorData);
    throw new Error(JSON.stringify(errorData));
  }

  const data = await response.json();
  return data;
}

export default patchUserAddress;