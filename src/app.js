const express = require("express");
const routes = require("./routes");

class App {
  constructor() {
    this.server = express();

    this.middlwares();
    this.routes();
  }

  middlwares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  views() {
    
  }
}

module.exports = new App().server;
