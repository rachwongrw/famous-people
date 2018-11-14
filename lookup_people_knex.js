//  SETUP 
const myArgs = process.argv; //  take in arguments from the CLI
// const knex = require('knex');
const moment = require('moment'); //  required moment to display date as displayed in example
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
  searchPath: ['knex', 'public'], //  tell knex where to find the file
});

knex.select().from('famous_people').where('first_name', myArgs[2])
  .asCallback((err, rows) => {
    if (err) return console.error('ERROR:', err);
    console.log('Searching ...');
    console.log(`Found ${rows.length} person(s) by the name ${myArgs[2]}`);
    rows.forEach((row, index) => {
      console.log(`- ${index + 1}: ${row.first_name} ${row.last_name} '${moment(row.birthdate).format('YYYY-MM-DD')}'`);
    });
    knex.destroy();
  });
