const conn = require("../database/connection");
const genPass = require("../utils/generate/password");
const authMiddleware = require("../middlewares/AuthenticateMiddleware");

module.exports = {
  create: async (req, res) => {
    const { ong_user, ong_password } = req.body;

    const ong = await conn("ongs")
      .whereNull("deleted_at")
      .where("id", ong_user)
      .orWhere("email", ong_user)
      .select("id", "name", "email", "whatsapp", "city", "uf", "password")
      .first();
      
    if (!ong) return res.status(400).json({ error: "Invalid data" });

    const { id, name, email, whatsapp, city, uf, password } = ong;
    
    const verifyPass = await genPass.compare(ong_password, password);
    
    if (!verifyPass) return res.status(401).json({ error: "Invalid data" });

    const token = authMiddleware.createJWT(id)

    return res.json({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
      token
    });
  }
}