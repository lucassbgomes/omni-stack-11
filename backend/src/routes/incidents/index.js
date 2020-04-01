const controllers = require("../../controllers/IncidentController");

/**
 * Change the path if you want the route
 * to have a different URL than the default
 * by folder name.
 */
module.exports = [
  {
    path: "",
    method: "get",
    name: "Lists all incidents",
    controller: controllers.index
  },

  {
    path: "",
    method: "post",
    logged: true,
    name: "Create an incidents",
    controller: controllers.store
  },

  {
    path: "",
    method: "put",
    logged: true,
    name: "Update an incidents",
    controller: controllers.update
  },

  {
    path: "/incidents/:id",
    method: "delete",
    logged: true,
    name: "Delete an incidents",
    controller: controllers.delete
  },
  
]