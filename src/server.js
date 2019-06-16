const express = require("express");
const nunjunks = require("nunjucks");
const path = require("path");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV != "production";

    this.middlwares();
    this.views();
    this.routes();
  }

  middlwares() {
    this.express.use(express.urlencoded({ extended: false }));
  }

  views() {
    nunjunks.configure(path.resolve(__dirname, "app", "views"), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    });
    this.express.set("view engine", "njk");
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
