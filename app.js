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

KEYS.forEach((key) => {
  if (
    key.id.codePointAt(0) >= "0".codePointAt(0) &&
    key.id.codePointAt(0) <= "9".codePointAt(0)
  ) {
    NUMBERS_KEYS.push(key);
  }
});

KEYS.forEach((key) => {
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

document.addEventListener("keydown", (event) => {
  if (document.getElementById(`${event.key}`)) {
    document.getElementById(`${event.key}`).click();
  }
});
