const numberButtons = document.querySelectorAll('[data-type="number"]');
const operationButtons = document.querySelectorAll('[data-type="operation"]');
const clearButton = document.querySelector('[data-type="clear"]');
const equalsButton = document.querySelector('[data-type="equals"]');
const displaySpan = document.getElementById("display-span");
const operationSpan = document.getElementById("operation-span");

let firstNum = parseInt("");
let secondNum = parseInt("");
let operation = "";
let resetDisplay = false;

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (b) => {
    const button = b.target;

    if (resetDisplay) {
      displaySpan.innerText = "";
      resetDisplay = false;
    }

    if (displaySpan.innerText === "0") {
      displaySpan.innerText = button.innerText;
    } else {
      displaySpan.innerText += button.innerText;
    }
  });
});

operationButtons.forEach((btn) => {
  btn.addEventListener("click", (b) => {
    const button = b.target;
    firstNum = parseFloat(displaySpan.innerText);
    operation = button.innerText;
    resetDisplay = true;
    operationSpan.innerText = operation;
    console.log({ first: firstNum, operation: operation });
  });
});

clearButton.addEventListener("click", () => {
  displaySpan.innerText = "0";
  firstNum = "";
  secondNum = "";
  operation = "";
  resetDisplay = false;
  operationSpan.innerText = "";
});

equalsButton.addEventListener("click", (b) => {
  operationSpan.innerText = "";
  secondNum = parseInt(displaySpan.innerText);
  displaySpan.innerText = getResult();
});

const getResult = () => {
  switch (operation) {
    case "+":
      return firstNum + secondNum;
    case "-":
      return firstNum - secondNum;
    case "X":
      return firstNum * secondNum;
    case "/":
      if (secondNum === 0) {
        alert("Division by zero is not allowed.");
        return 0;
      }
      return firstNum / secondNum;
    default:
      alert("Unsupported operation.");
  }
};
