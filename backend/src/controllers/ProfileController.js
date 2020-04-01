const conn = require("../database/connection");

module.exports = {
  index: async (req, res, next) => {
    const { ong_id } = req;

    const incidents = await conn("incidents")
      .where("ong_id", ong_id)
      .whereNull("deleted_at")
      .select("*");
    
    return res.json(incidents);
  }
}
