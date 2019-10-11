exports.up = function(knex) {
    return knex.schema.table('todos', (table) => {
        table.dropColumn('created_at')
        table.dropColumn('updated_at')
        // table.timestamps(true,true)
    })
};

exports.down = function(knex) {
    
    return knex.schema.table('todos', (table) => {
        table.timestamps()
    })
};
