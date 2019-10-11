
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {'firstName': 'Admin','lastName':'McAdmin','email':'admin@taydriana.com', 'slug':'test-slug','password':'admin'},
      ]);
    });
};
