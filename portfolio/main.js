const buttons = document.querySelectorAll(".tab-buttons button");

const handleClick = (e) => {
  buttons.forEach((btn) => {
    btn.classList.remove("is-active");
  });
  e.target.classList.add("is-active");
};

buttons.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
