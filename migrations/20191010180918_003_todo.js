exports.up = function(knex) {
    return knex.schema.table('users', (table) => {
        table.string('password')
    })
};

exports.down = function(knex) {
    
  return knex.schema.raw('users', (table) => {
        table.dropColumn('password')
  });

};
