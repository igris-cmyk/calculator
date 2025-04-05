const parentDiv = document.querySelector("#calculator");
const btnSound = new Audio("btnsound.mp3");
const result = document.getElementById("inputBox");
let data = "";
btnSound.playbackRate = 3.69;

function evaluateExpression(expression) {
  try {
    expression = expression.replace(/%/g, "/100");
    return eval(expression);
  } catch (error) {
    return "Error";
  }
}

parentDiv.addEventListener("click", (e) => {
  let val = e.target.textContent;
  btnSound.play();

  if (val.length > 3) return;

  if (val === "ac") {
    data = "";
    result.value = "0";
    return;
  }

  if (val === "del") {
    data = data.slice(0, -1);
    result.value = data || "0";
    return;
  }

  if (val === "=") {
    if (/[\+\-\*\/%]$/.test(data)) {
      data = data.slice(0, -1);
    }
    let resultValue = evaluateExpression(data);
    result.value = resultValue === "Error" ? "Error" : resultValue;
    data = result.value;
    return;
  }

  if (val === "%") {
    if (data) {
      data = (parseFloat(data) / 100).toString();
      result.value = data;
    }
    return;
  }

  const lastChar = data[data.length - 1];
  const operators = ["+", "-", "*", "/", "%"];

  if (operators.includes(val) && operators.includes(lastChar)) return;

  if (val === "." && data.includes(".")) return;

  data += val;
  result.value = data;
});
