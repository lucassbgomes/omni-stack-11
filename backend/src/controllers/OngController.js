const conn = require("../database/connection");

const genUniqueId = require("../utils/generate/uniqueId");
const genPass = require("../utils/generate/password");

module.exports = {
  index: async (req, res) => {
    const ongs = await conn("ongs")
      .whereNull("deleted_at")
      .select("*");

    return res.json(ongs);
  },

  store: async (req, res) => {
    const { name, email, whatsapp, city, uf, password } = req.body;
    
    const passHash = await genPass.generate(password);

    const id = genUniqueId();
    
    await conn("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
      password: passHash
    });

    return res.json({id});
  },

  update: async (req, res) => {
    const { name, email, whatsapp, city, uf, password } = req.body;

    const passHash = await genPass.generate(password);

    const ong = await conn("ongs")
      .where({ id })
      .update({
        name,
        email,
        whatsapp,
        city,
        uf,
        password: passHash,
        updated_at: conn.fn.now()
      });
    
    if (!ong) return res.status(401).json({ error: "Operation not permitted." });

    return res.status(204).send();
  },

  delete: async (req, res) => {
    const ong = await conn("ongs")
      .where({ id })
      .update({ deleted_at: conn.fn.now() });
    
    if (!ong) return res.status(401).json({ error: "Operation not permitted." });

    return res.status(204).send();
  },

  undelete: async (req, res) => {
    const { id } = req.params;

    const ong = await conn("ongs")
      .where({ id })
      .update({ deleted_at: null });
    
    if (!ong) return res.status(401).json({ error: "Operation not permitted." });

    return res.status(204).send();
  }
} 