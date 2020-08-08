console.log("Hola Mundo :D");

const CAL = document.querySelector(".calc > .front");
const RES = document.querySelector(".result > .front");
let isNewCalc = true;

function addCAL(char) {
  CAL.textContent += char;
}

function delCAL() {
  CAL.textContent = CAL.textContent.substr(0, CAL.textContent.length - 1);
}

function getCAL() {
  return document.querySelector(".calc > .front").textContent;
}

function setCAL(cal) {
  document.querySelector(".calc > .front").textContent = cal;
}

function setResult(result) {
  document.querySelector(".result > .front").textContent = result;
}

function insertPlus(expression) {
  let newExpression = [];
  for (let i = 0; i < expression.length; i++) {
    let isMinus = expression[i] === "-" && expression[i - 1] >= 0;
    if (isMinus) {
      newExpression.push("+");
      newExpression.push(expression[i]);
    } else {
      newExpression.push(expression[i]);
    }
  }
  return newExpression.join("");
}

function orderByPEMDAS(e1, e2) {
  let e1Value = 1;
  let e2Value = 1;

  if (e1.includes("*") || e1.includes("/")) {
    e1Value = 2;
  } else if (e1.includes("^")) {
    e1Value = 3;
  }

  if (e2.includes("*") || e2.includes("/")) {
    e2Value = 2;
  } else if (e2.includes("^")) {
    e2Value = 3;
  }
  return e1Value - e2Value;
}

function calc(expressions) {
  expressions = insertPlus(expressions);
  let newExpression = expressions.split("+");
  newExpression.sort(orderByPEMDAS);

  newExpression = newExpression.map((calculation) => {
    let index = 0;
    let index2 = 0;
    let num1 = 0;
    let num2 = 0;
    let num3 = 0;

    if (calculation.includes("^") && calculation.includes("/")) {
      index = calculation.indexOf("^");
      index2 = calculation.indexOf("/");
      num1 = calculation.substring(0, index);
      num2 = calculation.substring(index + 1, index2);
      num3 = calculation.substring(index2 + 1, calculation.length);
      return num1 ** (num2 / num3);
    } else if (calculation.includes("^")) {
      index = calculation.indexOf("^");
      num1 = calculation.substring(0, index);
      num2 = calculation.substring(index + 1, calculation.length);
      return num1 ** num2;
    } else if (calculation.includes("*")) {
      index = calculation.indexOf("*");
      num1 = calculation.substring(0, index);
      num2 = calculation.substring(index + 1, calculation.length);
      return num1 * num2;
    } else if (calculation.includes("/")) {
      index = calculation.indexOf("/");
      num1 = calculation.substring(0, index);
      num2 = calculation.substring(index + 1, calculation.length);
      return num1 / num2;
    } else {
      return +calculation;
    }
  });

  let result = newExpression.reduce((acumulator, current) => {
    return acumulator + current;
  });

  return +result.toFixed(4);
}

function addFunctionKey(keys) {
  keys.forEach((key) => {
    document.getElementById(key).addEventListener("click", () => {
      if (getCAL()[getCAL().length - 1] === "_") {
        delCAL();
      }
      addCAL(key);
    });
  });
}

document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", () => {
    key.classList.toggle("keyActive");
    setTimeout(function () {
      key.classList.toggle("keyActive");
    }, 80);
  });
});

document.getElementById("Backspace").addEventListener("click", () => {
  if (getCAL()[getCAL().length - 1] === "_") {
    delCAL();
  }
  delCAL();
});

document.getElementById("ac").addEventListener("click", () => {
  setResult("");
});

document.getElementById("Enter").addEventListener("click", () => {
  isNewCalc = true;
  if (getCAL()[getCAL().length - 1] === "_") {
    delCAL();
  }
  setResult(calc(getCAL()));
});

document.getElementById("sqr").addEventListener("click", () => {
  if (getCAL()[getCAL().length - 1] === "_") {
    delCAL();
  }
  addCAL("^1/");
});

let keys = [
  "+",
  "-",
  "*",
  "/",
  ".",
  "^",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];
addFunctionKey(keys);

document.addEventListener("keydown", (event) => {
  if (document.getElementById(`${event.key}`)) {
    if (isNewCalc) {
      setCAL("");
      isNewCalc = false;
    }
    document.getElementById(`${event.key}`).click();
  }
});

setInterval(function () {
  addCAL("_");
  setTimeout(function () {
    if (getCAL()[getCAL().length - 1] === "_") {
      delCAL();
    }
  }, 500);
}, 1000);
