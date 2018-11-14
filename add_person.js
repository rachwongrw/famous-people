const myArgs = process.argv;
const moment = require('moment');
const settings = require('./settings.json');

const knex = require('knex') ({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  },
  searchPath: ['knex', 'public'],
});

knex('famous_people').insert([{ first_name: myArgs[2], last_name: myArgs[3], birthdate: myArgs[4] }])
  .asCallback((err, rows) => {
    if (err) return console.error('ERROR:', err);
    knex.destroy();
  });
console.log(myArgs);
