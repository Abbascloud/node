// const colors = require("colors/safe");

export default class Handler {
  static start() {
    console.log("обратный отсчет начат");
  }
  static finish() {
    console.log("обратный отсчет окончен");
  }
  static error(type) {
    switch (type) {
      case "not a numbers":
        console.log("введите корректное числовое значение");
      case "wrong time value":
        console.log(
          "минут и секунд не может быть больше 60 и меньше нуля. Вводите данные в формате hh-mm-ss"
        );
    }
  }
}
