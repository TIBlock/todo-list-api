exports.up = function(knex) {
    return knex.schema.table('users', (table) => {
    })
};

exports.down = function(knex) {
    
  return knex.schema.raw('users', (table) => {
        table.dropColumn('password')
  });

};
