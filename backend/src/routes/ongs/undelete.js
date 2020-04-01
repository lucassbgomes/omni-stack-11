const controllers = require("../../controllers/OngController");

/**
 * Change the path if you want the route
 * to have a different URL than the default
 * by folder name.
 */
module.exports = [
  {
    path: "/ongs/undelete/:id",
    method: "delete",
    name: "Undelete an ong",
    controller: controllers.undelete
  },
  
]