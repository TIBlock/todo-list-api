exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {
          todo_item: 'Test todo',
          slug: 'test-todo',
          isActive: true,
        },
        {
          todo_item: 'Second test todo',
          slug: 'second-test-todo',
          isActive: true,
        }, 
        {
          todo_item: 'Third Test todo',
          slug: 'third-test-todo',
          isActive: true,
        }
      ]);
    });
};