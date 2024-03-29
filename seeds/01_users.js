exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: "asdf",
          password: "asdf",
          characters: `
          [
            {
              slot: 1,
              seed: 6210047570285,
              stats: {
                level: 1,
                hp: 10,
                attack: 1,
                strength: 1,
                defence: 1,
                speed: 1
              }
            },
            {
              slot: 2,
              seed: 546546476987,
              stats: {
                level: 5,
                hp: 50,
                attack: 5,
                strength: 5,
                defence: 5,
                speed: 5
              }
            }
          ]
        `
        },
        { 
          id: 2,
          username: "james",
          password: "james",
          characters: `
          [
            {
              slot: 1,
              seed: 6288144000152,
              stats: {
                level: 1,
                hp: 10,
                attack: 1,
                strength: 1,
                defence: 1,
                speed: 1
              }
            },
          ]
        `
        },
      ])
    })
}


//546546476987 
//787987987
//5646546548
//2036125651817
//6210047570285
//9425047680324
//9473102849274
//2157966978464
//7401119833798
//2600917840133
//7219019395310
//7925746214747
//502087163492
//1323232
//6288144000152
//2493896398333
//8798564654666
//2071256556792