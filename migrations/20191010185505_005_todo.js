exports.up = function(knex) {
    return knex.schema.createTable('todos', (table) => {
        table.increments('id')
        table.string('todo_item')
        table.string('slug')
        table.boolean('isActive')
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
    
  return knex.schema.raw('DROP TABLE todos');

};
