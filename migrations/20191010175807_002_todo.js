exports.up = function(knex) {
    return knex.schema.table('todos', (table) => {
    })
};

exports.down = function(knex) {
    
    return knex.schema.table('todos', (table) => {
        table.dropTimestamps()
    })
};
