exports.up = function(knex) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('username')
    })
};

exports.down = function(knex) {
    
  return knex.schema.table('users', (table) => {
        table.string('username')
  });

};
