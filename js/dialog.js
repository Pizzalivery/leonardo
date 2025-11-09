const addressDialog = document.querySelector(".modal");
const closeButton = addressDialog.querySelector("#close-btn");
const changeAddressButton = document.getElementById("change-addr");

closeButton.addEventListener("click", function () {
  addressDialog.classList.toggle("open");
});

changeAddressButton.addEventListener("click", function () {
  addressDialog.classList.add("open");
});
