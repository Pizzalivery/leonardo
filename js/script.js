//sessio - guarda informações durante a sessão do navegador
sessionStorage.setItem("fullName", "João");
//sessionStorage
//local - guarda informações de forma persistente no navegador
//localStorage

//Objeto == Dicionário
const user = {
    name: "João",
    age: 30
}

const userString = JSON.stringify(user); //converte objeto para string


//set - grava um valor (chave, valor)
localStorage.setItem("user", userString);

//get - recupera um valor (chave)
const usuario = JSON.parse(localStorage.getItem("user")); //converte string para objeto



//remove - remove um valor (chave)
localStorage.removeItem("nome");

//clear - limpa todos os valores
localStorage.clear();