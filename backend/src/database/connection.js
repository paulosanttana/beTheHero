
const knex = require('knex');
const configuration = require('../../knexfile'); // Configurações do Banco de Dados

const connection = knex(configuration.development); // Conexão de Desenvolvimento

module.exports = connection;