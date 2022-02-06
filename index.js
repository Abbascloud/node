// task #1
// console.log("Record 1");                 //1

// setTimeout(() => {
//   console.log("Record 2");               //4
//   Promise.resolve().then(() => {
//     setTimeout(() => {
//       сonsole.log("Record 3");           //5
//       Promise.resolve().then(() => {
//         console.log("Record 4");         //6
//       });
//     });
//   });
// });

// console.log("Record 5");                  //2

// Promise.resolve().then(() =>
//   Promise.resolve().then(() => console.log("Record 6"))  //3
// );

// task2
// не знаю правильно ли я понял задание, но этот код делает обратный отсчет
// введите значение в формате hh-mm-ss!!!

import EventEmitter from "events";

import Handler from "./modules/Handler.js";

const emitter = new EventEmitter();

let startDate = process.argv[2].replace(/-/g, ",").split(",");

emitter.on("start", Handler.start);
emitter.on("finish", Handler.finish);
emitter.on("error", Handler.error);

class UserDateCounter {
  constructor(dateArr) {
    this.hour = +dateArr[0];
    this.min = +dateArr[1];
    this.sec = +dateArr[2];
    this._init();
  }
  _init() {
    if (!Number.isInteger(this.min + this.sec + this.hour)) {
      emitter.emit("error", "not a numbers");
      process.exit();
    }
    if (this.min > 60 || this.min < 0 || this.sec > 60 || this.sec < 0) {
      emitter.emit("error", "wrong time value");
      process.exit();
    }
    emitter.emit("start");
    this._timeLogger();
  }
  _counterTick() {
    this.sec--;
    if (this.sec < 0) {
      this.sec = 60;
      this.min--;
      if (this.min < 0) {
        this.min = 60;
        this.hour--;
        if (this.hour < 0) {
          emitter.emit("finish");
          process.exit();
        }
      }
    }
  }
  _timeLogger() {
    console.log(
      `осталось ${this.hour} часов, ${this.min} минут, ${this.sec} секунд`
    );
  }
  start() {
    setInterval(() => {
      this._counterTick();
      this._timeLogger();
    }, 1000);
  }
}

let counter = new UserDateCounter(startDate);

counter.start();
