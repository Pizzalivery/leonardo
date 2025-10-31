const addressModal = document.querySelector(".address-modal");
const closeButton = addressModal.querySelector("#close-button");
const changeAddressButton = document.getElementById("change-address");

closeButton.addEventListener("click", function () {
  addressModal.classList.remove("open");
});

changeAddressButton.addEventListener("click", function () {
  addressModal.classList.add("open");
});
