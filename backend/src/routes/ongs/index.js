const controllers = require("../../controllers/OngController");

/**
 * Change the path if you want the route
 * to have a different URL than the default
 * by folder name.
 */
module.exports = [
  {
    path: "",
    method: "get",
    name: "Lists all ongs",
    controller: controllers.index
  },

  {
    path: "",
    method: "post",
    name: "Create an ongs",
    controller: controllers.store
  },

  {
    path: "",
    method: "put",
    name: "Update an ongs",
    controller: controllers.update
  },

  {
    path: "",
    method: "delete",
    name: "Delete an ongs",
    controller: controllers.delete
  },
  
]