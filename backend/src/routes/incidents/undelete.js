const controllers = require("../../controllers/IncidentController");

/**
 * Change the path if you want the route
 * to have a different URL than the default
 * by folder name.
 */
module.exports = [
  {
    path: "/incidents/undelete/:id",
    method: "delete",
    logged: true,
    name: "Undelete an ong",
    controller: controllers.undelete
  },
  
]