
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: "password", email: "one@gamil.com"},
        {id: 2, username: 'user2', password: "password", email: "two@gamil.com"},
        {id: 3, username: 'user3', password: "password", email: "three@gamil.com"},
      ]);
    });
};
