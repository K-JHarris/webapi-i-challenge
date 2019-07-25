exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {
          name: 'Shieda Kayn',
          bio: 'Noxian tool of war, wielder of Rhaast',
        },
        {
          name: 'Ekko',
          bio: 'Local time traveler',
        },
      ]);
    });
};
