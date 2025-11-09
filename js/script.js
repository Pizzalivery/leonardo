const userName = document.getElementById("name");
const userPoints = document.getElementById("points");

const user = {
  name: "Daniela",
  email: "danielaisabelasales@gmail.com",
  points: 112,
};

const userData = JSON.stringify(user);

localStorage.setItem("user", userData);

const loggedUser = JSON.parse(localStorage.getItem("user"));

userName.textContent = loggedUser.name;
userPoints.textContent = loggedUser.points;

localStorage.removeItem("user");

localStorage.clear();
