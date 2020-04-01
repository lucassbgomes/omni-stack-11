const conn = require("../database/connection");

module.exports = {
  index: async (req, res) => {
    const { page = 1 } = req.query;
    const qtyToList = 5;

    const [count] = await conn("incidents").count();

    const incidents = await conn("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .whereNull("incidents.deleted_at")
      .limit(qtyToList)
      .offset((page - 1) * qtyToList)
      .select([
        "incidents.id",
        "incidents.title",
        "incidents.description",
        "incidents.value",
        "incidents.ong_id",
        "ongs.name as ong_name",
        "ongs.email as ong_email",
        "ongs.city as ong_city",
        "ongs.uf as ong_uf",
      ]);

    // const incidentsOng = incidents.map(i => {
    //   return {
    //     id: i.id,
    //     title: i.title,
    //     description: i.description,
    //     value: i.value,
    //     ong: {
    //       id: i.ong_id,
    //       name: i.ong_name,
    //       email: i.ong_email,
    //       whatsapp: i.ong_whatsapp,
    //       city: i.ong_city,
    //       uf: i.ong_uf,
    //     }
    //   }
    // });

    res.header("X-Total-Count", count["count(*)"]);
    return res.json(incidents);
  },

  store: async (req, res) => {
    const { title, description, value } = req.body;
    const { ong_id } = req;

    const [id] = await conn("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    res.json({ id });
  },

  update: async (req, res) => {
    const { id, title, description, value } = req.body;

    const { ong_id } = req

    const incident = await conn("incidents")
      .where({ id, ong_id })
      .update({
        title,
        description,
        value,
        updated_at: conn.fn.now()
      });

      if (!incident) return res.status(401).json({ error: "Operation not permitted." });
    
    return res.status(204).send();
  },

  delete: async (req, res) => {
    const { id } = req.params;

    const { ong_id } = req;

    const incident = await conn("incidents")
      .where({ id, ong_id })
      .update({ deleted_at: conn.fn.now() });
    
    if (!incident) return res.status(401).json({ error: "Operation not permitted." });
    
    return res.status(204).send();
  },

  undelete: async (req, res) => {
    const { id } = req.params;

    const { ong_id } = req;

    const incident = await conn("incidents")
      .where({ id, ong_id })
      .update({ deleted_at: null });
    
    if (!incident) return res.status(401).json({ error: "Operation not permitted." });
    
    return res.status(204).send();
  }
}