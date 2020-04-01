const controllers = require("../../controllers/SessionController");

/**
 * Change the path if you want the route
 * to have a different URL than the default
 * by folder name.
 */
module.exports = [
  {
    path: "",
    method: "post",
    name: "Create session",
    controller: controllers.create
  }
]