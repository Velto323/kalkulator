"use strict";

//HTML elements
const numberButtons = document.querySelectorAll(".calculator-number-button");
const operatorButtons = document.querySelectorAll(
  ".calculator-button-operator"
);
const equalsButtons = document.querySelector("#calculator-button-equals");
const dotButton = document.querySelector("#calculator-button-dot");
const clearButton = document.querySelector("#calculator-button-clear");
const screen = document.querySelector("#screen-value");
const numberInput = [];

//Variables
let prev;
let curr;
let operator;
let hasJustCalced = false;

//Event listeners

numberButtons.forEach(function (numberButton) {
  numberButton.addEventListener("click", function (e) {
    //if there is zero on screen and you press another number it shows that digit, but if there's something else, you just add another digit to whole number
    //If there'a a number on the screen but it's result of previous calculation then it should reset screen and start inputting digits from zero
    //So after calculation result should be saved into prev
    //and and then here it will be checked it prev exists
    console.log(curr, Number(screen.textContent));
    if (hasJustCalced) {
      screen.textContent = numberButton.textContent.trim();
      hasJustCalced = false;
    } else if (screen.textContent === "0") {
      screen.textContent = numberButton.textContent.trim();
    } else {
      screen.textContent += numberButton.textContent.trim();
    }
  });
});

dotButton.addEventListener("click", function () {
  //You can add dot only if there isn't one in the number yet
  if (screen.textContent.includes(".")) alert("You can't put that here!");
  else {
    screen.textContent += ".";
  }
});

operatorButtons.forEach(function (operatorButton) {
  operatorButton.addEventListener("click", function () {
    if (!(curr === undefined) && !(operator === undefined)) {
      //save curr into prev
      //Calculations are made
      //result shown
      //result saved into prev
      //curr deleted
      // new operator is saved
      prev = curr;
      curr = Number(screen.textContent);
      screen.textContent = count(prev, curr, operator);
      prev = undefined;
      curr = Number(screen.textContent);
      operator = operatorButton.textContent.trim();
      hasJustCalced = true;
    } else {
      // Only operator is saved and
      // screen reset
      // save screen value to curr
      operator = operatorButton.textContent.trim();
      curr = Number(screen.textContent);
      console.log(curr);
      screen.textContent = "0";
    }
  });
});

equalsButtons.addEventListener("click", function () {
  console.log(prev, operator, curr);
  if (!(curr === undefined) && !(operator === undefined)) {
    prev = curr;
    curr = Number(screen.textContent);
    screen.textContent = count(prev, curr, operator);
    curr = Number(screen.textContent);
    prev = undefined;
    operator = undefined;
    hasJustCalced = true;
  } else alert("Can't perform calculations!");
});

clearButton.addEventListener("click", function () {
  screen.textContent = "0";
  prev = curr = operator = undefined;
  hasJustCalced = false;
  console.log(prev, curr, operator);
});

//Functions
const count = function (num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
};
