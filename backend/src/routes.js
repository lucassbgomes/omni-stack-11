const fs = require("fs");
const { table } = require("table");

const express = require("express");
const routesApp = express.Router();

const authMiddleware = require("./middlewares/AuthenticateMiddleware");

const head = [ "path", "method", "middleware logged", "name" ];
let rows = [];

const registerRoutes = () => {
  const BASE_DIR = `${process.cwd()}/src/routes`;
  let dirsRoutes = fs.readdirSync(BASE_DIR);

  console.log("------Register Routes------");
  for (let dir of dirsRoutes) {
    let pathDir = `${BASE_DIR}/${dir}`;
    let filesDirs = fs.readdirSync(pathDir);

    addRoutes(pathDir, dir, filesDirs);
  }
  console.log(table([ head, ...rows]), "---------------------------");
}

const addRoutes = (pathDir, dir, filesDirs) => {
  for (let filesDir of filesDirs) {
    let filePath = `${pathDir}/${filesDir}`;
    let stats = fs.lstatSync(filePath);

    filePath = filePath.replace(/\/index.js|.js/, "");

    if (stats.isFile()) {
      const endPoint = require(filePath);
      
      let path = `/${dir}/${filesDir}`
      path = path.replace(/\/index.js|.js/, "");

      for (let route of endPoint) {
        if (route.logged) {
          routesApp[route.method](route.path !== "" ? route.path : path, authMiddleware.verifyJWT, route.controller);
          rows.push([ route.path !== "" ? route.path : path, route.method, route.logged, route.name ]);
        } else {
          routesApp[route.method](route.path !== "" ? route.path : path, route.controller);
          rows.push([ route.path !== "" ? route.path : path, route.method, false, route.name ]);
        }
      }
    } else addRoutes(filePath, `${dir}/${filesDir}`, fs.readdirSync(filePath));
  }
};

registerRoutes();
module.exports = routesApp;
