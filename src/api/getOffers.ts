async function getOffers() {
  const url = "https://burgerlivery-esposito-api.onrender.com";

  const response = await fetch(`${url}/offer-gallery`);

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

export default getOffers;
