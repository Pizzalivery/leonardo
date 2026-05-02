export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
};

export type SearchCep = {
  cep: string;
};

export type AddressParams = {
  id: string;
  address: Address;
};

export type Address = {
  id?: string;
  street: string;
  number: string;
  city: string;
  neighborhood: string;
  state: string;
  cep: string;
};

export type CreateAccount = {
  name: string;
  email: string;
  password: string;
  cpf?: string;
  role: string;
  address?: Address;
  phone?: string;
};

export type UpdateAccount = {
  id: string;
  cpf?: string;
  address?: Address;
  phone?: string;
};
