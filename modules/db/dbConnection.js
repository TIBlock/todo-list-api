const dbConfigs = require('../../knexfile.js');
const db = require('knex')(dbConfigs.development);

module.exports = {
    db: db
}