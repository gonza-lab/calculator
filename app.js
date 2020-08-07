console.log("Hola Mundo :D");

const KEYS = document.querySelectorAll(".key");
const NUMBERS_KEYS = [];
const CAL = document.querySelector(".calc > .front");
const RES = document.querySelector(".result > .front");

function addCAL(char) {
  CAL.textContent += char;
}

function delCAL() {
  CAL.textContent = CAL.textContent.substr(0, CAL.textContent.length - 1);
}

function getCAL(){
  return document.querySelector(".calc > .front").textContent;
}

function setResult(result){
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
    let num1 = 0;
    let num2 = 0;

    if (calculation.includes("*")) {
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
  })

  return +result.toFixed(4);
}

KEYS.forEach((key) => {
  if (
    key.id.codePointAt(0) >= "0".codePointAt(0) &&
    key.id.codePointAt(0) <= "9".codePointAt(0)
  ) {
    NUMBERS_KEYS.push(key);
  }
});

document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", () => {
    key.classList.toggle("keyActive");
    setTimeout(function () {
      key.classList.toggle("keyActive");
    }, 80);
  });
});

NUMBERS_KEYS.forEach((key) => {
  key.addEventListener("click", () => {
    addCAL(key.id);
  });
});

document.getElementById("Backspace").addEventListener("click", () => {
  delCAL();
});

document.getElementById("ac").addEventListener("click", () => {
  setResult("");
})

document.getElementById("+").addEventListener("click", () => {
  addCAL("+");
});

document.getElementById("-").addEventListener("click", () => {
  addCAL("-");
});

document.getElementById("*").addEventListener("click", () => {
  addCAL("*");
});

document.getElementById("/").addEventListener("click", () => {
  addCAL("/");
});

document.getElementById(".").addEventListener("click", () => {
  addCAL(".");
});

document.getElementById("Enter").addEventListener("click", () => {
  setResult(calc(getCAL()));
});

document.addEventListener("keydown", (event) => {
  if (document.getElementById(`${event.key}`)) {
    document.getElementById(`${event.key}`).click();
  }
});

setInterval(function(){
  document.querySelector(".calc > .front").classList.toggle("hidden");
}, 1000);


