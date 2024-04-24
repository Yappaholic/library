const button = document.querySelector(".book-add")
const modal = document.querySelector("dialog")
button.addEventListener("click", () => {
  modal.showModal()
});
modal.addEventListener("click", e => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close()
  }
});
