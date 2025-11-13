const userName = document.getElementById("userName");
const userPoints = document.getElementById("userPoints");

const user = {
  name: "Daniela",
  age: "danielaisabelasales@gmail.com",
  points: 112,
};

const userData = JSON.stringify(user);


localStorage.setItem("user", userData);


const usuario = JSON.parse(localStorage.getItem("user"));

userName.textContent = usuario.name;
userPoints.textContent = usuario.points;

// localStorage.removeItem("user");
// localStorage.clear();
