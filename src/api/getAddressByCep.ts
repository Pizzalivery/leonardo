export type AddressData = {
    cep: string
    logradouro: string
    bairro: string
    localidade: string
    uf: string
    erro?: boolean
}

async function getAddressByCep(cep: string) {
    const cleanCep = cep.replace(/\D/g, '');

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)

    if (!response.ok) {
        throw new Error(`Error fetching address for CEP ${cleanCep}`);
    }


    const data: AddressData = await response.json();

    if (data.erro) {
        throw new Error(`Address not found for CEP ${cleanCep}`);
    }

    return data;

}

export default getAddressByCep;