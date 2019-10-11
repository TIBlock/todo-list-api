exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('firstName')
        table.string('lastName')
        table.string('username')
        table.string('email')
        table.string('slug')
        table.timestamps()
    })
};

exports.down = function(knex) {
    
  return knex.schema.raw('DROP TABLE users');

};
