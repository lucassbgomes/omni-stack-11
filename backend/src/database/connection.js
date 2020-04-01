const knex = require("knex");
const file = require("../../knexfile");

const conf = process.env.NODE_ENV === "test" ? file.test : file.development;

const connection = knex(conf)

module.exports = connection;
