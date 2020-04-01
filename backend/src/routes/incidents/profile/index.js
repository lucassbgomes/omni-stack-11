const controllers = require("../../../controllers/ProfileController");

/**
 * Change the path if you want the route
 * to have a different URL than the default
 * by folder name.
 */
module.exports = [
  {
    path: "",
    method: "get",
    logged: true,
    name: "List a specific incident",
    controller: controllers.index
  }
]
