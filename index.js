const colors = require("colors/safe");

const firstNum = parseInt(process.argv[2]);
const secondNum = parseInt(process.argv[3]);
let primeNumbers = [];

const errorCheckker = function () {
  if (!Number.isInteger(firstNum) || !Number.isInteger(secondNum)) {
    console.log(colors.red("введите в качестве параметров числа"));
    process.exit();
  }
  if (!primeNumbers.length) {
    console.log(colors.red("простых чисел не обнаруженно"));
  }
};

const numberChecker = function (num) {
  if (num > 1) {
    for (let i = 2; i < num; i++) {
      if (num % i == 0) {
        return false;
      }
    }
    return true;
  }
};

const primeNumbersArrayMaker = function (arrayWithNumbers) {
  for (let i = firstNum; i <= secondNum; i++) {
    if (numberChecker(i)) {
      arrayWithNumbers.push(i);
    }
  }
};

const numbersLogger = function (arrayToLog) {
  let counter = 0;

  for (let i = 0; i < arrayToLog.length; i++) {
    switch (counter) {
      case 0:
        console.log(colors.green(arrayToLog[i]));
        counter++;
        break;
      case 1:
        console.log(colors.yellow(arrayToLog[i]));
        counter++;
        break;
      case 2:
        console.log(colors.red(arrayToLog[i]));
        counter = 0;
        break;
    }
  }
};

primeNumbersArrayMaker(primeNumbers);

errorCheckker();

numbersLogger(primeNumbers);
