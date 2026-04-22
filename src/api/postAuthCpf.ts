export type CpfPayload = {
    cpf: string
}

async function postAuthCpf(payload: CpfPayload, token: string) {
    const url = "https://burgerlivery-esposito-api.onrender.com";

    const response = await fetch(`${url}/auth/cpf`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
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

    return response.json();
}

export default postAuthCpf;