#!/c/Program Files/nodejs/node

const yargs = require("yargs");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const { choices } = require("yargs");
const { error } = require("console");
const { resolve } = require("path/posix");
const { rejects } = require("assert");

let currentDir = process.cwd();
console.log(currentDir);
const DirOptions = yargs
  .positional("d", {
    describe: "path to dir",
    default: process.cwd(),
  })
  .positional("p", {
    describe: "Pattern",
    default: "",
  }).argv;

class DirItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }
  get isDir() {
    return fs.lstatSync(this.path).isDirectory();
  }
}

class Dir {
  constructor(path = currentDir, options = DirOptions) {
    this.path = path;
    this.items = [];
    this.options = options;
    this._init();
  }
  async _init() {
    await this._start();
  }

  async _start() {
    const list = await fs.readdir(this.path, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.forEach((fileName) => {
          let newItem = new DirItem(path.join(this.path, fileName), fileName);
          this.items.push(newItem);
        });
      }

      (async () => {
        const item = await inquirer
          .prompt([
            {
              name: "filename",
              type: "list",
              message: `Choose ${this.path}`,
              choices: this.items.map((item) => ({
                name: item.fileName,
                value: item,
              })),
            },
          ])
          .then((answer) => answer.filename);

        if (item.isDir) {
          this.path = item.path;
          return await this._start();
        } else {
          await fs.readFile(item.path, { encoding: "utf-8" }, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              if (!this.options.p) {
                console.log(data);
              } else {
                const regExp = new RegExp(this.options.p, "igm");
                console.log(data.match(regExp));
              }
            }
          });
        }
      })();
    });
  }
}

let dir = new Dir();
console.log(dir.options);
