#!/c/Program Files/nodejs/node

const yargs = require("yargs");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const { choices } = require("yargs");

let currentDir = process.cwd();
const options = yargs
  .positional("d", {
    describe: "path to dir",
    default: process.cwd(),
  })
  .positional("p", {
    describe: "Pattern",
    default: "",
  }).argv;

console.log(options);

class DirItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }
  get isDir() {
    return fs.lstatSync(this.path).isDirectory();
  }
}

const start = async () => {
  const list = await fs.readdir(currentDir);
  const items = list.map((dirOrFile) => {
    new DirItem(path.join(currentDir, dirOrFile), dirOrFile);

    const item = async () =>
      await inquirer
        .prompt([
          {
            name: "fileName",
            type: "list",
            message: `choose: ${currentDir}`,
            choices: items.map((item) => ({
              name: item.fileName,
              value: item,
            })),
          },
        ])
        .then((answer) => answer.fileName);
    if (item.isDir) {
      currentDir = item.path;
      return start();
    } else {
      const data = async () => await fs.readFile(item.path, "utf-8");

      if (options.p == null) console.log(data);
      else {
        const regExp = new RegExp(options.p, "igm");
        console.log(data.match(regExp));
      }
    }
  });
};

start();
